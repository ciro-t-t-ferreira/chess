"use strict";
var Squares;
(function (Squares) {
    Squares[Squares["a1"] = 0] = "a1";
    Squares[Squares["a2"] = 1] = "a2";
    Squares[Squares["a3"] = 2] = "a3";
    Squares[Squares["a4"] = 3] = "a4";
    Squares[Squares["a5"] = 4] = "a5";
    Squares[Squares["a6"] = 5] = "a6";
    Squares[Squares["a7"] = 6] = "a7";
    Squares[Squares["a8"] = 7] = "a8";
    Squares[Squares["b1"] = 8] = "b1";
    Squares[Squares["b2"] = 9] = "b2";
    Squares[Squares["b3"] = 10] = "b3";
    Squares[Squares["b4"] = 11] = "b4";
    Squares[Squares["b5"] = 12] = "b5";
    Squares[Squares["b6"] = 13] = "b6";
    Squares[Squares["b7"] = 14] = "b7";
    Squares[Squares["b8"] = 15] = "b8";
    Squares[Squares["c1"] = 16] = "c1";
    Squares[Squares["c2"] = 17] = "c2";
    Squares[Squares["c3"] = 18] = "c3";
    Squares[Squares["c4"] = 19] = "c4";
    Squares[Squares["c5"] = 20] = "c5";
    Squares[Squares["c6"] = 21] = "c6";
    Squares[Squares["c7"] = 22] = "c7";
    Squares[Squares["c8"] = 23] = "c8";
    Squares[Squares["d1"] = 24] = "d1";
    Squares[Squares["d2"] = 25] = "d2";
    Squares[Squares["d3"] = 26] = "d3";
    Squares[Squares["d4"] = 27] = "d4";
    Squares[Squares["d5"] = 28] = "d5";
    Squares[Squares["d6"] = 29] = "d6";
    Squares[Squares["d7"] = 30] = "d7";
    Squares[Squares["d8"] = 31] = "d8";
    Squares[Squares["e1"] = 32] = "e1";
    Squares[Squares["e2"] = 33] = "e2";
    Squares[Squares["e3"] = 34] = "e3";
    Squares[Squares["e4"] = 35] = "e4";
    Squares[Squares["e5"] = 36] = "e5";
    Squares[Squares["e6"] = 37] = "e6";
    Squares[Squares["e7"] = 38] = "e7";
    Squares[Squares["e8"] = 39] = "e8";
    Squares[Squares["f1"] = 40] = "f1";
    Squares[Squares["f2"] = 41] = "f2";
    Squares[Squares["f3"] = 42] = "f3";
    Squares[Squares["f4"] = 43] = "f4";
    Squares[Squares["f5"] = 44] = "f5";
    Squares[Squares["f6"] = 45] = "f6";
    Squares[Squares["f7"] = 46] = "f7";
    Squares[Squares["f8"] = 47] = "f8";
    Squares[Squares["g1"] = 48] = "g1";
    Squares[Squares["g2"] = 49] = "g2";
    Squares[Squares["g3"] = 50] = "g3";
    Squares[Squares["g4"] = 51] = "g4";
    Squares[Squares["g5"] = 52] = "g5";
    Squares[Squares["g6"] = 53] = "g6";
    Squares[Squares["g7"] = 54] = "g7";
    Squares[Squares["g8"] = 55] = "g8";
    Squares[Squares["h1"] = 56] = "h1";
    Squares[Squares["h2"] = 57] = "h2";
    Squares[Squares["h3"] = 58] = "h3";
    Squares[Squares["h4"] = 59] = "h4";
    Squares[Squares["h5"] = 60] = "h5";
    Squares[Squares["h6"] = 61] = "h6";
    Squares[Squares["h7"] = 62] = "h7";
    Squares[Squares["h8"] = 63] = "h8";
})(Squares || (Squares = {}));
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
class Piece {
    constructor(squareId, color, kind) {
        this.squareId = squareId;
        this.color = color;
        this.kind = kind;
        putPieceInSquare(this.squareId, this.color, this.kind);
    }
}
function putPieceInSquare(squareId, color, kind) {
    let square = document.getElementById(squareId.toString());
    let imageSource = createImageURL(color, kind);
    console.log(imageSource);
    let piece = document.createElement('img');
    piece.setAttribute('src', imageSource);
    square === null || square === void 0 ? void 0 : square.appendChild(piece);
}
function createImageURL(color, kind) {
    let URL = 'img/' + color.toString() + '-' + kind.toString() + '.png';
    return URL;
}
function initializeBoard() {
    console.log('aaa');
    new Piece(Squares.a1, Colors.white, Kinds.rook);
}
initializeBoard();
