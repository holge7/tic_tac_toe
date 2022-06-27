import logo from './logo.svg';
import './css/App.css';
import Board from './components/board/Board';
import Nav from './components/nav/Nav';
import React, {useState, useEffect} from 'react';

const defaultGameHistory = {
  "cross":0,
  "circle":0
}

function App() {
  let [gameStatus, setGameStatus] = useState(false);
  let [gameHistory, setGameHistory] = useState(defaultGameHistory);
  let [boardRender, setBoardRender] = useState(true);
  console.log("Game status: "+gameStatus)

  useEffect(()=>{
    console.log("Entro en useEffect")
    if (gameStatus) {
      let newHistory = gameHistory;
      newHistory[gameStatus]++;
      setGameHistory(newHistory)
      setBoardRender(false);
      setGameStatus(false);
    }
  });

  return (
    <div className="App">
      <nav>
        <Nav history={gameHistory}/>
      </nav>
      <section>
        <Board setGameStatus={setGameStatus} />
      </section>
    </div>
  );
}

export default App;
