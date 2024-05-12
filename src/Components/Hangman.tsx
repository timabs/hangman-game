import { FC, useState } from "react";
import { getRandomWord } from "../API/GetWord";
import { HangmanContainer } from "./HangmanContainer";

export const Hangman: FC = () => {
  const [randomWord, setRandomWord] = useState<string[]>([]);
  const [guess, setGuess] = useState<string>();
  const [gameStarted, setGameStart] = useState<boolean>();
  const [validIndices, setValidIndices] = useState<number[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<string[]>([]);
  const hangmanParts = [
    "head",
    "body",
    "left arm",
    "right arm",
    "left leg",
    "right leg",
  ];

  const retrieveRandomWord = async () => {
    setGameStart(true);
    let rndWord: string = await getRandomWord();
    const wordLength = rndWord.length;
    if (wordLength < 4 || wordLength > 20) {
      rndWord = await getRandomWord();
    }
    const rndWordArr = [...rndWord];
    setRandomWord(rndWordArr);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };
  const handleGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!guess) return;
    const newValidIndices: number[] = [];
    let isGuessCorrect = false;
    for (let i = 0; i < guess!.length; i++) {
      for (let j = 0; j < randomWord!.length; j++) {
        if (guess![i] === randomWord![j]) {
          newValidIndices.push(j);
          isGuessCorrect = true;
        }
      }
    }
    if (!isGuessCorrect && !incorrectGuesses.includes(guess)) {
      setIncorrectGuesses((prev) => [...prev, guess]);
    }
    setValidIndices((prevIndices) => [
      ...new Set([...prevIndices, ...newValidIndices]),
    ]);
    setGuess("");
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
            {validIndices.includes(index) ? letter : "__"}
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
      <div
        className={`${
          gameStarted ? "" : "hidden"
        } flex flex-col items-center justify-center gap-4`}
      >
        <HangmanContainer incorrectGuesses={incorrectGuesses} />
        <div className="w-fit border-2 border-gray-800 rounded-md px-4 py-2">
          Incorrect Guesses: {incorrectGuesses.join(", ")}
        </div>
      </div>
    </div>
  );
};
