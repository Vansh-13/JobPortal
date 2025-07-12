import React, { useEffect, useState } from 'react';
import { HiBriefcase } from 'react-icons/hi';

export default function WelcomeOverlay() {
  const [show, setShow] = useState(true);
  const [text, setText] = useState('');
  const [fadeOut, setFadeOut] = useState(false);

  const message = 'Welcome to Job World.com';

  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      if (index < message.length) {
        setText((prev) => prev + message.charAt(index));
        index++;
      } else {
        clearInterval(typing);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => setShow(false), 500);
        }, 3000);
      }
    }, 100);

    const audio = new Audio('/ElevenLabs_Text_to_Speech_audio.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => {
      console.warn('Autoplay blocked:', err);
    });

    return () => {
      clearInterval(typing);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleSkip = () => {
    setFadeOut(true);
    setTimeout(() => setShow(false), 500);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-green-50 to-white transition-opacity duration-500 ease-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Soft Blur Circles */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-green-100 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-lime-100 rounded-full filter blur-2xl opacity-20"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <HiBriefcase className="text-4xl text-green-500 mb-4 animate-bounce" />
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-green-500 to-lime-500 drop-shadow-md">
          {text}<span className="text-gray-400 animate-pulse">|</span>
        </h1>

        <button
          onClick={handleSkip}
          className="mt-6 px-4 py-2 text-sm sm:text-base bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md transition duration-300"
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
}
