import React, { useState } from 'react';
import AddPlayer from '../components/addPlayer';
import ShowPlayer from '../components/playerCard';
import Navigation from '../components/nav';
import Game from '../components/gameArea';
import { GameStore, words } from '../stores/gameStore';

const App = () => {
  const [players, setPlayers] = useState([]);
  const gameStore = new GameStore(players);

  const deletePlayer = (name) => {
    const updatedPlayers = players.filter(p => p.nickname !== name);
    setPlayers(updatedPlayers);
  };

  return (
    <>
      <Navigation title={"Words Guessing Game"} />
      <br />
      <AddPlayer isEnabled={players.length < 5} players={players} setPlayers={setPlayers} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {players.map((player, index) => (
          <ShowPlayer
            key={index}
            nickname={player.nickname}
            imageLink={player.imageLink}
            onDelete={deletePlayer}
          ></ShowPlayer>
        ))}
      </div>

      <div>
        <Game players={players} gameStore={gameStore}/>
      </div>
    </>
  );
};

export default App;
