import logo from './logo.svg';
import './css/App.css';
import Board from './Board';
import React, {useState} from 'react';

function App() {
  let [gameStatus, setGameStatus] = useState(false);



  return (
    <div className="App">
      <Board setGameStatus={setGameStatus} />
    </div>
  );
}

export default App;
