import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import _ from 'lodash'

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for(let i=0; i<nrows;i++){
      let col=[];
        for(let j=0; j<ncols; j++){
          col.push(trueFalse());
        }
      initialBoard.push(col);
    }
    return initialBoard;
  }

  //return random true or false values
  function trueFalse(){
    const random = Math.floor(Math.random()*2)
    if(random===0){
      return false;
    }else return true;
  }
  
  //check the board in state to determine whether the player has won.
  function hasWon() {
    let counter = 0;
        for(let row of board){
          if (!row.some(c=>c===true)){
            counter++;
          }
        }
        if (counter===ncols){
          return true;
        }
  }


  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      //Make a (deep) copy of the oldBoard
      const boardCopy=_.cloneDeep(oldBoard)
      //in the copy, flip this cell and the cells around it
      flipCell(y,x,boardCopy);
      flipCell(y-1,x,boardCopy);
      flipCell(y-1,x-1,boardCopy);
      flipCell(y,x-1,boardCopy);
      flipCell(y+1,x,boardCopy);
      flipCell(y+1,x+1,boardCopy);
      flipCell(y,x+1,boardCopy);
      flipCell(y-1,x+1,boardCopy);
      flipCell(y+1,x-1,boardCopy)

      // return the copy
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()){
    return <h1>You Win</h1>
  }


  // make table board
return  <table className="Board"> 
  <tbody>{board.map((r, y) => (
      <tr key={y}>
      {r.map((c, x) =><Cell key={`${y}-${x}`} flipCellsAroundMe={()=>flipCellsAround(`${y}-${x}`)} isLit={c}/>)}
      </tr>))}
   </tbody>
   </table>
}

export default Board;
