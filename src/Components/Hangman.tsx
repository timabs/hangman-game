import { FC, useState } from "react";
import { getRandomWord } from "../API/GetWord";

export const Hangman: FC = () => {
  const [randomWord, setRandomWord] = useState<string[]>();
  const retrieveRandomWord = async () => {
    let randomWord: string = await getRandomWord();
    const wordLength = randomWord.length;
    if (wordLength < 4 || wordLength > 20) {
      randomWord = await getRandomWord();
    }
    for (let i = 0; i < randomWord.length; i++) {
      setRandomWord([...randomWord, randomWord[i]]);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col gap-6">
      <button
        onClick={() => retrieveRandomWord()}
        className="font-rethink text-white bg-green-700 px-4 py-2 rounded-md hover:bg-green-800"
      >
        Start
      </button>
      <div className="flex flex-row gap-6">
        {randomWord?.map(() => (
          <div className="text-5xl">__</div>
        ))}
      </div>
    </div>
  );
};
