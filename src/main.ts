enum Squares{
    'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
    'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
    'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
    'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
    'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
    'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8',

}

enum Colors{
    'white',
    'black'
}

enum Kinds{
    'pawn',
    'knight',
    'bishop',
    'rook',
    'queen',
    'king'
}

class Piece{
    public squareId: Squares;
    public color: Colors;
    public kind: Kinds;

    constructor(squareId:Squares, color:Colors, kind:Kinds ){
        this.squareId = squareId;
        this.color = color;
        this.kind = kind;
        
        putPieceInSquare(this.squareId, this.color, this.kind);
    }
}

function putPieceInSquare(squareId:Squares, color:Colors, kind:Kinds){

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
}

function initializeBoard(){
    console.log('aaa');
    new Piece(Squares.a1, Colors.white, Kinds.rook);
}

initializeBoard();