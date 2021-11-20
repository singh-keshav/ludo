import { squareLength } from './config';

const numberToColorMap = ['red', 'green', 'blue', 'yellow'];

export const Dice = ({ turn = 'red', onClick, diceValue }) => {
	const locations = [
		{ x: 0, y: -squareLength + 'rem' },
		{ x: squareLength * 14 + 'rem', y: -squareLength + 'rem' },
		{ x: 0, y: squareLength * 15 + 'rem' },
		{ x: squareLength * 14 + 'rem', y: squareLength * 15 + 'rem' },
	];

	return (
		<div>
			{locations.map((location, index) => (
				<div
					key={index}
					style={{
						position: 'absolute',
						top: location.y,
						left: location.x,
						border: '1px solid black',
						width: squareLength + 'rem',
						height: squareLength + 'rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{numberToColorMap[index] === turn && (
						<div
							style={{
								width: '90%',
								height: '90%',
								backgroundColor: 'black',
								color: 'white',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								cursor: 'pointer',
							}}
							onClick={onClick}
						>
							{diceValue}
						</div>
					)}
				</div>
			))}
		</div>
	);
};
