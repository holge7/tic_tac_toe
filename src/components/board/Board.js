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

    let [player, setPlayer] = useState(props.startPiece);
    let [board, setBoard] = useState(boardDefault.map(a => a.slice()));
    let [restart, setRestart] = useState(false);



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
            //Set new visual board
            setBoard(boardDefault.map(a => a.slice()));
            //Search the player winner
            let playerWinner = players.find(p=>p.value==gameResult/3);
            //Pass the winner to App
            props.setGameStatus({
                'actPlayer':playerWinner.piece,
                'status':true,
                'restart':false,
                'msg':'win_'+playerWinner.piece,
            });
            setRestart(true);
        }else{
            //Pass the player actual to App
            props.setGameStatus({
                'actPlayer':player.piece,
                'status':false,
                'restart':false,
                'msg':getMsgGameStatus()
            });
        }
    }

    function getMsgGameStatus(){
        if (player=='cross') return 'turn_circle';
        else return 'turn_cross';
    }

    function generateCells(){
        let cells = [];
        for (let i = 0; i < 9; i++) {
            cells.push(
                <Cell 
                    key={i} 
                    actualState={player} 
                    restart={restart}
                    changePlayer={()=>{changeTurn(i)}} 
                />)
        }
        return cells;
    }

    return(
        <div id="board">
            {!props.restart && generateCells()}
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