import React from 'react';

export default function CharacterAvatar({ id, size = 100 }) {
  const normalizedId = id ? id.toLowerCase() : 'narrador';

  const renderSvgContent = () => {
    switch (normalizedId) {
      case 'valkar':
        return (
          <svg className="avatar-svg-placeholder" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#172a45" stroke="#d4af37" strokeWidth="3" />
            {/* Paladin Shield */}
            <path d="M50 20 C60 20 70 25 70 35 C70 55 50 75 50 78 C50 75 30 55 30 35 C30 25 40 20 50 20 Z" fill="#2c3e50" stroke="#e5e9f0" strokeWidth="2" />
            {/* Scales of Khalmyr */}
            <line x1="40" y1="40" x2="60" y2="40" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="36" x2="50" y2="60" stroke="#d4af37" strokeWidth="3" />
            {/* Left scale */}
            <line x1="40" y1="40" x2="36" y2="52" stroke="#d4af37" strokeWidth="1" />
            <line x1="40" y1="40" x2="44" y2="52" stroke="#d4af37" strokeWidth="1" />
            <path d="M32 52 H48 L40 56 Z" fill="#d4af37" />
            {/* Right scale */}
            <line x1="60" y1="40" x2="56" y2="52" stroke="#d4af37" strokeWidth="1" />
            <line x1="60" y1="40" x2="64" y2="52" stroke="#d4af37" strokeWidth="1" />
            <path d="M52 52 H68 L60 56 Z" fill="#d4af37" />
          </svg>
        );

      case 'kaelen':
        return (
          <svg className="avatar-svg-placeholder" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#1b102f" stroke="#4d94ff" strokeWidth="3" />
            {/* Arcane Magic Eye */}
            <path d="M25 50 C35 30 65 30 75 50 C65 70 35 70 25 50 Z" stroke="#4d94ff" strokeWidth="2.5" fill="none" />
            <circle cx="50" cy="50" r="14" fill="#100b21" stroke="#a64dff" strokeWidth="2" />
            <circle cx="50" cy="50" r="6" fill="#4d94ff" />
            {/* Arcane particles */}
            <circle cx="35" cy="38" r="2" fill="#fff" opacity="0.8" />
            <circle cx="65" cy="62" r="2" fill="#fff" opacity="0.8" />
            <circle cx="62" cy="36" r="3" fill="#a64dff" />
            <circle cx="38" cy="64" r="3" fill="#a64dff" />
            <path d="M48 20 L52 20 M50 18 L50 22" stroke="#4d94ff" strokeWidth="2" strokeLinecap="round" />
            <path d="M48 80 L52 80 M50 78 L50 82" stroke="#4d94ff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'lukian':
        return (
          <svg className="avatar-svg-placeholder" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#2d2119" stroke="#b86d29" strokeWidth="3" />
            {/* Gear (Inventor) */}
            <circle cx="50" cy="50" r="22" stroke="#b86d29" strokeWidth="4" fill="none" />
            <path d="M50 20 V28 M50 72 V80 M20 50 H28 M72 50 H80 M29 29 L35 35 M65 65 L71 71 M29 71 L35 65 M65 29 L71 35" stroke="#b86d29" strokeWidth="6" strokeLinecap="round" />
            {/* Sulfure Horns / Flame wings inside */}
            <path d="M38 52 C32 46 32 38 35 34 C36 32 38 35 37 38 C36 41 38 46 42 49 Z" fill="#ff4d4d" opacity="0.8" />
            <path d="M62 52 C68 46 68 38 65 34 C64 32 62 35 63 38 C64 41 62 46 58 49 Z" fill="#ff4d4d" opacity="0.8" />
            {/* Inner Core */}
            <circle cx="50" cy="50" r="8" fill="#ff9f43" />
          </svg>
        );

      case 'adela':
      case 'adela emyrsanis':
        return (
          <svg className="avatar-svg-placeholder" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#29121a" stroke="#a33b5c" strokeWidth="3" />
            {/* Styled Osteon Skull */}
            <path d="M35 42 C35 30 65 30 65 42 C65 52 61 58 58 62 H42 C39 58 35 52 35 42 Z" fill="#eceff1" stroke="#37474f" strokeWidth="2" />
            <path d="M42 62 L40 70 H60 L58 62 Z" fill="#eceff1" stroke="#37474f" strokeWidth="2" />
            {/* Eye sockets (glowing magenta) */}
            <circle cx="44" cy="42" r="5" fill="#29121a" />
            <circle cx="44" cy="42" r="2" fill="#ff4d88" />
            <circle cx="56" cy="42" r="5" fill="#29121a" />
            <circle cx="56" cy="42" r="2" fill="#ff4d88" />
            {/* Nose cavity */}
            <path d="M50 48 L48 53 H52 Z" fill="#29121a" />
            {/* Teeth lines */}
            <line x1="45" y1="66" x2="45" y2="70" stroke="#37474f" strokeWidth="1.5" />
            <line x1="50" y1="66" x2="50" y2="70" stroke="#37474f" strokeWidth="1.5" />
            <line x1="55" y1="66" x2="55" y2="70" stroke="#37474f" strokeWidth="1.5" />
            {/* Violin neck motif behind */}
            <path d="M28 25 L40 35 M72 25 L60 35" stroke="#d4af37" strokeWidth="2" />
            <circle cx="28" cy="25" r="3" fill="#d4af37" />
            <circle cx="72" cy="25" r="3" fill="#d4af37" />
          </svg>
        );

      case 'grakk':
        return (
          <svg className="avatar-svg-placeholder" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#1b2e21" stroke="#527a5a" strokeWidth="3" />
            {/* Stitched flesh sectors */}
            <path d="M50 15 V85" stroke="#527a5a" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M15 50 H85" stroke="#527a5a" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Druid Leaf */}
            <path d="M50 25 C65 35 65 65 50 75 C35 65 35 35 50 25 Z" fill="#2d5236" stroke="#a3cfab" strokeWidth="2.5" />
            {/* Leaf veins */}
            <path d="M50 25 V75" stroke="#a3cfab" strokeWidth="1.5" />
            <path d="M50 40 Q57 45 60 40 M50 50 Q57 55 60 50 M50 60 Q57 65 60 60" stroke="#a3cfab" strokeWidth="1" />
            <path d="M50 40 Q43 45 40 40 M50 50 Q43 55 40 50 M50 60 Q43 65 40 60" stroke="#a3cfab" strokeWidth="1" />
            {/* Small stitches details */}
            <path d="M25 45 L31 55 M75 45 L69 55" stroke="#527a5a" strokeWidth="2.5" />
          </svg>
        );

      case 'miriane':
        return (
          <svg className="avatar-svg-placeholder" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#4d1f05" stroke="#e67e22" strokeWidth="3" />
            {/* Phoenix / Sun (Thyatis) */}
            <circle cx="50" cy="50" r="16" fill="#f1c40f" stroke="#e67e22" strokeWidth="2" />
            <path d="M50 15 L50 28 M50 72 L50 85 M15 50 H28 M72 50 H85 M25 25 L34 34 M66 66 L75 75 M25 76 L34 67 M66 34 L75 25" stroke="#e67e22" strokeWidth="2.5" strokeLinecap="round" />
            {/* Burning flames */}
            <path d="M43 43 C43 38 50 32 50 32 C50 32 57 38 57 43 C57 48 50 52 50 52 C50 52 43 48 43 43 Z" fill="#e74c3c" />
            <path d="M46 45 C46 41 50 37 50 37 C50 37 54 41 54 45 C54 49 50 51 50 51 C50 51 46 49 46 45 Z" fill="#f39c12" />
          </svg>
        );

      case 'narrador':
      default:
        return (
          <svg className="avatar-svg-placeholder" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#1c1f24" stroke="#8c734b" strokeWidth="3" />
            {/* Open Book */}
            <path d="M22 68 C35 68 46 64 50 60 C54 64 65 68 78 68 V32 C65 32 54 28 50 24 C46 28 35 32 22 32 Z" fill="#dfd6bc" stroke="#8c734b" strokeWidth="2" strokeLinejoin="round" />
            <line x1="50" y1="26" x2="50" y2="60" stroke="#8c734b" strokeWidth="2" />
            {/* Feather Pen (Quill) */}
            <path d="M72 18 Q62 28 52 48 L46 54 L48 48 Q58 28 68 18 Z" fill="#eceff1" stroke="#37474f" strokeWidth="1.5" />
            <line x1="46" y1="54" x2="52" y2="48" stroke="#37474f" strokeWidth="1.5" />
          </svg>
        );
    }
  };

  return (
    <div style={{ width: size, height: size }}>
      {renderSvgContent()}
    </div>
  );
}
