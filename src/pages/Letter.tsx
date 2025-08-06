// EnvelopeLetter.tsx
import { BackgroundLines } from '@/components/ui/background-lines';
import { useState } from 'react';

const LetterPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-foreground">
      <BackgroundLines>
    <div className="container">
      <div
        className={`envelope-wrapper ${isOpen ? 'flap' : ''}`}
        onClick={toggleEnvelope}
      >
        <div className="envelope">
          <div className="letter">
            <div className="text">
              <p className='text-center'>
                Talk To My Hand Bitch!!!!!!
              </p>
            </div>
          </div>
        </div>
        <div className="heart"></div>
      </div>
    </div>
    </BackgroundLines>
    </div>
  );
};

export default LetterPage;