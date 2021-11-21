import { squareLength } from './config';

const numberToColorMap = ['red', 'green', 'blue', 'yellow'];

const numberToFaceMap = {
	1: 'rotateY(0deg)',
	2: 'rotateY(90deg)',
	3: 'rotateY(180deg)',
	4: 'rotateY(270deg)',
	5: 'rotateX(270deg)',
	6: 'rotateX(90deg)',
};

export const Dice = ({ turn = 'red', onClick, diceValue }) => {
	const locations = [
		{ x: 0, y: -squareLength + 'rem' },
		{ x: squareLength * 14 + 'rem', y: -squareLength + 'rem' },
		{ x: 0, y: squareLength * 15 + 'rem' },
		{ x: squareLength * 14 + 'rem', y: squareLength * 15 + 'rem' },
	];
	console.log(numberToFaceMap[diceValue]);

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
							class="container"
							onClick={onClick}
							style={{ top: '1px', transform: numberToFaceMap[diceValue] }}
						>
							<div class="one">
								<div class="point-5"></div>
							</div>
							<div class="two">
								<div class="point-3"></div>
								<div class="point-7"></div>
							</div>
							<div class="three">
								<div class="point-3"></div>
								<div class="point-5"></div>
								<div class="point-7"></div>
							</div>
							<div class="four">
								<div class="point-1"></div>
								<div class="point-3"></div>
								<div class="point-7"></div>
								<div class="point-9"></div>
							</div>
							<div class="five">
								<div class="point-1"></div>
								<div class="point-3"></div>
								<div class="point-5"></div>
								<div class="point-7"></div>
								<div class="point-9"></div>
							</div>
							<div class="six">
								<div class="point-1"></div>
								<div class="point-3"></div>
								<div class="point-4"></div>
								<div class="point-6"></div>
								<div class="point-7"></div>
								<div class="point-9"></div>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};
