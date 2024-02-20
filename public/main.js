"use strict";
/*
To do:
    -Castle
    -Check for check
    -Threefold repetition
    -Track of moves
    -End game on check mate
    -Put Castle and En passent on FEN
    -Put "loading" icon in stockfish suggestions while loading
    -Complete the standard notation for exception cases

Bug:
    -Pawn can advance two pieces over Friendly piece

Usability:
    -Allow player to drag the piece to the square

Refat:
    -Distribute the code through more files (model, controler, constants)
    -it must be a simpler way of describing the pieces moves in general
    -I created a reverse dictionary to access the keys through the values, which is kinda ridiculous, it must be a
        more reasonable way to do that
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        this.subjectToEnPassant = false;
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
    addEnPassantToSquare() {
        this.subjectToEnPassant = true;
    }
    removeEnPassantFromSquare() {
        this.subjectToEnPassant = false;
    }
}
let halfMoveList = [];
let FENlist = [];
class HalfMove {
    constructor(piece, fromSquare, toSquare) {
        this.piece = piece;
        this.fromSquare = fromSquare;
        this.toSquare = toSquare;
        this.registerHalfMove();
        this.refreshCastlePrivileges();
        changeTurn();
        let fen = generateFEN();
        this.registerFEN(fen);
        this.checksThreeFoldRepetition();
        makeRequest(fen);
    }
    registerHalfMove() {
        halfMoveList.push(this);
    }
    registerFEN(fen) {
        FENlist.push(fen);
    }
    checksThreeFoldRepetition() {
        let repetitionCount = 0;
        for (let state of FENlist) {
            if (state == FENlist[FENlist.length - 1]) {
                repetitionCount += 1;
            }
        }
        if (repetitionCount >= 3) {
            window.alert('Draw by Threefold repetition');
            gameIsOver = true;
        }
    }
    refreshCastlePrivileges() {
        if (this.piece.constructor.name == 'King') {
            if (this.piece.color == Colors.white) {
                canWhiteCastleKingSide = false;
                canWhiteCastleQueenSide = false;
            }
            else if (this.piece.color == Colors.black) {
                canBlackCastleKingSide = false;
                canBlackCastleQueenSide = false;
            }
        }
        if (this.piece.constructor.name == 'Rook') {
            if (this.piece.color == Colors.white) {
                if (this.fromSquare.column == 0) {
                    canWhiteCastleQueenSide = false;
                }
                if (this.fromSquare.column == 7) {
                    canWhiteCastleKingSide = false;
                }
            }
            else if (this.piece.color == Colors.black) {
                if (this.fromSquare.column == 0) {
                    canBlackCastleQueenSide = false;
                }
                if (this.fromSquare.column == 7) {
                    canBlackCastleKingSide = false;
                }
            }
        }
    }
}
let canWhiteCastleQueenSide = true;
let canWhiteCastleKingSide = true;
let canBlackCastleQueenSide = true;
let canBlackCastleKingSide = true;
class Piece {
    constructor(color) {
        this.color = color;
    }
}
let possibleEnPassant = [];
class Pawn extends Piece {
    constructor(color) {
        super(color);
    }
    static legalMoves(square) {
        var _a;
        let legalSquares = [];
        let possibleCaptures = [];
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
                //can delete the isInsideBoard check when I implement promotion
                if (tableState[column][row + 1].piece == null) {
                    isInsideBoard(column, row + 1) ? legalSquares.push([column, row + 1]) : undefined;
                }
            }
            possibleCaptures = this.possibleCaptures(colorPiece, column, row);
            possibleEnPassant = [];
            possibleEnPassant = this.possibleEnPassant(colorPiece, column, row);
            legalSquares = legalSquares.concat(possibleCaptures).concat(possibleEnPassant);
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
                //can delete the isInsideBoard check when I implement promotion
                if (tableState[column][row - 1].piece == null) {
                    isInsideBoard(column, row - 1) ? legalSquares.push([column, row - 1]) : undefined;
                }
            }
            possibleCaptures = this.possibleCaptures(colorPiece, column, row);
            possibleEnPassant = [];
            possibleEnPassant = this.possibleEnPassant(colorPiece, column, row);
            legalSquares = legalSquares.concat(possibleCaptures).concat(possibleEnPassant);
        }
        return legalSquares;
    }
    legalMoves(square) {
        return Pawn.legalMoves(square);
    }
    static possibleCaptures(color, column, row) {
        let captureSquares = [];
        let possibleColumn = null;
        let possibleRow = null;
        if (color == Colors.white) {
            possibleColumn = column + 1;
            possibleRow = row + 1;
            if (isACapture(color, possibleColumn, possibleRow)) {
                captureSquares.push([possibleColumn, possibleRow]);
            }
            possibleColumn = column - 1;
            possibleRow = row + 1;
            if (isACapture(color, possibleColumn, possibleRow)) {
                captureSquares.push([possibleColumn, possibleRow]);
            }
            return captureSquares;
        }
        else {
            possibleColumn = column + 1;
            possibleRow = row - 1;
            if (isACapture(color, possibleColumn, possibleRow)) {
                captureSquares.push([possibleColumn, possibleRow]);
            }
            possibleColumn = column - 1;
            possibleRow = row - 1;
            if (isACapture(color, possibleColumn, possibleRow)) {
                captureSquares.push([possibleColumn, possibleRow]);
            }
            return captureSquares;
        }
    }
    static possibleEnPassant(colorPiece, column, row) {
        let enPassantSquares = [];
        if ((colorPiece == Colors.white) && (row == 4)) {
            if (tableState[column - 1][row].subjectToEnPassant) {
                enPassantSquares.push([column - 1, row + 1]);
            }
            else if (tableState[column + 1][row].subjectToEnPassant) {
                enPassantSquares.push([column + 1, row + 1]);
            }
        }
        else if ((colorPiece == Colors.black) && (row == 3)) {
            if (tableState[column - 1][row].subjectToEnPassant) {
                enPassantSquares.push([column - 1, row - 1]);
            }
            else if (tableState[column + 1][row].subjectToEnPassant) {
                enPassantSquares.push([column + 1, row - 1]);
            }
        }
        return enPassantSquares;
    }
}
class Knight extends Piece {
    constructor(color) {
        super(color);
    }
    static legalMoves(square) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        let legalSquares = [];
        let column = square.column;
        let row = square.row;
        let colorPiece = (_a = square.piece) === null || _a === void 0 ? void 0 : _a.color;
        if (isInsideBoard(column + 2, row + 1)) {
            if (colorPiece != ((_c = (_b = tableState[column + 2][row + 1]) === null || _b === void 0 ? void 0 : _b.piece) === null || _c === void 0 ? void 0 : _c.color)) {
                legalSquares.push([column + 2, row + 1]);
            }
        }
        if (isInsideBoard(column + 2, row - 1)) {
            if (colorPiece != ((_e = (_d = tableState[column + 2][row - 1]) === null || _d === void 0 ? void 0 : _d.piece) === null || _e === void 0 ? void 0 : _e.color)) {
                legalSquares.push([column + 2, row - 1]);
            }
        }
        if (isInsideBoard(column - 2, row + 1)) {
            if (colorPiece != ((_g = (_f = tableState[column - 2][row + 1]) === null || _f === void 0 ? void 0 : _f.piece) === null || _g === void 0 ? void 0 : _g.color)) {
                legalSquares.push([column - 2, row + 1]);
            }
        }
        if (isInsideBoard(column - 2, row - 1)) {
            if (colorPiece != ((_j = (_h = tableState[column - 2][row - 1]) === null || _h === void 0 ? void 0 : _h.piece) === null || _j === void 0 ? void 0 : _j.color)) {
                legalSquares.push([column - 2, row - 1]);
            }
        }
        if (isInsideBoard(column + 1, row + 2)) {
            if (colorPiece != ((_l = (_k = tableState[column + 1][row + 2]) === null || _k === void 0 ? void 0 : _k.piece) === null || _l === void 0 ? void 0 : _l.color)) {
                legalSquares.push([column + 1, row + 2]);
            }
        }
        if (isInsideBoard(column + 1, row - 2)) {
            if (colorPiece != ((_o = (_m = tableState[column + 1][row - 2]) === null || _m === void 0 ? void 0 : _m.piece) === null || _o === void 0 ? void 0 : _o.color)) {
                legalSquares.push([column + 1, row - 2]);
            }
        }
        if (isInsideBoard(column - 1, row + 2)) {
            if (colorPiece != ((_q = (_p = tableState[column - 1][row + 2]) === null || _p === void 0 ? void 0 : _p.piece) === null || _q === void 0 ? void 0 : _q.color)) {
                legalSquares.push([column - 1, row + 2]);
            }
        }
        if (isInsideBoard(column - 1, row - 2)) {
            if (colorPiece != ((_s = (_r = tableState[column - 1][row - 2]) === null || _r === void 0 ? void 0 : _r.piece) === null || _s === void 0 ? void 0 : _s.color)) {
                legalSquares.push([column - 1, row - 2]);
            }
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
        var _a;
        let legalSquares = [];
        let column = square.column;
        let row = square.row;
        let colorPiece = (_a = square.piece) === null || _a === void 0 ? void 0 : _a.color;
        let possibleColumn;
        let possibleRow;
        possibleColumn = column + 1;
        possibleRow = row;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        possibleColumn = column - 1;
        possibleRow = row;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        possibleColumn = column;
        possibleRow = row + 1;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        possibleColumn = column;
        possibleRow = row - 1;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        possibleColumn = column + 1;
        possibleRow = row + 1;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        possibleColumn = column - 1;
        possibleRow = row - 1;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        possibleColumn = column + 1;
        possibleRow = row - 1;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
        possibleColumn = column - 1;
        possibleRow = row + 1;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn, possibleRow)) ? legalSquares.push([possibleColumn, possibleRow]) : undefined;
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
    if (isInsideBoard(column, row)) {
        let currentPieceInSquare = tableState[column][row].piece;
        if (color == Colors.white) {
            return (currentPieceInSquare === null || currentPieceInSquare === void 0 ? void 0 : currentPieceInSquare.color) == Colors.black ? true : false;
        }
        else if (color == Colors.black) {
            return (currentPieceInSquare === null || currentPieceInSquare === void 0 ? void 0 : currentPieceInSquare.color) == Colors.white ? true : false;
        }
        else {
            return false;
        }
    }
    return false;
}
//Responsible for verifying if there is a Piece in the square to be moved,
//and for making sure that a piece will disapear in a square and apear in another
function movePiece(piece, fromSquare, toSquare) {
    if (fromSquare.piece == piece) {
        toSquare.createPiece(piece);
        fromSquare.destructPiece();
    }
    else {
        throw new Error("Specified piece not found in Square");
    }
}
let tableState = [];
let gameIsOver = false;
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
    let blackPawnA = new Pawn(Colors.black);
    tableState[0][6].createPiece(blackPawnA);
    let blackPawnB = new Pawn(Colors.black);
    tableState[1][6].createPiece(blackPawnB);
    let blackPawnC = new Pawn(Colors.black);
    tableState[2][6].createPiece(blackPawnC);
    let blackPawnD = new Pawn(Colors.black);
    tableState[3][6].createPiece(blackPawnD);
    let blackPawnE = new Pawn(Colors.black);
    tableState[4][6].createPiece(blackPawnE);
    let blackPawnF = new Pawn(Colors.black);
    tableState[5][6].createPiece(blackPawnF);
    let blackPawnG = new Pawn(Colors.black);
    tableState[6][6].createPiece(blackPawnG);
    let blackPawnH = new Pawn(Colors.black);
    tableState[7][6].createPiece(blackPawnH);
    let blackRookA = new Rook(Colors.black);
    tableState[0][7].createPiece(blackRookA);
    let blackRookH = new Rook(Colors.black);
    tableState[7][7].createPiece(blackRookH);
    let blackKnightB = new Knight(Colors.black);
    tableState[1][7].createPiece(blackKnightB);
    let blackKnightG = new Knight(Colors.black);
    tableState[6][7].createPiece(blackKnightG);
    let blackBishopC = new Bishop(Colors.black);
    tableState[2][7].createPiece(blackBishopC);
    let blackBishopF = new Bishop(Colors.black);
    tableState[5][7].createPiece(blackBishopF);
    let blackQueen = new Queen(Colors.black);
    tableState[3][7].createPiece(blackQueen);
    let blackKing = new King(Colors.black);
    tableState[4][7].createPiece(blackKing);
    let whitePawnA = new Pawn(Colors.white);
    tableState[0][1].createPiece(whitePawnA);
    let whitePawnB = new Pawn(Colors.white);
    tableState[1][1].createPiece(whitePawnB);
    let whitePawnC = new Pawn(Colors.white);
    tableState[2][1].createPiece(whitePawnC);
    let whitePawnD = new Pawn(Colors.white);
    tableState[3][1].createPiece(whitePawnD);
    let whitePawnE = new Pawn(Colors.white);
    tableState[4][1].createPiece(whitePawnE);
    let whitePawnF = new Pawn(Colors.white);
    tableState[5][1].createPiece(whitePawnF);
    let whitePawnG = new Pawn(Colors.white);
    tableState[6][1].createPiece(whitePawnG);
    let whitePawnH = new Pawn(Colors.white);
    tableState[7][1].createPiece(whitePawnH);
    let whiteRookA = new Rook(Colors.white);
    tableState[0][0].createPiece(whiteRookA);
    let whiteRookH = new Rook(Colors.white);
    tableState[7][0].createPiece(whiteRookH);
    let whiteKnightB = new Knight(Colors.white);
    tableState[1][0].createPiece(whiteKnightB);
    let whiteKnightG = new Knight(Colors.white);
    tableState[6][0].createPiece(whiteKnightG);
    let whiteBishopC = new Bishop(Colors.white);
    tableState[2][0].createPiece(whiteBishopC);
    let whiteBishopF = new Bishop(Colors.white);
    tableState[5][0].createPiece(whiteBishopF);
    let whiteQueen = new Queen(Colors.white);
    tableState[3][0].createPiece(whiteQueen);
    let whiteKing = new King(Colors.white);
    tableState[4][0].createPiece(whiteKing);
}
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
    if (!gameIsOver) {
        for (let square of legalSquares) {
            legalMoveList.push(square.id);
        }
        //Clicks piace to play, show legal moves
        if ((piece === null || piece === void 0 ? void 0 : piece.color) == turn) {
            eraseAllLegalMoves();
            showLegalMoves(piece, square);
            selectedSquare = square;
            selectedPiece = piece;
        }
        //Clicks legal move, executes the move and consequences (refresh stockfish, 
        //registers en passant, castle etc)
        else if ((legalMoveList.includes(id)) && (selectedPiece != null)
            && (selectedSquare != null)) {
            movePiece(selectedPiece, selectedSquare, square);
            isEnPassantCapture(square);
            eraseAllLegalMoves();
            setPreviousEnPassantStateOff();
            setEnPassantStateOn(selectedPiece, selectedSquare, square);
            //affectsCastle(selectedPiece, square);
            new HalfMove(selectedPiece, selectedSquare, square);
        }
        //Clicks adversary piece or empty square, erases legal moves
        else {
            selectedSquare = null;
            selectedPiece = null;
            eraseAllLegalMoves();
        }
    }
}
//will add the property "subjectToEnPassant = true" to the Square where the piece will be
//before it passes the turn and before this function is called in the next loop
//all possible enPassants are erased
function setEnPassantStateOn(piece, fromSquare, toSquare) {
    let pieceKind = piece.constructor.name;
    if (pieceKind == 'Pawn') {
        if ((piece.color == Colors.white) && (fromSquare.row == 1)
            && (toSquare.row == 3)) {
            toSquare.addEnPassantToSquare();
        }
        else if ((piece.color == Colors.black) && (fromSquare.row == 6)
            && (toSquare.row == 4)) {
            toSquare.addEnPassantToSquare();
        }
    }
}
function setPreviousEnPassantStateOff() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            tableState[i][j].removeEnPassantFromSquare();
        }
    }
}
function isEnPassantCapture(square) {
    if (possibleEnPassant[0] != null) {
        if ((square.column == possibleEnPassant[0][0]) &&
            (square.row == possibleEnPassant[0][1])) {
            if (square.row == 5) {
                tableState[square.column][square.row - 1].destructPiece();
            }
            if (square.row == 2) {
                tableState[square.column][square.row + 1].destructPiece();
            }
        }
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
const FENDictionary = {
    Pawn: 'p',
    Knight: 'n',
    Bishop: 'b',
    Rook: 'r',
    Queen: 'q',
    King: 'k'
};
const StandardNotationDictionary = {
    Pawn: '',
    Knight: 'N',
    Bishop: 'B',
    Rook: 'R',
    Queen: 'Q',
    King: 'K'
};
function registerMove(piece, square) {
}
function generateFEN() {
    var _a, _b;
    let fen = '';
    let emptySquares = 0;
    //piece placement
    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j <= 7; j++) {
            let kind = (_a = (tableState[j][i].piece)) === null || _a === void 0 ? void 0 : _a.constructor.name;
            let color = (_b = (tableState[j][i].piece)) === null || _b === void 0 ? void 0 : _b.color;
            if (kind != undefined) {
                fen = (emptySquares != 0) ? (fen + emptySquares.toString()) : fen;
                emptySquares = 0;
                fen = fen + ((color == 0) ? FENDictionary[kind].toUpperCase() : FENDictionary[kind]);
                //why can't I call a function to do that and persist the value of fen?
            }
            else {
                emptySquares += 1;
            }
        }
        fen = (emptySquares != 0) ? (fen + emptySquares.toString()) : fen;
        emptySquares = 0;
        (i != 0) ? (fen = fen + '/') : undefined;
    }
    //turn
    if (turn == 0) {
        fen = fen + ' w';
    }
    else {
        fen = fen + ' b';
    }
    //Castling Rights 
    let castlingRightsField = '';
    canWhiteCastleKingSide ? castlingRightsField = castlingRightsField.concat('K') : castlingRightsField;
    canWhiteCastleQueenSide ? castlingRightsField = castlingRightsField.concat('Q') : castlingRightsField;
    canBlackCastleKingSide ? castlingRightsField = castlingRightsField.concat('k') : castlingRightsField;
    canBlackCastleQueenSide ? castlingRightsField = castlingRightsField.concat('q') : castlingRightsField;
    if ((!canWhiteCastleKingSide) && (!canWhiteCastleQueenSide) && (!canBlackCastleKingSide) &&
        (!canBlackCastleQueenSide)) {
        castlingRightsField = '-';
    }
    fen = fen + ' ' + castlingRightsField;
    console.log(fen);
    //Possible En Passant Targets
    //Half Move Clock
    //Full Move Number
    return fen;
}
//request to the API
function makeRequest(fen) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://chess-stockfish-16-api.p.rapidapi.com/chess/api';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '1bfe468b8fmsh2ad07edae9618a2p14094ejsnb8b0e5250c65',
                'X-RapidAPI-Host': 'chess-stockfish-16-api.p.rapidapi.com'
            },
            body: new URLSearchParams({
                fen
            })
        };
        try {
            const response = yield fetch(url, options);
            const result = yield response.json();
            fillStockFishSuggestionsOnScreen(result);
        }
        catch (error) {
            console.error(error);
        }
    });
}
function fillStockFishSuggestionsOnScreen(result) {
    let bestMove = document.getElementById('bestMove');
    let ponder = document.getElementById('ponder');
    let depth = document.getElementById('depth');
    if (bestMove) {
        bestMove.innerHTML = StockFishNotationToStandard(result.bestmove);
    }
    if (ponder) {
        ponder.innerHTML = StockFishNotationToStandard(result.ponder);
    }
    if (depth) {
        depth.innerHTML = result.depth.toString();
    }
}
function StockFishNotationToStandard(sfnotation) {
    var _a;
    let notation = '';
    let fromColumn = columnDictionaryReverse[sfnotation[0]];
    let fromRow = parseInt(sfnotation[1], 10) - 1;
    let pieceKind = (_a = (tableState[fromColumn][fromRow].piece)) === null || _a === void 0 ? void 0 : _a.constructor.name;
    if (pieceKind != undefined) {
        let pieceNotation = StandardNotationDictionary[pieceKind];
        notation = pieceNotation + sfnotation[2] + sfnotation[3];
    }
    return notation;
}
