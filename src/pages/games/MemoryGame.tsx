import React, { useState, useEffect } from 'react';
import { BackButton } from '../../components/ui/BackButton';
import { Gamepad2 } from 'lucide-react';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

export const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<{ id: number, emoji: string, isFlipped: boolean, isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
  };

  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedCards.length === 2) return;
    
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, index]);

    if (flippedCards.length === 1) {
      setMoves(m => m + 1);
      const firstIndex = flippedCards[0];
      if (newCards[firstIndex].emoji === newCards[index].emoji) {
        newCards[firstIndex].isMatched = true;
        newCards[index].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const revertCards = [...newCards];
          revertCards[firstIndex].isFlipped = false;
          revertCards[index].isFlipped = false;
          setCards(revertCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const allMatched = cards.length > 0 && cards.every(c => c.isMatched);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #dcfce7 0%, #bbf7d0 100%)',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <BackButton />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '1rem', color: '#166534', fontWeight: 'bold' }}>
          <Gamepad2 /> Jogo da Memória - Movimentos: {moves}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        maxWidth: 600,
        margin: '0 auto',
        width: '100%',
        flex: 1
      }}>
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            style={{
              aspectRatio: '1',
              background: card.isFlipped || card.isMatched ? 'white' : 'linear-gradient(135deg, #22c55e, #16a34a)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              border: 'none',
              cursor: card.isFlipped || card.isMatched ? 'default' : 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}
          >
            {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
          </button>
        ))}
      </div>
      
      {allMatched && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2 style={{ color: '#166534' }}>Parabéns! Você encontrou todos os pares!</h2>
          <button onClick={initializeGame} style={{
            padding: '1rem 2rem', background: '#22c55e', color: 'white', borderRadius: '1rem', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem'
          }}>Jogar Novamente</button>
        </div>
      )}
    </div>
  );
};
