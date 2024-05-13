import { FC, useState } from "react";
import { getRandomWord } from "../API/GetWord";
import { HangmanContainer } from "./HangmanContainer";

export const Hangman: FC = () => {
  const [randomWord, setRandomWord] = useState<string[]>([]);
  const [guess, setGuess] = useState<string>();
  const [gameStarted, setGameStart] = useState<boolean>();
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [playerWon, setPlayerWon] = useState<boolean>(false);
  const [validIndices, setValidIndices] = useState<number[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<string[]>([]);

  const startNewGame = () => {
    setGameOver(false);
    setPlayerWon(false);
    setValidIndices([]);
    setIncorrectGuesses([]);
    retrieveRandomWord();
  };
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
    if (!guess || gameOver) return;
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
    setValidIndices((prevIndices) => {
      const updatedIndices = new Set([...prevIndices, ...newValidIndices]);

      // Check if all indices of the randomWord have been guessed
      const allIndicesFound = randomWord.every((_, index) =>
        updatedIndices.has(index)
      );
      if (allIndicesFound) {
        setPlayerWon(true);
        setGameOver(true);
      }

      return [...updatedIndices];
    });

    // Update incorrect guesses and handle game over
    if (!isGuessCorrect && !incorrectGuesses.includes(guess)) {
      const newIncorrectGuesses = [...incorrectGuesses, guess];
      setIncorrectGuesses(newIncorrectGuesses);
      if (newIncorrectGuesses.length >= 6) {
        setGameOver(true);
      }
    }
    setGuess("");
  };

  return (
    <div className="flex items-center justify-center flex-col gap-6">
      <button
        onClick={() => startNewGame()}
        className={`${gameStarted && !gameOver ? "hidden" : ""} ${
          gameOver ? "" : "w-1/6 h-20 text-3xl"
        } font-rethink bg-accent text-white px-4 py-2 rounded-md hover:bg-[#007363]`}
      >
        {gameOver ? "Start New Game" : "Start"}
      </button>
      {(playerWon || !gameOver) && (
        <div className="flex flex-row gap-6">
          {randomWord.map((letter, index) => (
            <div className="text-5xl" key={index}>
              {validIndices.includes(index) ? letter : "__"}
            </div>
          ))}
        </div>
      )}
      {gameOver && (
        <div
          className={`${
            playerWon ? "text-blue-600" : "text-red-600"
          } text-3xl font-bold`}
        >
          {playerWon ? "Congratulations! You've won!" : "Game Over! Try again."}
        </div>
      )}

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
            className="bg-bg outline-none border-b-2 w-2/3 border-accent active:outline-1 px-2 py-1"
          ></input>
        </label>
        <input
          type="submit"
          value="Guess"
          className="bg-accent text-white rounded-md px-4 py-2 w-2/3 hover:cursor-pointer hover:bg-[#007363]"
        ></input>
      </form>
      {!gameOver && (
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
      )}
    </div>
  );
};
