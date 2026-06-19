// List of known characters and NPCs to identify speaker labels in brackets
const KNOWN_ACTORS = [
  'Miriane', 'Grakk', 'Haelga', 'Luin', 'Lukian', 'Kaelen', 'Valkar', 
  'Adela Emyrsanis', 'Adela', 'Aron', 'Atchim', 'Luis', 'Silva'
];

/**
 * Tokenizes a single line segment based on formatting symbols:
 * ● ... ● -> action
 * “ ... ” -> thought
 * 【 ... 】 or [ ... ] -> ability
 * 
 * @param {string} text 
 * @param {'dialogue'|'action'} defaultType 
 */
function tokenizeSubPart(text, defaultType) {
  const subSegments = [];
  let currentText = '';
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (char === '●') {
      if (currentText) {
        subSegments.push({ type: defaultType, text: currentText });
        currentText = '';
      }
      i++;
      let inner = '';
      while (i < text.length && text[i] !== '●') {
        inner += text[i];
        i++;
      }
      if (inner.trim()) {
        subSegments.push({ type: 'action', text: inner.trim() });
      }
    } else if (char === '“') {
      if (currentText) {
        subSegments.push({ type: defaultType, text: currentText });
        currentText = '';
      }
      i++;
      let inner = '';
      while (i < text.length && text[i] !== '”') {
        inner += text[i];
        i++;
      }
      if (inner.trim()) {
        subSegments.push({ type: 'thought', text: inner.trim() });
      }
    } else if (char === '【') {
      if (currentText) {
        subSegments.push({ type: defaultType, text: currentText });
        currentText = '';
      }
      i++;
      let inner = '';
      while (i < text.length && text[i] !== '】') {
        inner += text[i];
        i++;
      }
      if (inner.trim()) {
        subSegments.push({ type: 'ability', text: inner.trim() });
      }
    } else if (char === '[') {
      if (currentText) {
        subSegments.push({ type: defaultType, text: currentText });
        currentText = '';
      }
      i++;
      let inner = '';
      while (i < text.length && text[i] !== ']') {
        inner += text[i];
        i++;
      }
      if (inner.trim()) {
        subSegments.push({ type: 'ability', text: inner.trim() });
      }
    } else {
      currentText += char;
    }
    i++;
  }

  if (currentText) {
    subSegments.push({ type: defaultType, text: currentText });
  }

  // Clean up leading asterisks from actions
  return subSegments.map(s => {
    let cleanText = s.text.trim();
    if (cleanText.startsWith('*')) {
      cleanText = cleanText.substring(1).trim();
    }
    return { ...s, text: cleanText };
  }).filter(s => s.text !== '');
}

/**
 * Parses a single line from the log file.
 * Detects leading speakers (e.g. 【 Miriane 】) and splits dialogue vs actions.
 * 
 * @param {string} lineText 
 */
export function parseLogLine(lineText) {
  let text = lineText.trim();
  if (!text) return null;

  let lineSpeaker = null;

  // 1. Check if the line starts with a speaker indicator, e.g. 【 Miriane 】
  const speakerMatch = text.match(/^【\s*([A-Za-zÀ-ÖØ-öø-ÿ\s\-\']+)\s*】/);
  if (speakerMatch) {
    const potentialSpeaker = speakerMatch[1].trim();
    // If it is in the list of known actors or starts with uppercase, treat it as a speaker
    if (KNOWN_ACTORS.includes(potentialSpeaker) || /^[A-Z]/.test(potentialSpeaker)) {
      lineSpeaker = potentialSpeaker;
      text = text.substring(speakerMatch[0].length).trim();
    }
  }

  // 2. Determine parsing style:
  // - Style A (has circle bullet points '●'): Circle bullet points enclose action descriptions, dashes start speech.
  // - Style B (no circles): Dashes alternate speech and action descriptions (e.g., — Fala — Ação — Fala).
  const hasCircles = text.includes('●');
  const parts = text.split('—');

  // If there are no dashes, the entire line is a single part
  const startsWithDash = text.startsWith('—') || text.startsWith('-');
  const segments = [];

  parts.forEach((part, index) => {
    let partText = part.trim();
    if (!partText) return;

    let baseType = 'action'; // Default is narrative action/description

    if (hasCircles) {
      // In Style A, text after a dash is always dialogue, circles handle action
      baseType = index > 0 || startsWithDash ? 'dialogue' : 'action';
    } else {
      // In Style B, dashes alternate dialogue and action
      if (startsWithDash) {
        baseType = index % 2 === 1 ? 'dialogue' : 'action';
      } else {
        baseType = index % 2 === 0 ? 'action' : 'dialogue';
      }
    }

    const subSegments = tokenizeSubPart(partText, baseType);
    segments.push(...subSegments);
  });

  return {
    speaker: lineSpeaker,
    segments: segments
  };
}

/**
 * Parses an entire log file text into structured entries.
 * 
 * @param {string} rawText 
 */
export function parseLogFile(rawText) {
  if (!rawText) return [];

  // Split by line endings
  const lines = rawText.split(/\r?\n/);
  const entries = [];
  let currentEntry = null;

  // Header pattern: CharacterName  DD/MM/YYYY - HH:MM [— extraInfo]
  const headerRegex = /^([A-Za-zÀ-ÖØ-öø-ÿ\s\-\'\:]+)\s+(\d{2}\/\d{2}\/\d{4})\s*-\s*(\d{2}:\d{2})(?:\s*—\s*(.*))?$/;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    // Check if it is a turn indicator
    const turnMatch = trimmedLine.match(/^\s*>>\s*(.*)$/);
    if (turnMatch) {
      if (currentEntry) {
        entries.push(currentEntry);
        currentEntry = null;
      }
      entries.push({
        id: `turn-${index}`,
        type: 'turn',
        label: turnMatch[1].trim() || 'Fim de Turno'
      });
      return;
    }

    // Check if it is a block header
    const headerMatch = trimmedLine.match(headerRegex);
    if (headerMatch) {
      if (currentEntry) {
        entries.push(currentEntry);
      }
      
      const sender = headerMatch[1].trim();
      currentEntry = {
        id: `entry-${index}`,
        sender: sender,
        date: headerMatch[2],
        time: headerMatch[3],
        extraInfo: headerMatch[4] ? headerMatch[4].trim() : null,
        type: sender.toLowerCase() === 'narrador' ? 'narrator' : 'character',
        lines: []
      };
      return;
    }

    // Otherwise, parse the line content and append to current entry
    const parsedLine = parseLogLine(trimmedLine);
    if (parsedLine) {
      if (!currentEntry) {
        // Fallback if there is no header yet
        currentEntry = {
          id: `entry-${index}`,
          sender: 'Narrador',
          date: '',
          time: '',
          type: 'narrator',
          lines: []
        };
      }
      currentEntry.lines.push(parsedLine);
    }
  });

  if (currentEntry) {
    entries.push(currentEntry);
  }

  return entries;
}
