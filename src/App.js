import './css/App.css';
import Board from './components/board/Board';
import Info from './components/info/Info';
import Points from './components/points/Points';
import React, {useState, useEffect} from 'react';

const defaultGameHistory = {
  "cross":0,
  "circle":0
}

const msg = {
  'start':'Click to start the game',
  'turn_circle':'Turn of O',
  'turn_cross':'Turn of X'
}

function App() {
  let [gameStatus, setGameStatus] = useState(false);
  let [gameHistory, setGameHistory] = useState(defaultGameHistory);

  useEffect(()=>{
    console.log(gameStatus.status)
    if (gameStatus.status) {
      gameHistory[gameStatus.player.piece]++;
      setGameHistory(gameHistory)
      setGameStatus(false);
    }
  });

  return (
    <div className="App">
      <nav id='nav'>
        <Points class={'nav_points'} history={gameHistory} />
        <Info class='nav_info' msg={msg.start} />
      </nav>
      <section>
        <Board setGameStatus={setGameStatus} />
      </section>
    </div>
  );
}

export default App;
