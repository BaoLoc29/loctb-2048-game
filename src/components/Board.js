import React, { useState } from 'react'
import Tile from './Tile';
import Cell from './Cell';
import { Board } from '../helper';
import useEvent from '../hooks/useEvent';
import GameOverlay from './GameOverlay';

const BoardView = () => {
    const [board, setBoard] = useState(new Board());

    const handleKeyDonw = (even) => {
        if (board.hasWon()) {
            return;
        }
        if (even.keyCode >= 37 && even.keyCode <= 40) {
            let direction = even.keyCode - 37;
            let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
            let newBoard = boardClone.move(direction);
            setBoard(newBoard);
        }
    }

    useEvent('keydown', handleKeyDonw);

    const cells = board.cells.map((row, rowIndex) => {
        return (
            <div key={rowIndex}>
                {row.map((col, colIndex) => {
                    return <Cell key={rowIndex * board.size + colIndex} />
                })}
            </div>
        );
    });

    const tiles = board.tiles.filter((tile) => tile.value !== 0).map((tile, index) => {
        return <Tile tile={tile} key={index} />
    });
    const resetGame = () => {
        setBoard(new Board());
    }
    return (
        <div>
            <div className='details-box'>
                <div className='resetButton' onClick={resetGame}>New game</div>
                <div className='score-box'>
                    <div className='score-header'>Score</div>
                    <div>{board.score}</div>
                </div>
            </div>
            <div className='board'>
                {cells}
                {tiles}
                <GameOverlay onRestart={resetGame} board={board} />
            </div>
        </div>
    )
}

export default BoardView;