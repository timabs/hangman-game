import { FC, useState } from "react";
import { getRandomWord } from "../API/GetWord";

export const Hangman: FC = () => {
  const [randomWord, setRandomWord] = useState<string[]>();
  const [guess, setGuess] = useState<string>();
  const [gameStarted, setGameStart] = useState<boolean>();
  const retrieveRandomWord = async () => {
    setGameStart(true);
    let randomWord: string = await getRandomWord();
    const wordLength = randomWord.length;
    if (wordLength < 4 || wordLength > 20) {
      randomWord = await getRandomWord();
    }
    for (let i = 0; i < randomWord.length; i++) {
      setRandomWord([...randomWord, randomWord[i]]);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };
  const handleGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(guess);
  };
  return (
    <div className="flex items-center justify-center flex-col gap-6">
      <button
        onClick={() => retrieveRandomWord()}
        className={`${
          gameStarted ? "hidden" : ""
        } font-rethink text-white bg-green-700 px-4 py-2 rounded-md hover:bg-green-800`}
      >
        Start
      </button>
      <div className="flex flex-row gap-6">
        {randomWord?.map((letter, index) => (
          <div className="text-5xl" data-letterpos={index + 1} key={index}>
            __
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => handleGuess(e)}
        className={`${
          gameStarted ? "" : "hidden"
        } flex flex-col gap-3 justify-center items-center`}
      >
        <label
          htmlFor="guess"
          className="font-rethink flex flex-row gap-3 items-center justify-center"
        >
          <input
            type="text"
            id="guess"
            name="guess"
            value={guess}
            onChange={(e) => handleChange(e)}
            className="outline-none border-b-2 w-2/3 border-green-700 active:outline-1 px-2 py-1"
          ></input>
        </label>
        <input
          type="submit"
          value="Guess"
          className="bg-green-700 text-white rounded-md px-4 py-2 w-2/3 hover:cursor-pointer hover:bg-green-800"
        ></input>
      </form>
    </div>
  );
};
