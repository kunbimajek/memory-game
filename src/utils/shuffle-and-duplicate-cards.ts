import _ from "lodash";

/**
 * Duplicates and shuffles an array of card objects.
 * This function takes an array of cards, duplicates each card, assigns a new unique ID
 * to each duplicated card, and shuffles the combined array. The function ensures that
 * each card and its duplicate will have unique `id` properties.
 *
 * @param {Card[]} cards - The array of card objects to duplicate and shuffle. Each card has an id, name, img, isFlipped, and isOpened properties.
 * @returns {Card[]} A new array of card objects where each card is duplicated and shuffled.
 *                   Each card in the returned array will have a unique id.
 */
export const shuffleAndDuplicateCards = (cards: CardType[]): CardType[] => {
  const duplicatedCards = [...cards, ...cards].map((card, index) => ({
    ...card,
    id: index + 1,
  }));
  return _.shuffle(duplicatedCards);
};
