import React, { useState, useEffect } from "react";
import './board.css';
import Cell from "../cell/Cell";

const players = [
    {
        'piece':'cross',
        'player_name':'player1',
        'value':1
    },
    {
        'piece':'circle',
        'player_name':'player2',
        'value':-1
    }
]

const boardDefault = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function Board(props){

    let [player, setPlayer] = useState('cross');
    let [board, setBoard] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);
    let [restart, setRestart] = useState(false);

    useEffect(()=>{
        if (restart) setRestart(false)
    });

    //Change actual player 
    function changePlayer() {
        if (player=='cross') setPlayer('circle');
        else setPlayer('cross');
    }

    //Update the array board 
    function updateBoard(pos){
        const row = Math.floor(pos/3); 
        const column = pos%3;
        board[row][column] = player == 'cross' ? 1 : -1;
        setBoard(board)
    }

    function changeTurn(pos){
        updateBoard(pos);
        changePlayer();
        let gameResult = reviseGame(board);

        //One player win
        if (gameResult) {
            setBoard([
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ]);
            let player = players.find(p=>p.value==gameResult/3);
            props.setGameStatus(player.piece);
            setRestart(true)
        }
    }

    function generateCells(){
        let cells = [];
        for (let i = 0; i < 9; i++) {
            cells.push(
                <Cell 
                    key={i} 
                    actualState={player} 
                    changePlayer={()=>{changeTurn(i)}} 
                />)
        }
        return cells;
    }

    return(
        <div id="board">
            {!restart && generateCells()}
        </div>
    )
}

//Revise the board, 
/*
RETURNS

- Any winner:
false

- Winner:
3 (cross)
-3 (circle)
*/
function reviseGame(board){
    let res;
    //Rows
    for (let i = 0; i < board.length; i++) {
        //Rows
        if(res = checkWinner(board[i][0] + board[i][1] + board[i][2])) return res;
        //Columns
        if(res = checkWinner(board[0][i] + board[1][i] + board[2][i])) return res
    }

    //Diagonals
    if(res = checkWinner(board[0][0] + board[1][1] + board[2][2])) return res;
    if(res = checkWinner(board[2][0] + board[1][1] + board[0][2])) return res;
    
    return false;
}

//Check if there is a winner
function checkWinner(res){
    if (Math.abs(res)/3 == 1) return res
    return false;
}