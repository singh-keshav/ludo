import React from 'react';
import { squareLength } from './config';

// const positions = { red: { 1: { x: 2, y: 3 } } };

const Pawn = ({ x, y, color, onClick, hightLight, pawnNumber }) => {
	return (
		<div
			style={{
				width: '1.5rem',
				height: '1.5rem',
				background: 'black',
				position: 'absolute',
				top: y * squareLength + squareLength * 0.5 - 0.75 + 'rem',
				left: x * squareLength + squareLength * 0.5 - 0.75 + 'rem',
				transition: 'top 0.3s, left 0.3s',
				borderRadius: '50%',
				backgroundColor: color,
				cursor: 'pointer',
				border: hightLight === color ? '4px solid black' : null,
			}}
			onClick={() => onClick(color, pawnNumber)}
		></div>
	);
};

export default function Pawns({ positions, onClick, currentTurn = 'green' }) {
	return (
		<div>
			{['red', 'green', 'yellow', 'blue'].map((color) =>
				[1, 2, 3, 4].map((pawnNumber) => (
					<Pawn
						key={color + pawnNumber}
						color={color}
						pawnNumber={pawnNumber}
						x={positions[color][pawnNumber].x}
						y={positions[color][pawnNumber].y}
						onClick={onClick}
						hightLight={currentTurn}
					/>
				))
			)}
		</div>
	);
}
