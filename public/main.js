"use strict";
var Colors;
(function (Colors) {
    Colors[Colors["white"] = 0] = "white";
    Colors[Colors["black"] = 1] = "black";
})(Colors || (Colors = {}));
var Kinds;
(function (Kinds) {
    Kinds[Kinds["pawn"] = 0] = "pawn";
    Kinds[Kinds["knight"] = 1] = "knight";
    Kinds[Kinds["bishop"] = 2] = "bishop";
    Kinds[Kinds["rook"] = 3] = "rook";
    Kinds[Kinds["queen"] = 4] = "queen";
    Kinds[Kinds["king"] = 5] = "king";
})(Kinds || (Kinds = {}));
class Squares {
    constructor(column, row) {
        this.column = column;
        this.row = row;
        this.piece = null;
        console.log(this.column.toString() + this.row.toString());
    }
}
class Piece {
    constructor(squareId, color, kind) {
        this.squareId = squareId;
        this.color = color;
        this.kind = kind;
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
/*let squareA1, squareA2, squareA3, squareA4, squareA5, squareA6, squareA7, squareA8: Squares;
let squareB1, squareB2, squareB3, squareB4, squareB5, squareB6, squareB7, squareB8: Squares;
let squareC1, squareC2, squareC3, squareC4, squareC5, squareC6, squareC7, squareC8: Squares;
let squareD1, squareD2, squareD3, squareD4, squareD5, squareD6, squareD7, squareD8: Squares;
let squareE1, squareE2, squareE3, squareE4, squareE5, squareE6, squareE7, squareE8: Squares;
let squareF1, squareF2, squareF3, squareF4, squareF5, squareF6, squareF7, squareF8: Squares;
let squareG1, squareG2, squareG3, squareG4, squareG5, squareG6, squareG7, squareG8: Squares;
let squareH1, squareH2, squareH3, squareH4, squareH5, squareH6, squareH7, squareH8: Squares;*/
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
/*function initializeEmptyBoard(){
    squareA1 = new Squares(Columns.A, Rows.r1);
    squareA2 = new Squares(Columns.A, Rows.r2);
    squareA3 = new Squares(Columns.A, Rows.r3);
    squareA4 = new Squares(Columns.A, Rows.r4);
    squareA5 = new Squares(Columns.A, Rows.r5);
    squareA6 = new Squares(Columns.A, Rows.r6);
    squareA7 = new Squares(Columns.A, Rows.r7);
    squareA8 = new Squares(Columns.A, Rows.r8);

    squareB1 = new Squares(Columns.B, Rows.r1);
    squareB2 = new Squares(Columns.B, Rows.r2);
    squareB3 = new Squares(Columns.B, Rows.r3);
    squareB4 = new Squares(Columns.B, Rows.r4);
    squareB5 = new Squares(Columns.B, Rows.r5);
    squareB6 = new Squares(Columns.B, Rows.r6);
    squareB7 = new Squares(Columns.B, Rows.r7);
    squareB8 = new Squares(Columns.B, Rows.r8);

    squareC1 = new Squares(Columns.C, Rows.r1);
    squareC2 = new Squares(Columns.C, Rows.r2);
    squareC3 = new Squares(Columns.C, Rows.r3);
    squareC4 = new Squares(Columns.C, Rows.r4);
    squareC5 = new Squares(Columns.C, Rows.r5);
    squareC6 = new Squares(Columns.C, Rows.r6);
    squareC7 = new Squares(Columns.C, Rows.r7);
    squareC8 = new Squares(Columns.C, Rows.r8);

    squareD1 = new Squares(Columns.D, Rows.r1);
    squareD2 = new Squares(Columns.D, Rows.r2);
    squareD3 = new Squares(Columns.D, Rows.r3);
    squareD4 = new Squares(Columns.D, Rows.r4);
    squareD5 = new Squares(Columns.D, Rows.r5);
    squareD6 = new Squares(Columns.D, Rows.r6);
    squareD7 = new Squares(Columns.D, Rows.r7);
    squareD8 = new Squares(Columns.D, Rows.r8);

    squareE1 = new Squares(Columns.E, Rows.r1);
    squareE2 = new Squares(Columns.E, Rows.r2);
    squareE3 = new Squares(Columns.E, Rows.r3);
    squareE4 = new Squares(Columns.E, Rows.r4);
    squareE5 = new Squares(Columns.E, Rows.r5);
    squareE6 = new Squares(Columns.E, Rows.r6);
    squareE7 = new Squares(Columns.E, Rows.r7);
    squareE8 = new Squares(Columns.E, Rows.r8);

    squareF1 = new Squares(Columns.F, Rows.r1);
    squareF2 = new Squares(Columns.F, Rows.r2);
    squareF3 = new Squares(Columns.F, Rows.r3);
    squareF4 = new Squares(Columns.F, Rows.r4);
    squareF5 = new Squares(Columns.F, Rows.r5);
    squareF6 = new Squares(Columns.F, Rows.r6);
    squareF7 = new Squares(Columns.F, Rows.r7);
    squareF8 = new Squares(Columns.F, Rows.r8);

    squareG1 = new Squares(Columns.G, Rows.r1);
    squareG2 = new Squares(Columns.G, Rows.r2);
    squareG3 = new Squares(Columns.G, Rows.r3);
    squareG4 = new Squares(Columns.G, Rows.r4);
    squareG5 = new Squares(Columns.G, Rows.r5);
    squareG6 = new Squares(Columns.G, Rows.r6);
    squareG7 = new Squares(Columns.G, Rows.r7);
    squareG8 = new Squares(Columns.G, Rows.r8);

    squareH1 = new Squares(Columns.H, Rows.r1);
    squareH2 = new Squares(Columns.H, Rows.r2);
    squareH3 = new Squares(Columns.H, Rows.r3);
    squareH4 = new Squares(Columns.H, Rows.r4);
    squareH5 = new Squares(Columns.H, Rows.r5);
    squareH6 = new Squares(Columns.H, Rows.r6);
    squareH7 = new Squares(Columns.H, Rows.r7);
    squareH8 = new Squares(Columns.H, Rows.r8);

}

initializeEmptyBoard();*/
/*function putPieceInSquare(squareId:Squares, color:Colors, kind:Kinds){

    let square: HTMLElement|null = document.getElementById(squareId.toString())

    let imageSource: string = createImageURL(color, kind);
    console.log(imageSource);
    let piece: HTMLElement|null = document.createElement('img');
    piece.setAttribute('src', imageSource);
    square?.appendChild(piece);
}

function createImageURL(color: Colors, kind: Kinds): string{
    let URL: string = 'img/' + color.toString() + '-' + kind.toString() + '.png';
    return URL;
}*/ 
