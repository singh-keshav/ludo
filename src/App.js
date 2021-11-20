import { useEffect, useState } from 'react';
import CenterSquare from './CenterSquare';
import { squareLength } from './config';
import { Dice } from './Dice';
import movePawn from './move';
import PawnHome from './PawnHome';
import Pawns from './Pawns';
import getRandomInt from './randomNumber';

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

const homePawnCoordinates = {
	1: { x: 1.5, y: 1.5 },
	2: { x: 3.5, y: 1.5 },
	3: { x: 1.5, y: 3.5 },
	4: { x: 3.5, y: 3.5 },
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

const Square = ({ color, x, y }) => {
	return (
		<div
			style={{
				width: squareLength + 'rem',
				height: squareLength + 'rem',
				background: color,
				border: '1px solid black',
				position: 'absolute',
				top: y * squareLength + 'rem',
				left: x * squareLength + 'rem',
			}}
		>
			{/* {x + ',' + y} */}
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
	const row = (y) => length.map((x) => <Square key={x} y={y} color={findSqareColor(x, y)} x={x} />);
	const column = (x) => length.map((y) => <Square key={y} y={y} color={findSqareColor(x, y)} x={x} />);
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

export default function App() {
	const [positions, setPositions] = useState({
		red: initialPositions('red'),
		yellow: initialPositions('yellow'),
		green: initialPositions('green'),
		blue: initialPositions('blue'),
	});
	const [currentTurn, setCurrentTurn] = useState('red');
	const [selectedPawn, setSelectedPawn] = useState(null);
	const [diceValue, setDiceValue] = useState(6);
	const [isDiceValueUsed, setIsDiceValueUsed] = useState(false);
	const [isTurnUsed, setIsTurnUsed] = useState(false);
	const [remainingPawnSteps, setRemainingPawnSteps] = useState(0);

	const handlePawnClick = (color, pawnNumber) => {
		if (color !== currentTurn) return;
		if (isDiceValueUsed) return;
		const currentPosition = positions[color][pawnNumber];
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
				setIsDiceValueUsed(true);
				setIsTurnUsed(false);
			} else if (checkIfAllPawnAtHome(positions, currentTurn)) {
				setCurrentTurn((prev) => updateTurn(prev));
			}
		} else {
			setSelectedPawn(pawnNumber);
			setRemainingPawnSteps(diceValue);
			setIsDiceValueUsed(true);
			setIsTurnUsed(false);
		}
	};

	useEffect(() => {
		if (selectedPawn && remainingPawnSteps > 0) {
			setTimeout(() => {
				setRemainingPawnSteps((prev) => --prev);
				setPositions((prev) => ({
					...prev,
					[currentTurn]: {
						...prev[currentTurn],
						[selectedPawn]: movePawn({ ...prev[currentTurn][selectedPawn], color: currentTurn }),
					},
				}));
			}, 300);
		}
		if (remainingPawnSteps === 0) {
			setCurrentTurn((prev) => updateTurn(prev));
		}
	}, [remainingPawnSteps, selectedPawn]);
	const handleDiceClick = () => {
		if (isTurnUsed) return;
		const newDiceValue = getRandomInt(5, 7);
		if (newDiceValue !== 6 && checkIfAllPawnAtHome(positions, currentTurn)) {
			console.log('ifallathome', checkIfAllPawnAtHome(positions, currentTurn));
			setCurrentTurn((prev) => updateTurn(prev));
			setIsTurnUsed(false);
			setDiceValue(newDiceValue);
			setIsDiceValueUsed(false);
		} else {
			setDiceValue(newDiceValue);
			setIsDiceValueUsed(false);
			setIsTurnUsed(true);
		}
	};
	return (
		<div
			className="App"
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
		>
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
		</div>
	);
}
