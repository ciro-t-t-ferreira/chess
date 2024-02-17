"use strict";
/*
To do: disallow pieces from go through other pieces

Bug: when I click, consecutively (?) pieces of the same color it adds the legal moves

Refat:
    -Distribute the code through more files (model, controler, constants)
    -it must be a simpler way of describing the pieces moves in general
    -I created a reverse dictionary to access the keys through the values, which is kinda ridiculous, it must be a
        more reasonable way to do that
*/
const columnDictionary = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h'
};
const columnDictionaryReverse = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'h': 7
};
var Colors;
(function (Colors) {
    Colors[Colors["white"] = 0] = "white";
    Colors[Colors["black"] = 1] = "black";
})(Colors || (Colors = {}));
class Squares {
    constructor(column, row) {
        this.column = column;
        this.row = row;
        this.piece = null;
    }
    createPiece(piece) {
        removePieceFromBoard(this);
        this.piece = piece;
        addPieceOnBoard(piece, this);
    }
    destructPiece() {
        this.piece = null;
        removePieceFromBoard(this);
    }
}
class Piece {
    constructor(color) {
        this.color = color;
    }
}
class Pawn extends Piece {
    constructor(color) {
        super(color);
    }
    static legalMoves(square) {
        var _a;
        let legalSquares = [];
        let colorPiece = (_a = square.piece) === null || _a === void 0 ? void 0 : _a.color;
        let column = square.column;
        let row = square.row;
        if (colorPiece == Colors.white) {
            if (row == 1) {
                if (tableState[column][row + 1].piece == null) {
                    legalSquares.push([column, row + 1]);
                }
                if ((tableState[column][row + 1].piece == null) &&
                    ((tableState[column][row + 1].piece == null)))
                    legalSquares.push([column, row + 2]);
            }
            else {
                //can the isInsideBoard check this when I implement promotion
                if (tableState[column][row + 1].piece == null) {
                    isInsideBoard(column, row + 1) ? legalSquares.push([column, row + 1]) : undefined;
                }
            }
        }
        if (colorPiece == Colors.black) {
            if (row == 6) {
                if (tableState[column][row - 1].piece == null) {
                    legalSquares.push([column, row - 1]);
                }
                if ((tableState[column][row - 1].piece == null) &&
                    ((tableState[column][row - 1].piece == null)))
                    legalSquares.push([column, row - 2]);
            }
            else {
                //can the isInsideBoard check this when I implement promotion
                if (tableState[column][row - 1].piece == null) {
                    isInsideBoard(column, row - 1) ? legalSquares.push([column, row - 1]) : undefined;
                }
            }
        }
        return legalSquares;
    }
    legalMoves(square) {
        return Pawn.legalMoves(square);
    }
}
class Knight extends Piece {
    constructor(color) {
        super(color);
    }
    static legalMoves(square) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        let legalSquares = [];
        let column = square.column;
        let row = square.row;
        let colorPiece = (_a = square.piece) === null || _a === void 0 ? void 0 : _a.color;
        if (colorPiece != ((_b = tableState[column + 2][row + 1].piece) === null || _b === void 0 ? void 0 : _b.color)) {
            isInsideBoard(column + 2, row + 1) ? legalSquares.push([column + 2, row + 1]) : undefined;
        }
        if (colorPiece != ((_c = tableState[column + 2][row - 1].piece) === null || _c === void 0 ? void 0 : _c.color)) {
            isInsideBoard(column + 2, row - 1) ? legalSquares.push([column + 2, row - 1]) : undefined;
        }
        if (colorPiece != ((_d = tableState[column - 2][row + 1].piece) === null || _d === void 0 ? void 0 : _d.color)) {
            isInsideBoard(column - 2, row + 1) ? legalSquares.push([column - 2, row + 1]) : undefined;
        }
        if (colorPiece != ((_e = tableState[column - 2][row - 1].piece) === null || _e === void 0 ? void 0 : _e.color)) {
            isInsideBoard(column - 2, row - 1) ? legalSquares.push([column - 2, row - 1]) : undefined;
        }
        if (colorPiece != ((_f = tableState[column + 1][row + 2].piece) === null || _f === void 0 ? void 0 : _f.color)) {
            isInsideBoard(column + 1, row + 2) ? legalSquares.push([column + 1, row + 2]) : undefined;
        }
        if (colorPiece != ((_g = tableState[column + 1][row - 2].piece) === null || _g === void 0 ? void 0 : _g.color)) {
            isInsideBoard(column + 1, row - 2) ? legalSquares.push([column + 1, row - 2]) : undefined;
        }
        if (colorPiece != ((_h = tableState[column - 1][row + 2].piece) === null || _h === void 0 ? void 0 : _h.color)) {
            isInsideBoard(column - 1, row + 2) ? legalSquares.push([column - 1, row + 2]) : undefined;
        }
        if (colorPiece != ((_j = tableState[column - 1][row - 2].piece) === null || _j === void 0 ? void 0 : _j.color)) {
            isInsideBoard(column - 1, row - 2) ? legalSquares.push([column - 1, row - 2]) : undefined;
        }
        return legalSquares;
    }
    legalMoves(square) {
        return Knight.legalMoves(square);
    }
}
class Bishop extends Piece {
    constructor(color) {
        super(color);
    }
    static legalMoves(square) {
        var _a;
        let legalSquares = [];
        let column = square.column;
        let row = square.row;
        let colorPiece = (_a = square.piece) === null || _a === void 0 ? void 0 : _a.color;
        let possibleColumn = column;
        let possibleRow = row;
        let insideBoard = true;
        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)) {
            possibleColumn += 1;
            possibleRow += 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) {
                break;
            }
            if (insideBoard) {
                legalSquares.push([possibleColumn, possibleRow]);
            }
        }
        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;
        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)) {
            possibleColumn -= 1;
            possibleRow -= 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) {
                break;
            }
            if (insideBoard) {
                legalSquares.push([possibleColumn, possibleRow]);
            }
        }
        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;
        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)) {
            possibleColumn += 1;
            possibleRow -= 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) {
                break;
            }
            if (insideBoard) {
                legalSquares.push([possibleColumn, possibleRow]);
            }
        }
        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;
        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)) {
            possibleColumn -= 1;
            possibleRow += 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) {
                break;
            }
            if (insideBoard) {
                legalSquares.push([possibleColumn, possibleRow]);
            }
        }
        return legalSquares;
    }
    legalMoves(square) {
        return Bishop.legalMoves(square);
    }
}
class Rook extends Piece {
    constructor(color) {
        super(color);
    }
    static legalMoves(square) {
        var _a;
        let legalSquares = [];
        let column = square.column;
        let row = square.row;
        let colorPiece = (_a = square.piece) === null || _a === void 0 ? void 0 : _a.color;
        let possibleColumn = column;
        let possibleRow = row;
        let insideBoard = true;
        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)) {
            possibleColumn += 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) {
                break;
            }
            if (insideBoard) {
                legalSquares.push([possibleColumn, possibleRow]);
            }
        }
        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;
        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)) {
            possibleColumn -= 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) {
                break;
            }
            if (insideBoard) {
                legalSquares.push([possibleColumn, possibleRow]);
            }
        }
        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;
        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)) {
            possibleRow += 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) {
                break;
            }
            if (insideBoard) {
                legalSquares.push([possibleColumn, possibleRow]);
            }
        }
        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;
        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)) {
            possibleRow -= 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) {
                break;
            }
            if (insideBoard) {
                legalSquares.push([possibleColumn, possibleRow]);
            }
        }
        return legalSquares;
    }
    legalMoves(square) {
        return Rook.legalMoves(square);
    }
}
class Queen extends Piece {
    constructor(color) {
        super(color);
    }
    static legalMoves(square) {
        let legalSquares = [];
        legalSquares = Rook.legalMoves(square).concat(Bishop.legalMoves(square));
        return legalSquares;
    }
    legalMoves(square) {
        return Queen.legalMoves(square);
    }
}
class King extends Piece {
    constructor(color) {
        super(color);
    }
    static legalMoves(square) {
        let legalSquares = [];
        let column = square.column;
        let row = square.row;
        let possibleColumn;
        let possibleRow;
        possibleColumn = column + 1;
        possibleRow = row;
        isInsideBoard(possibleColumn, possibleRow) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        possibleColumn = column - 1;
        possibleRow = row;
        isInsideBoard(possibleColumn, possibleRow) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        possibleColumn = column;
        possibleRow = row + 1;
        isInsideBoard(possibleColumn, possibleRow) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        possibleColumn = column;
        possibleRow = row - 1;
        isInsideBoard(possibleColumn, possibleRow) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        possibleColumn = column + 1;
        possibleRow = row + 1;
        isInsideBoard(possibleColumn, possibleRow) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        possibleColumn = column - 1;
        possibleRow = row - 1;
        isInsideBoard(possibleColumn, possibleRow) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        possibleColumn = column + 1;
        possibleRow = row - 1;
        isInsideBoard(possibleColumn, possibleRow) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        possibleColumn = column - 1;
        possibleRow = row + 1;
        isInsideBoard(possibleColumn, possibleRow) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        return legalSquares;
    }
    legalMoves(square) {
        return King.legalMoves(square);
    }
}
function isInsideBoard(column, row) {
    if ((0 <= column && column <= 7) && (0 <= row && row <= 7)) {
        return true;
    }
    else {
        return false;
    }
}
function isFriendlyPiece(color, column, row) {
    if (isInsideBoard(column, row)) {
        let currentPieceInSquare = tableState[column][row].piece;
        if (color == Colors.white) {
            return (currentPieceInSquare === null || currentPieceInSquare === void 0 ? void 0 : currentPieceInSquare.color) == Colors.white ? true : false;
        }
        else if (color == Colors.black) {
            console.log('currentPieceInSquare');
            return (currentPieceInSquare === null || currentPieceInSquare === void 0 ? void 0 : currentPieceInSquare.color) == Colors.black ? true : false;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
function isACapture(color, column, row) {
    let currentPieceInSquare = tableState[column][row].piece;
    if (color == Colors.white) {
        return (currentPieceInSquare === null || currentPieceInSquare === void 0 ? void 0 : currentPieceInSquare.color) == Colors.black ? true : false;
    }
    else if (color == Colors.black) {
        console.log('currentPieceInSquare');
        return (currentPieceInSquare === null || currentPieceInSquare === void 0 ? void 0 : currentPieceInSquare.color) == Colors.white ? true : false;
    }
    else {
        return false;
    }
}
//Responsible for verifying if there is a Piece in the square to be moved,
//and for making sure that a piece will disapear in a square and apear in another
function movePiece(piece, fromSquare, toSquare) {
    if (fromSquare.piece == piece) {
        toSquare.createPiece(piece);
        fromSquare.destructPiece(); //needs to be changed to match the new functions in Square
    }
    else {
        throw new Error("Specified piece not found in Square");
    }
}
let tableState = [];
initializeEmptyBoard();
function initializeEmptyBoard() {
    for (let i = 0; i < 8; i++) {
        tableState[i] = [];
        for (let j = 0; j < 8; j++) {
            tableState[i][j] = new Squares(i, j);
        }
    }
}
initializePieces();
function initializePieces() {
    let blackPawn = new Pawn(Colors.black);
    tableState[0][6].createPiece(blackPawn);
    let whiteKing = new King(Colors.white);
    tableState[4][2].createPiece(whiteKing);
    let whiteKnight = new Knight(Colors.white);
    tableState[4][4].createPiece(whiteKnight);
    let whiteQueen = new Queen(Colors.white);
    tableState[3][3].createPiece(whiteQueen);
    let whiteRook = new Rook(Colors.white);
    tableState[0][1].createPiece(whiteRook);
    let whiteBishop = new Bishop(Colors.white);
    tableState[2][3].createPiece(whiteBishop);
}
/*
    Player clicks square
    HTML square verifies pieces present in the square
        by checking tableState[column][row]
    Model obtains the square and runs logic by the
        Piece in the abstract

*/
//****** CONTROLLER ********
function getIdByCoordinates(column, row) {
    return columnDictionary[column] + (row + 1).toString();
}
function getIdBySquare(square) {
    return columnDictionary[square.column] + (square.row + 1).toString();
}
function addPieceOnBoard(piece, square) {
    let id = getIdBySquare(square);
    let squareHTML = document.getElementById(id);
    let pieceIMG = document.createElement('img');
    pieceIMG.classList.add('piece');
    pieceIMG.id = 'image' + square.column.toString() + square.row.toString();
    pieceIMG.setAttribute('src', createImgURL(piece));
    squareHTML === null || squareHTML === void 0 ? void 0 : squareHTML.appendChild(pieceIMG);
}
function removePieceFromBoard(square) {
    let id = getIdBySquare(square);
    let squareHTML = document.getElementById(id);
    let pieceIMG = document.getElementById('image' +
        square.column.toString() + square.row.toString());
    if (pieceIMG != null) {
        squareHTML === null || squareHTML === void 0 ? void 0 : squareHTML.removeChild(pieceIMG);
    }
}
function createImgURL(piece) {
    let URL;
    let kind = (piece.constructor.name).toLowerCase();
    let color = 'none';
    if (piece.color == 0) {
        color = 'white';
    }
    else if (piece.color == 1) {
        color = 'black';
    }
    URL = 'img/' + color + '-' + kind + '.png';
    return URL;
}
let turn = Colors.white;
let selectedSquare = null;
let selectedPiece = null;
function squareClick(id) {
    let column = columnDictionaryReverse[id[0]];
    let row = (+(id[1]) - 1); //the unary + operator trasnforms the string into a number
    let piece = tableState[column][row].piece;
    let square = tableState[column][row];
    let legalSquares = document.getElementsByClassName('legalMove');
    let legalMoveList = [];
    for (let square of legalSquares) {
        legalMoveList.push(square.id);
    }
    if ((piece === null || piece === void 0 ? void 0 : piece.color) == turn) {
        showLegalMoves(piece, square);
        selectedSquare = square;
        selectedPiece = piece;
    }
    else if ((legalMoveList.includes(id)) && (selectedPiece != null)
        && (selectedSquare != null)) {
        movePiece(selectedPiece, selectedSquare, square);
        eraseAllLegalMoves();
        changeTurn();
    }
    else {
        selectedSquare = null;
        selectedPiece = null;
        eraseAllLegalMoves();
    }
}
function changeTurn() {
    if (turn == Colors.white) {
        turn = Colors.black;
    }
    else if (turn == Colors.black) {
        turn = Colors.white;
    }
}
function showLegalMoves(piece, square) {
    let moveList = [];
    if (piece instanceof Pawn) {
        moveList = Pawn.legalMoves(square);
    }
    else if (piece instanceof Knight) {
        moveList = Knight.legalMoves(square);
    }
    else if (piece instanceof Bishop) {
        moveList = Bishop.legalMoves(square);
    }
    else if (piece instanceof Rook) {
        moveList = Rook.legalMoves(square);
    }
    else if (piece instanceof Queen) {
        moveList = Queen.legalMoves(square);
    }
    else if (piece instanceof King) {
        moveList = King.legalMoves(square);
    }
    for (let square of moveList) {
        let column = square[0];
        let row = square[1];
        let id = getIdByCoordinates(column, row);
        let squareHTML = document.getElementById(id);
        squareHTML === null || squareHTML === void 0 ? void 0 : squareHTML.classList.add('legalMove');
    }
}
function eraseAllLegalMoves() {
    let legalSquares = Array.from(document.getElementsByClassName('legalMove'));
    legalSquares.forEach(legalSquares => {
        legalSquares.classList.remove('legalMove');
    });
}
