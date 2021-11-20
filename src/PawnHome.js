import React from 'react';
import { squareLength } from './config';

const Circle = ({ x, y }) => {
	return (
		<div
			style={{
				position: 'absolute',
				top: y * squareLength + 'rem',
				left: x * squareLength + 'rem',
				width: squareLength + 'rem',
				height: squareLength + 'rem',
				borderRadius: '50%',
				border: '1px solid black',
			}}
		></div>
	);
};

const circlePositions = [
	{ x: 1.5, y: 1.5 },
	{ x: 3.5, y: 1.5 },
	{ x: 1.5, y: 3.5 },
	{ x: 3.5, y: 3.5 },
];

export default function PawnHome({ color, x, y }) {
	return (
		<div
			style={{
				width: squareLength * 6 + 'rem',
				height: squareLength * 6 + 'rem',
				backgroundColor: color,
				top: y * squareLength + 'rem',
				left: x * squareLength + 'rem',
				position: 'absolute',
			}}
		>
			<div
				style={{
					width: squareLength * 4 + 'rem',
					height: squareLength * 4 + 'rem',
					backgroundColor: 'white',
					position: 'absolute',
					top: squareLength + 'rem',
					left: squareLength + 'rem',
					border: '1px solid black',
				}}
			></div>
			{circlePositions.map((position, index) => (
				<Circle key={index} x={position.x} y={position.y} />
			))}
		</div>
	);
}
