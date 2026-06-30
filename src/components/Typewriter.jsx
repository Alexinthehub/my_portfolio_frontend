// src/components/Typewriter.jsx
import { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 80 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <span>
      {displayText}
      <span
        style={{
          display: 'inline-block',
          width: '3px',
          height: '1em',
          backgroundColor: '#5DD62C',
          marginLeft: '2px',
          verticalAlign: 'text-bottom',
          animation: 'blink 0.7s step-end infinite',
        }}
      />
    </span>
  );
};

export default Typewriter;