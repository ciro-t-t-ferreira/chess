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
                legalSquares.push([column, row + 1]);
                legalSquares.push([column, row + 2]);
            }
            else {
                isInsideBoard(column, row + 1) ? legalSquares.push([column, row + 1]) : undefined;
            }
        }
        if (colorPiece == Colors.black) {
            if (row == 6) {
                legalSquares.push([column, row - 1]);
                legalSquares.push([column, row - 2]);
            }
            else {
                isInsideBoard(column, row - 1) ? legalSquares.push([column, row - 1]) : undefined;
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
        let legalSquares = [];
        let column = square.column;
        let row = square.row;
        isInsideBoard(column + 2, row + 1) ? legalSquares.push([column + 2, row + 1]) : undefined;
        isInsideBoard(column + 2, row - 1) ? legalSquares.push([column + 2, row - 1]) : undefined;
        isInsideBoard(column - 2, row + 1) ? legalSquares.push([column - 2, row + 1]) : undefined;
        isInsideBoard(column - 2, row - 1) ? legalSquares.push([column - 2, row - 1]) : undefined;
        isInsideBoard(column + 1, row + 2) ? legalSquares.push([column + 1, row + 2]) : undefined;
        isInsideBoard(column + 1, row - 2) ? legalSquares.push([column + 1, row - 2]) : undefined;
        isInsideBoard(column - 1, row + 2) ? legalSquares.push([column - 1, row + 2]) : undefined;
        isInsideBoard(column - 1, row - 2) ? legalSquares.push([column - 1, row - 2]) : undefined;
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
        let legalSquares = [];
        let column = square.column;
        let row = square.row;
        let possibleColumn = column;
        let possibleRow = row;
        let insideBoard = true;
        while (insideBoard) {
            possibleColumn += 1;
            possibleRow += 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (insideBoard) {
                legalSquares.push([possibleColumn, possibleRow]);
            }
        }
        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;
        while (insideBoard) {
            possibleColumn -= 1;
            possibleRow -= 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (insideBoard) {
                legalSquares.push([possibleColumn, possibleRow]);
            }
        }
        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;
        while (insideBoard) {
            possibleColumn += 1;
            possibleRow -= 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (insideBoard) {
                legalSquares.push([possibleColumn, possibleRow]);
            }
        }
        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;
        while (insideBoard) {
            possibleColumn -= 1;
            possibleRow += 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
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
        let legalSquares = [];
        let column = square.column;
        let row = square.row;
        let possibleColumn = column;
        let possibleRow = row;
        let insideBoard = true;
        while (insideBoard) {
            possibleColumn += 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (insideBoard) {
                legalSquares.push([possibleColumn, possibleRow]);
            }
        }
        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;
        while (insideBoard) {
            possibleColumn -= 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (insideBoard) {
                legalSquares.push([possibleColumn, possibleRow]);
            }
        }
        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;
        while (insideBoard) {
            possibleRow += 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (insideBoard) {
                legalSquares.push([possibleColumn, possibleRow]);
            }
        }
        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;
        while (insideBoard) {
            possibleRow -= 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
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
//Responsible for verifying if there is a Piece in the square to be moved,
//and for making sure that a piece will disapear in a square and apear in another
function movePiece(piece, fromSquare, toSquare) {
    if (fromSquare.piece == piece) {
        fromSquare.piece = null; //needs to be changed to match the new functions in Square
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
    let blackQueen = new Queen(Colors.black);
    tableState[0][0].createPiece(blackQueen);
    Queen.legalMoves(tableState[0][0]); //just testing, this command will be handled in other way
}
/*
    Player clicks square
    HTML square verifies pieces present in the square
        by checking tableState[column][row]
    Model obtains the square and runs logic by the
        Piece in the abstract

*/
//****** CONTROLLER ********
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
let sampleSquare = new Squares(3, 3);
let samplePiece = new Pawn(Colors.black);
addPieceOnBoard(samplePiece, sampleSquare);
function addPieceOnBoard(piece, square) {
    let id = columnDictionary[square.column] + (square.row + 1).toString();
    let squareHTML = document.getElementById(id);
    let pieceIMG = document.createElement('img');
    console.log(pieceIMG);
    pieceIMG.classList.add('piece');
    pieceIMG.setAttribute('src', createImgURL(piece));
    console.log(piece);
    squareHTML === null || squareHTML === void 0 ? void 0 : squareHTML.appendChild(pieceIMG);
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
