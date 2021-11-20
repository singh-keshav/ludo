import { useState } from 'react';
import movePawn from './move';
import getRandomInt from './randomNumber';

const Square = ({ color, x, y }) => {
	return (
		<div
			style={{
				width: '2rem',
				height: '2rem',
				background: color,
				border: '1px solid black',
				position: 'absolute',
				top: y * 2 + 'rem',
				left: x * 2 + 'rem',
				boxSizing: 'border-box',
			}}
		></div>
	);
};

const PlayerBox = () => {
	const length = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
	const row = (y) => length.map((x) => <Square key={x} y={y} color="blue" x={x} />);
	const column = (x) => length.map((y) => <Square key={y} y={y} color="blue" x={x} />);
	return (
		<div style={{ width: '30rem', height: '30rem', background: 'gray' }}>
			<div>{[6, 7, 8].map((yco, index) => row(yco))}</div>
			<div>{[6, 7, 8].map((xco, index) => column(xco))}</div>
		</div>
	);
};

const Pawn = ({ x, y }) => {
	return (
		<div
			style={{
				width: '1rem',
				height: '1rem',
				background: 'black',
				position: 'absolute',
				top: y * 2 + 0.5 + 'rem',
				left: x * 2 + 0.5 + 'rem',
				transition: 'top 0.3s, left 0.3s',
			}}
		></div>
	);
};

export default function App() {
	const [x, setX] = useState(2);
	const [y, setY] = useState(6);
	const handleDiceThrow = () => {
		const numberOfMoves = getRandomInt(1, 7);
		const nextPostion = movePawn(x, y);
		console.log(nextPostion);
		setX(nextPostion.x);
		setY(nextPostion.y);
	};
	return (
		<div className="App">
			<h1>Hello CodeSandbox</h1>
			<h2>Start editing to see some magic happen!</h2>
			<div style={{ position: 'relative' }}>
				<PlayerBox />
				<Pawn x={x} y={y} />
			</div>
			{/* <Square color="red" /> */}
			<button onClick={handleDiceThrow}>move pawn</button>
		</div>
	);
}
