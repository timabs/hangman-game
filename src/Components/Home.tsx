import { FC } from "react";
import { Header } from "./Header";
import { Hangman } from "./Hangman";

export const Home: FC = () => {
  return (
    <div className="w-full h-full bg-bg flex flex-col gap-6">
      <Header />
      <Hangman />
    </div>
  );
};
