import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseLogFile } from './src/utils/logParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logPath = path.join(__dirname, 'log-example.txt');

try {
  const rawText = fs.readFileSync(logPath, 'utf8');
  console.log(`Lendo arquivo: ${logPath}`);
  console.log(`Tamanho: ${rawText.length} bytes`);

  const entries = parseLogFile(rawText);
  console.log(`\n--- PARSER RESULTADOS ---`);
  console.log(`Total de entradas parsed: ${entries.length}`);

  const counts = entries.reduce((acc, entry) => {
    acc[entry.type] = (acc[entry.type] || 0) + 1;
    return acc;
  }, {});
  console.log(`Tipos de entrada:`, counts);

  console.log(`\nPrimeiras 3 entradas do Log:`);
  entries.slice(0, 3).forEach((entry, idx) => {
    console.log(`\n[Entrada #${idx + 1}] Tipo: ${entry.type}, Remetente: ${entry.sender || 'N/A'}`);
    if (entry.type === 'turn') {
      console.log(`  Rótulo: ${entry.label}`);
    } else {
      entry.lines.forEach(line => {
        if (line.speaker) {
          console.log(`  [NPC ${line.speaker} fala]`);
        }
        line.segments.forEach(seg => {
          console.log(`    - [${seg.type}] ${seg.text}`);
        });
      });
    }
  });

  console.log(`\nValidação concluída com sucesso!`);
} catch (err) {
  console.error('Erro ao validar log:', err);
}
