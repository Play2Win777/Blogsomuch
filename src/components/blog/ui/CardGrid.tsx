// src/components/blog/ui/CardGrid.tsx
import { useState } from 'react';
import { Card } from './Card';
import { useTheme } from '../ThemeContext';

interface CardData {
  id: string;
  title: string;
  content: string;
  longContent?: string;
  image?: string;
}

interface CardGridProps {
  title: string;
  cards: CardData[];
}

export const CardGrid = ({ title, cards }: CardGridProps) => {
  const { theme } = useTheme();
  const [clickedCards, setClickedCards] = useState<string[]>([]);
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    if (!clickedCards.includes(id)) {
      setClickedCards(prev => [...prev, id]);
    }
    setOpenCardId(id);
  };

  const handleNextCard = () => {
    const currentIndex = cards.findIndex(card => card.id === openCardId);
    const nextIndex = currentIndex + 1;
    if (nextIndex < cards.length) {
      setOpenCardId(cards[nextIndex].id);
      if (!clickedCards.includes(cards[nextIndex].id)) {
        setClickedCards(prev => [...prev, cards[nextIndex].id]);
      }
    }
  };

  const handleExit = () => {
    setOpenCardId(null);
  };

  return (
    <section id="key-challenges" className="mb-16">
      <h2 className="text-2xl font-bold mb-8">{title}</h2>
      <div className="grid grid-cols-2 gap-2 auto-rows-[16rem]">
        {cards.map((card, index) => (
          <div key={card.id}>
            <Card
              id={card.id}
              title={card.title}
              content={card.content}
              longContent={card.longContent}
              image={card.image}
              theme={theme}
              isClicked={clickedCards.includes(card.id)}
              onCardClick={handleCardClick}
              onNextCard={index < cards.length - 1 ? handleNextCard : undefined}
              onExit={handleExit}
              isModalOpen={openCardId === card.id}
            />
          </div>
        ))}
      </div>
    </section>
  );
};