import { useEffect, useState } from 'react';
import CenterSquare from './CenterSquare';
import { squareLength } from './config';
import { Dice } from './Dice';
import movePawn from './move';
import PawnHome from './PawnHome';
import Pawns from './Pawns';
import getRandomInt from './randomNumber';
import star from './assets/star.png';

const homeCoordinates = {
	red: { x: 0, y: 0 },
	green: { x: 9, y: 0 },
	yellow: { x: 9, y: 9 },
	blue: { x: 0, y: 9 },
};

const startPositions = {
	red: { x: 1, y: 6 },
	green: { x: 8, y: 1 },
	yellow: { x: 13, y: 8 },
	blue: { x: 6, y: 13 },
};
// const extraSafePosition = {
// 	red: { x: 6, y: 2 },
// 	green: { x: 12, y: 6 },
// 	yellow: { x: 8, y: 12 },
// 	blue: { x: 2, y: 8 },
// };

const safePositions = [
	{ x: 1, y: 6 },
	{ x: 8, y: 1 },
	{ x: 13, y: 8 },
	{ x: 6, y: 13 },
	{ x: 6, y: 2 },
	{ x: 12, y: 6 },
	{ x: 8, y: 12 },
	{ x: 2, y: 8 },
];

const homePawnCoordinates = {
	1: { x: 1.5, y: 1.5 },
	2: { x: 3.5, y: 1.5 },
	3: { x: 1.5, y: 3.5 },
	4: { x: 3.5, y: 3.5 },
};

const isPositionSafe = ({ x, y }) => {
	return safePositions.find((pos) => pos.x === x && pos.y === y);
};

const checkIfAllPawnAtHome = (positions, color) => {
	const startPositions = initialPositions(color);
	for (let i = 1; i < 5; i++) {
		if (startPositions[i].x !== positions[color][i].x || startPositions[i].y !== positions[color][i].y) {
			return false;
		}
	}
	return true;
};

const Square = ({ color, x, y, isPositionSafe }) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: squareLength + 'rem',
				height: squareLength + 'rem',
				background: color,
				border: '1px solid black',
				position: 'absolute',
				top: y * squareLength + 'rem',
				left: x * squareLength + 'rem',
			}}
		>
			{isPositionSafe ? <img src={star} alt="" style={{ width: '90%', height: '90%' }} /> : null}
		</div>
	);
};

const findSqareColor = (x, y) => {
	if (y === 7 && x > 0 && x < 6) return 'red';
	if (y === 7 && x > 8 && x < 14) return 'yellow';
	if (x === 7 && y > 0 && y < 6) return 'green';
	if (x === 7 && y > 8 && y < 14) return 'blue';
	if (x === startPositions.red.x && y === startPositions.red.y) return 'red';
	if (x === startPositions.green.x && y === startPositions.green.y) return 'green';
	if (x === startPositions.yellow.x && y === startPositions.yellow.y) return 'yellow';
	if (x === startPositions.blue.x && y === startPositions.blue.y) return 'blue';

	return 'white';
};

const PlayerBox = () => {
	const length = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
	const row = (y) =>
		length.map((x) => (
			<Square key={x} y={y} color={findSqareColor(x, y)} x={x} isPositionSafe={isPositionSafe({ x, y })} />
		));
	const column = (x) =>
		length.map((y) => (
			<Square key={y} y={y} color={findSqareColor(x, y)} x={x} isPositionSafe={isPositionSafe({ x, y })} />
		));
	return (
		<div style={{ width: squareLength * 15 + 'rem', height: squareLength * 15 + 'rem', background: 'gray' }}>
			<div>{[6, 7, 8].map((yco, index) => row(yco))}</div>
			<div>{[6, 7, 8].map((xco, index) => column(xco))}</div>
		</div>
	);
};

const initialPositions = (color) => ({
	1: {
		x: homeCoordinates[color].x + homePawnCoordinates[1].x,
		y: homeCoordinates[color].y + homePawnCoordinates[1].y,
	},
	2: {
		x: homeCoordinates[color].x + homePawnCoordinates[2].x,
		y: homeCoordinates[color].y + homePawnCoordinates[2].y,
	},
	3: {
		x: homeCoordinates[color].x + homePawnCoordinates[3].x,
		y: homeCoordinates[color].y + homePawnCoordinates[3].y,
	},
	4: {
		x: homeCoordinates[color].x + homePawnCoordinates[4].x,
		y: homeCoordinates[color].y + homePawnCoordinates[4].y,
	},
});

const updateTurn = (currentTurn) => {
	const turns = ['red', 'green', 'yellow', 'blue'];
	const currenTurnIndex = turns.findIndex((color) => color === currentTurn);
	return turns[(currenTurnIndex + 1) % 4];
};

const getPawnAtPosition = (x, y, positions) => {
	let pawn = null;
	for (const color in positions) {
		if (Object.hasOwnProperty.call(positions, color)) {
			for (const pawnNumber in positions[color]) {
				if (Object.hasOwnProperty.call(positions[color], pawnNumber)) {
					const pawnX = positions[color][pawnNumber].x;
					const pawnY = positions[color][pawnNumber].y;
					if (pawnX === x && pawnY === y) {
						pawn = { color, pawnNumber };
					}
				}
			}
		}
	}
	return pawn;
};

export default function App() {
	const [positions, setPositions] = useState({
		red: initialPositions('red'),
		yellow: initialPositions('yellow'),
		green: initialPositions('green'),
		blue: initialPositions('blue'),
	});
	const [currentTurn, setCurrentTurn] = useState('red');
	const [diceValue, setDiceValue] = useState(null);

	console.log({ currentTurn, diceValue, positions });

	const handleDiceClick = () => {
		if (diceValue) return;
		const newDiceValue = getRandomInt(5, 7);
		setDiceValue(newDiceValue);
	};

	const handlePawnKill = ({ color, pawnNumber }) => {
		setPositions((prev) => ({
			...prev,
			[color]: { ...prev[color], [pawnNumber]: initialPositions(color)[pawnNumber] },
		}));
		setDiceValue(null);
	};

	useEffect(() => {
		if (diceValue && diceValue !== 6 && checkIfAllPawnAtHome(positions, currentTurn)) {
			setCurrentTurn((prev) => updateTurn(prev));
			setDiceValue(null);
		}
		//show and set allowed clickable pawns
	}, [diceValue]);

	const handlePawnClick = async (color, pawnNumber) => {
		//Todo: check if allowed clickable pawn, if not return
		//remove below condition once above function is ready
		if (color !== currentTurn) return;
		if (!diceValue) return;
		const currentPosition = positions[color][pawnNumber];
		console.log({ slectedPawn: { color, pawnNumber } });
		console.log({ pawnatpostion: getPawnAtPosition(currentPosition.x, currentPosition.y, positions) });

		if (
			currentPosition.x === initialPositions(color)[pawnNumber].x &&
			currentPosition.y === initialPositions(color)[pawnNumber].y
		) {
			if (diceValue === 6) {
				setPositions((prev) => ({
					...prev,
					[currentTurn]: { ...prev[currentTurn], [pawnNumber]: startPositions[color] },
				}));
				setCurrentTurn((prev) => updateTurn(prev));
				setDiceValue(null);
			}
			return;
		}
		let moves = diceValue;
		let finalPawnPosition = currentPosition;

		console.log({ finalPawnPosition });
		while (moves--) {
			finalPawnPosition = movePawn({ x: finalPawnPosition.x, y: finalPawnPosition.y, color });
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve(
						setPositions((prev) => ({
							...prev,
							[currentTurn]: {
								...prev[currentTurn],
								[pawnNumber]: movePawn({ ...prev[currentTurn][pawnNumber], color: currentTurn }),
							},
						}))
					);
				}, 300);
			});
		}
		const otherPawnAtFinalPosition = getPawnAtPosition(finalPawnPosition.x, finalPawnPosition.y, positions);
		if (otherPawnAtFinalPosition && otherPawnAtFinalPosition.color !== color && !isPositionSafe(finalPawnPosition)) {
			return handlePawnKill({ color: otherPawnAtFinalPosition.color, pawnNumber: otherPawnAtFinalPosition.pawnNumber });
		}
		if (diceValue === 6) {
			setDiceValue(null);
			return;
		}
		setCurrentTurn((prev) => updateTurn(prev));
		setDiceValue(null);
	};
	return (
		<div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<div style={{ position: 'relative' }}>
				<PlayerBox />
				<PawnHome color="red" x={0} y={0} />
				<PawnHome color="green" x={9} y={0} />
				<PawnHome color="yellow" x={9} y={9} />
				<PawnHome color="blue" x={0} y={9} />
				<Pawns positions={positions} currentTurn={currentTurn} onClick={handlePawnClick} />
				<Dice onClick={handleDiceClick} turn={currentTurn} diceValue={diceValue} />
				<CenterSquare x={6} y={6} />
			</div>
			{/* <NewDice /> */}
		</div>
	);
}
