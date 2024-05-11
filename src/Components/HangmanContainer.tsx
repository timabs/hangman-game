import { FC } from "react";

interface HangmanProps {
  incorrectGuesses: string[];
}

export const HangmanContainer: FC<HangmanProps> = ({ incorrectGuesses }) => {
  return (
    <div className="flex justify-center items-end h-64">
      <div className="w-24 h-48 border-4 border-black relative">
        <div className="w-1 bg-black h-5 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
        {incorrectGuesses.length > 0 && (
          <div className="w-7 h-7 border-2 border-black rounded-full bg-white absolute top-5 left-1/2 transform -translate-x-1/2"></div>
        )}
        {incorrectGuesses.length > 1 && (
          <div className="w-1 bg-black h-14 absolute top-12 left-1/2 transform -translate-x-1/2"></div>
        )}
        {incorrectGuesses.length > 2 && (
          <div className="w-12 h-1 bg-black absolute top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 origin-top"></div>
        )}
        {incorrectGuesses.length > 3 && (
          <div className="w-12 h-1 bg-black absolute top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 origin-top"></div>
        )}
        {incorrectGuesses.length > 4 && (
          <div className="w-1 bg-black h-12 absolute top-26 left-1/2 transform -translate-x-1/2 rotate-12"></div>
        )}
        {incorrectGuesses.length > 5 && (
          <div className="w-1 bg-black h-12 absolute top-26 left-1/2 transform -translate-x-1/2 -rotate-12"></div>
        )}
      </div>
    </div>
  );
};
