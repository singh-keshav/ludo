const findQuadrant = (x, y) => {
	if (x < 7 && y < 7) return 1;
	if (x > 7 && y < 7) return 2;
	if (x > 7 && y > 7) return 3;
	if (x < 7 && y > 7) return 4;
};
const quadrantMoveOption = {
	1: { x: 1, y: -1 },
	2: { x: 1, y: 1 },
	3: { x: -1, y: 1 },
	4: { x: -1, y: -1 },
};

const movePawnAtEntryPosition = (x, y) => {
	if (x === 6 && y === 0) return { x: x + 1, y };
	if (x === 6 && y === 12) return { x: x - 1, y };
	if (x === 0 && y === 6) return { x: x, y: y + 1 };
	if (x === 12 && y === 6) return { x: x, y: y - 1 };
};

const allowedEntryColor = (x, y) => {
	if (x === 7 && y === 0) return 'green';
	if (x === 7 && y === 14) return 'blue';
	if (x === 0 && y === 7) return 'red';
	if (x === 14 && y === 7) return 'yellow';
	return false;
};
const handleEntryPoint = (x, y, pawnColor) => {
	console.log('hanldeEntrypoint');
	const allowedColor = allowedEntryColor(x, y);
	if (x === 0) return y - 1 > 5 ? { x, y: y - 1 } : { x: x + 1, y };
	if (y === 0) return x + 1 < 9 ? { x: x + 1, y } : { x, y: y + 1 };
	if (x === 14) return y + 1 < 9 ? { x, y: y + 1 } : { x: x - 1, y };

	if (y === 14) return x - 1 > 5 ? { x: x - 1, y } : { x, y: y - 1 };

	//do something
};
const isAnyEdgePoint = (x, y) => {
	console.log('isAnyEdgePoint');
	if (x === 0 || x === 14 || y === 0 || y === 14) return true;
	return false;
};
const handleEdgePoints = (x, y) => {
	console.log('handleedgepoint');
	if (x === 0) return y - 1 > 5 ? { x, y: y - 1 } : { x: x + 1, y };
	if (y === 0) return x + 1 < 9 ? { x: x + 1, y } : { x, y: y + 1 };
	if (x === 14) return y + 1 < 9 ? { x, y: y + 1 } : { x: x - 1, y };
	if (y === 14) return x - 1 > 5 ? { x: x - 1, y } : { x, y: y - 1 };
	return { x, y };
};
const isBothCenterPoint = (x, y) => {
	if (x === 6 && y === 6) return true;
	if (x === 8 && y === 6) return true;
	if (x === 8 && y === 8) return true;
	if (x === 6 && y === 8) return true;
	return false;
};

const movementAxis = (x, y) => {
	if (x === 6 || x === 8) return 'x';
	if (y === 6 || y === 8) return 'y';
};

export default function movePawn(x, y) {
	if (allowedEntryColor(x, y)) return handleEntryPoint(x, y);
	const availableMoves = quadrantMoveOption[findQuadrant(x, y)];
	if (isAnyEdgePoint(x, y)) return handleEdgePoints(x, y);
	console.log('normal case');
	let x1 = 0,
		y1 = 0;
	if (movementAxis(x, y) === 'x') {
		x1 = x;
		y1 = y + availableMoves.y;
	} else {
		x1 = x + availableMoves.x;
		y1 = y;
	}
	if (isBothCenterPoint(x1, y1)) return { x: x + availableMoves.x, y: y + availableMoves.y };
	return { x: x1, y: y1 };
}
