// src/components/blog/ui/CardGrid.tsx
import { Card } from './Card';

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
  theme?: 'light' | 'dark';
  clickedCards: string[];
  openCardId: string | null;
  onCardClick: (id: string) => void;
  onNextCard: () => void;
  onExit: () => void;
}

export const CardGrid = ({ 
  title, 
  cards,
  theme,
  clickedCards,
  openCardId,
  onCardClick,
  onNextCard,
  onExit
}: CardGridProps) => {
  return (
    <section id="key-challenges" className="mb-16">
      <h2 className="text-2xl font-bold mb-8">{title}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
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
              onCardClick={onCardClick}
              onNextCard={index < cards.length - 1 ? onNextCard : undefined}
              onExit={onExit}
              isModalOpen={openCardId === card.id}
            />
          </div>
        ))}
      </div>
    </section>
  );
};