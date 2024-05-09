import { FC, useState } from "react";
import { getRandomWord } from "../API/GetWord";

export const Hangman: FC = () => {
  const [randomWord, setRandomWord] = useState<string>();
  const retrieveRandomWord = async () => {
    const randomWord = await getRandomWord();
    setRandomWord(randomWord);
  };
  return (
    <div className="flex items-center justify-center flex-col gap-6">
      <button
        onClick={() => retrieveRandomWord()}
        className="font-rethink text-white bg-green-700 px-4 py-2 rounded-md hover:bg-green-800"
      >
        Start
      </button>
      <div>{randomWord}</div>
    </div>
  );
};
