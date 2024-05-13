import { FC } from "react";

export const Header: FC = () => {
  return (
    <div className="h-1/6 flex items-center justify-start pl-8 text-bg bg-primary">
      <h1 className="text-6xl h-fit font-normal italic font-poppins">
        Hanging Out
      </h1>
    </div>
  );
};
