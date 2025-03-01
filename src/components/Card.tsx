import question from "../assets/question.png";

type CardProps = {
  card: {
    id: number;
    name: string;
    img: string;
    isFlipped: boolean;
  };
  onFlip: () => void;
};

const Card = ({ card, onFlip }: CardProps) => (
  <div
    className={`flip-card ${card.isFlipped ? "flipped" : ""}`}
    onClick={onFlip}
  >
    <div>
      <div className="front">
        <img
          src={question}
          alt="Question"
          className="object-cover w-full h-[100px] cursor-pointer rounded-md border-2"
        />
      </div>
      <div className="back">
        <img
          src={card.img}
          alt={`${card.name}-flag`}
          className="object-cover w-full h-[100px] cursor-pointer rounded-md"
        />
      </div>
    </div>
  </div>
);

export default Card;
