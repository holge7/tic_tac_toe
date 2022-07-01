import './css/App.css';
import Board from './components/board/Board';
import Info from './components/info/Info';
import Points from './components/points/Points';
import Restart from './components/restart/restart'
import React, {useState, useEffect} from 'react';

const defaultGameHistory = {
  "cross":0,
  "circle":0
}


function App() {
  const msg = {
    'start':'Click to start the game',
    'turn_circle':'Turn of O',
    'turn_cross':'Turn of X',
    'win_cross':<div onClick={()=>{restart()}}>Player X win, <Restart /></div>,
    'win_circle':<div onClick={()=>{restart()}}>Player O win, <Restart /></div>
  }

  let [gameStatus, setGameStatus] = useState({
    'actPlayer':'cross',
    'status':false,
    'restart':false,
    'msg':'start'
  });

  let [gameHistory, setGameHistory] = useState(defaultGameHistory);

  useEffect(()=>{
    if (gameStatus.status) {
      gameHistory[gameStatus.actPlayer]++;
      setGameHistory(gameHistory)
    }
    if (gameStatus.restart) {
      setGameStatus({
        'actPlayer':gameStatus.actPlayer,
        'status':false,
        'restart':false,
        'msg':'start',
      })
    }

  });

  function restart(){
    setGameStatus({
      'actPlayer':gameStatus.actPlayer,
      'status':false,
      'restart':true,
      'msg':'start',
    })

  }

  return (
    <div className="App">
      <nav id='nav'>
        <Points class={'nav_points'} history={gameHistory} />
        <Info class='nav_info' msg={msg[gameStatus.msg]} />
      </nav>
      <section>
        <Board restart={gameStatus.restart} startPiece={gameStatus.actPlayer} setGameStatus={setGameStatus} />
      </section>
    </div>
  );
}

export default App;
