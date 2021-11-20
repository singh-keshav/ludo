import React from 'react';
import { squareLength } from './config';

export default function CenterSquare({ x, y }) {
	return (
		<div style={{ position: 'absolute', top: y * squareLength + 'rem', left: x * squareLength + 'rem' }}>
			<div
				style={{
					position: 'absolute',
					top: squareLength * 1.5 + 'rem',
					width: 0,
					height: 0,
					borderLeft: squareLength * 1.5 + 'rem' + ' solid transparent',
					borderRight: squareLength * 1.5 + 'rem' + ' solid transparent',
					borderBottom: squareLength * 1.5 + 'rem' + ' solid blue',
				}}
			></div>
			<div
				style={{
					position: 'absolute',
					width: 0,
					height: 0,
					borderLeft: squareLength * 1.5 + 'rem' + ' solid transparent',
					borderRight: squareLength * 1.5 + 'rem' + ' solid transparent',
					borderTop: squareLength * 1.5 + 'rem' + ' solid green',
				}}
			></div>
			<div
				style={{
					position: 'absolute',
					width: 0,
					height: 0,
					borderTop: squareLength * 1.5 + 'rem' + ' solid transparent',
					borderBottom: squareLength * 1.5 + 'rem' + ' solid transparent',
					borderLeft: squareLength * 1.5 + 'rem' + ' solid red',
				}}
			></div>
			<div
				style={{
					position: 'absolute',
					left: squareLength * 1.5 + 'rem',
					borderTop: squareLength * 1.5 + 'rem' + ' solid transparent',
					borderBottom: squareLength * 1.5 + 'rem' + ' solid transparent',
					borderRight: squareLength * 1.5 + 'rem' + ' solid yellow',
				}}
			></div>
		</div>
	);
}
