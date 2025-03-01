type SuccessMessageProps = {
  isShow: boolean;
  onReset: () => void;
};

const SuccessMessage = ({ isShow, onReset }: SuccessMessageProps) => (
  <div
    className={`fixed w-full text-center transition-all duration-500 bg-teal-500 p-4 ${
      isShow ? "bottom-0" : "-bottom-[150px]"
    }`}
  >
    <p className="text-white text-[18px] mb-2">
      Yay! You completed the memory game 🎉
    </p>
    <button
      onClick={onReset}
      className="bg-yellow-500 border-0 rounded-md px-5 py-2 font-semibold text-gray-900 text-[15px] cursor-pointer"
    >
      Reset
    </button>
  </div>
);

export default SuccessMessage;
