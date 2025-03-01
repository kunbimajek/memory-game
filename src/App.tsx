import "./styles.css";
import { useState, useEffect } from "react";
import Card from "./components/Card";
import GameStats from "./components/GameStats";
import SuccessMessage from "./components/SuccessMessage";
import { fetchCountries } from "./lib/api/countries";
import { shuffleAndDuplicateCards } from "./utils/shuffle-and-duplicate-cards";

export default function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [correctGuesses, setCorrectGuesses] = useState<number>(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);
  const [isGameComplete, setIsGameComplete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isOpened)) {
      setTimeout(() => {
        setIsGameComplete(true);
      }, 300);
    }
  }, [cards]);

  const initializeGame = async () => {
    setIsLoading(true);
    const countries = await fetchCountries();
    setCards(shuffleAndDuplicateCards(countries));
    setIsLoading(false);
  };

  const handleCardFlip = (selectedCard: CardType) => {
    if (!selectedCard.isOpened) {
      const updatedCards = cards.map((card) =>
        card.id === selectedCard.id ? { ...card, isFlipped: true } : card
      );
      setCards(updatedCards);

      if (flippedCards.length === 0) {
        setFlippedCards((prev) => [...prev, selectedCard.name]);
      } else {
        if (selectedCard.name === flippedCards[0]) {
          markCardAsMatched(selectedCard.name);
          setCorrectGuesses((prev) => prev + 1);
          setFlippedCards([]);
        } else {
          setTimeout(() => {
            unflipMismatchedCards(selectedCard.name);
            setIncorrectGuesses((prev) => prev + 1);
            setFlippedCards([]);
          }, 500);
        }
      }
    }
  };

  const markCardAsMatched = (cardName: string) => {
    const updatedCards = cards.map((card) =>
      card.name === cardName
        ? { ...card, isFlipped: true, isOpened: true }
        : card
    );
    setCards(updatedCards);
  };

  const unflipMismatchedCards = (cardName: string) => {
    const updatedCards = cards.map((card) =>
      card.name === cardName || card.name === flippedCards[0]
        ? { ...card, isFlipped: false }
        : card
    );
    setCards(updatedCards);
  };

  const resetGame = () => {
    setTimeout(() => {
      setIsGameComplete(false);
      initializeGame();
      setFlippedCards([]);
      setIncorrectGuesses(0);
      setCorrectGuesses(0);
    }, 200);
  };

  return isLoading ? (
    <div className="h-screen flex justify-center items-center">
      <p className="text-center text-white text-xl">Loading game...</p>
    </div>
  ) : (
    <div className="max-w-[850px] mt-10 mx-auto flex justify-center items-center px-6">
      <div>
        <h1 className="text-yellow-500 text-6xl font-black text-center mb-2">
          THE MEMORY GAME
        </h1>
        <p className="text-white text-xl text-center font-thin">
          How good is your memory? Select the country flags that match.
        </p>
        <GameStats
          correctGuesses={correctGuesses}
          incorrectGuesses={incorrectGuesses}
        />
        <div className="grid gap-4 grid-cols-3">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onFlip={() => handleCardFlip(card)}
            />
          ))}
        </div>
        <SuccessMessage isShow={isGameComplete} onReset={resetGame} />
      </div>
    </div>
  );
}
