"use strict";
/*
    Refat:
        -it must be a simpler way of describing the king's moves
*/
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
        this.piece = piece;
    }
    destructPiece() {
        this.piece = null;
    }
}
class Piece {
    constructor(color) {
        this.color = color;
    }
}
/*
class Pawn extends Piece{
    constructor(color: Colors){
    super(color);}
    
    legalMoves(square:Squares): [number, number][] {
        let legalSquares: [number, number][];
        return legalSquares;
    }
}

class Knight extends Piece{
    constructor(color: Colors){
    super(color);}
    
    legalMoves(square:Squares): [number, number][] {
        let legalSquares: Squares[] = [];
        return legalSquares;
    }
}

class Bishop extends Piece{
    constructor(color: Colors){
    super(color);}
    
    legalMoves(square:Squares): Squares[] {
        let legalSquares: Squares[] = [];
        return legalSquares;
    }
}

class Rook extends Piece{
    constructor(color: Colors){
    super(color);}
    
    legalMoves(square:Squares): Squares[] {
        let legalSquares: Squares[] = [];
        return legalSquares;
    }
}

class Queen extends Piece{
    constructor(color: Colors){
    super(color);}
    
    legalMoves(square:Squares): Squares[] {
        let legalSquares: Squares[] = [];
        return legalSquares;
    }
}

*/
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
        console.log(legalSquares);
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
//Responsible for verifying if there is a Piece in the square to be moved,
//and for making sure that a piece will disapear in a square and apear in another
function movePiece(piece, fromSquare, toSquare) {
    if (fromSquare.piece == piece) {
        fromSquare.piece = null;
        toSquare.piece == piece;
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
    let whiteKing = new King(Colors.white);
    tableState[3][3].createPiece(whiteKing);
    King.legalMoves(tableState[3][3]);
}
/*
    Player clicks square
    HTML square verifies pieces present in the square
        by checking tableState[column][row]
    Model obtains the square and runs logic by the
        Piece in the abstract

*/
