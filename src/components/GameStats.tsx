type GameStatsProps = {
  correctGuesses: number;
  incorrectGuesses: number;
};

const GameStats = ({ correctGuesses, incorrectGuesses }: GameStatsProps) => (
  <div className="flex gap-4 justify-between my-10">
    <div className="bg-teal-500 rounded-md">
      <p className="px-4 py-2 text-white">
        Correct Attempts:
        <span className="ml-2 bg-white text-gray-800 px-2 py-[2px] rounded-md">
          {correctGuesses}
        </span>
      </p>
    </div>
    <div className="bg-rose-500 rounded-md">
      <p className="px-4 py-2 text-white">
        Failed Attempts:
        <span className="ml-2 bg-white text-gray-800 px-2 py-[2px] rounded-md">
          {incorrectGuesses}
        </span>
      </p>
    </div>
  </div>
);

export default GameStats;
