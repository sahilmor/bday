import { useEffect, useState } from 'react';

const names = ['Alia', 'Bitch', 'Chichori', 'Bro', 'Nepali'];

const BirthdayWishes = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [nameIndex, setNameIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentName = names[nameIndex];
    let timeout: NodeJS.Timeout;

    if (charIndex < currentName.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentName[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText('');
        setCharIndex(0);
        setNameIndex((prev) => (prev + 1) % names.length);
      }, 2500);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, nameIndex]);

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <h1 className="text-5xl md:text-6xl font-bold text-pink-600 mb-4 animate-slide-in-left float-animation">
        Happy Birthday
      </h1>
      <h2 className="text-3xl md:text-5xl font-medium text-gray-800 dark:text-white border-r-2 border-pink-500 pr-2 animate-slide-in-right float-animation">
        {displayedText}
      </h2>
    </div>
  );
};

export default BirthdayWishes;