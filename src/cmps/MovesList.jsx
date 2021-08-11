import React from 'react';

export function MovesList({ moves, title }) {
  return (
    <section className="move-list">
      <span>
        <h4>{title}: </h4>
        <div>
          {moves.map((move) => {
            return (
              <div key={move.at} className="list-items">
                <span>To: {move.to}</span>
                <span>
                  At: {new Date(move.at).toLocaleDateString('he-IL')},{' '}
                  {new Date(move.at).toLocaleTimeString('he-IL')}
                </span>
                <span>Coins: {move.amount}</span>
              </div>
            );
          })}
        </div>
      </span>
    </section>
  );
}
