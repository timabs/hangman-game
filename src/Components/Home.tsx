import { FC } from "react";
import { Header } from "./Header";
import { Hangman } from "./Hangman";

export const Home: FC = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <Hangman />
    </div>
  );
};
