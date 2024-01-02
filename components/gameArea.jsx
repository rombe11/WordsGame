import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const Game = observer(({ gameStore, players }) => {
  useEffect(() => {
    if (gameStore.gameRunning) {
      const intervalId = setInterval(() => {
        gameStore.randomizePlayer();
        const selectedLetter = gameStore.randomizeLetter();
        gameStore.checkGuess(selectedLetter);
        gameStore.checkWinner();
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [gameStore.gameRunning]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <br /><br />
      <button
        id="btnStart"
        onClick={() => gameStore.startGame()}
        disabled={players.length < 2 || gameStore.gameRunning}
        style={{ backgroundColor: 'lightgray', borderRadius: '20px', width: '120px', height: 'auto' }}
      >
        Start Game
      </button>
      <strong><p id="wordParagraph" style={{ fontSize: '25px' }}>Word: {gameStore.wordStr}</p></strong>
      <input
        id="guessInput"
        type="text"
        value={`${gameStore.currNickname}'s guess: ${gameStore.txtGuess}`}
        readOnly
      />

      <div style={{ backgroundColor: 'lightgray', borderRadius: '20px', padding: '10px', width:"200px", marginTop: '20px', textAlign: 'center' }}>
        {gameStore.players.map(player => (
          <div key={player.nickname}>
            <p>{player.nickname}:  {player.points} Pts</p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Game;
