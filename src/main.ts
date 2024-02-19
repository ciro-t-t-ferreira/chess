/*
To do: disallow pieces from go through other pieces

Bug: when I click, consecutively (?) pieces of the same color it adds the legal moves

Refat: 
    -Distribute the code through more files (model, controler, constants) 
    -it must be a simpler way of describing the pieces moves in general
    -I created a reverse dictionary to access the keys through the values, which is kinda ridiculous, it must be a
        more reasonable way to do that
*/

const columnDictionary: {[key: number]: string} = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h'
}

const columnDictionaryReverse: {[key: string]: number} = {
    'a' : 0,
    'b' : 1,
    'c' : 2,
    'd' : 3,
    'e' : 4,
    'f' : 5,
    'g' : 6,
    'h' : 7
}

enum Colors{
    'white',
    'black'
}

class Squares{
    public column: number;
    public row: number;
    public piece: Piece | null;

    constructor(column: number, row: number){
        this.column = column;
        this.row = row;
        this.piece = null;
    }

    createPiece(piece: Piece){
        removePieceFromBoard(this);
        this.piece = piece;
        addPieceOnBoard(piece, this);
    }

    destructPiece(){
        this.piece = null;
        removePieceFromBoard(this);
    }
}

abstract class Piece{
    public color:Colors;

    constructor(color: Colors){
        this.color = color;
    }

    abstract legalMoves(square:Squares): [number, number][];
}

class Pawn extends Piece{
    constructor(color: Colors){        
        super(color);
    }
        
    static legalMoves(square:Squares): [number , number][] {
        let legalSquares: [number, number][] = [] ;
        let possibleCaptures: [number, number][] = [] ;
        
        let colorPiece = square.piece?.color;
        let column = square.column;
        let row = square.row;        
        
        if(colorPiece == Colors.white){
            
            if (row == 1){
                if (tableState[column][row + 1].piece == null){
                    legalSquares.push([column, row + 1]);
                }
                if ((tableState[column][row + 1].piece == null) &&
                    ((tableState[column][row + 1].piece == null)))
                legalSquares.push([column, row + 2]);
            }

            else{
                //can delete the isInsideBoard check when I implement promotion
                if (tableState[column][row + 1].piece == null){
                isInsideBoard(column, row + 1)? legalSquares.push([column, row + 1]) : undefined;
                }
            }

            possibleCaptures = this.possibleCaptures(colorPiece, column, row);
            legalSquares = legalSquares.concat(possibleCaptures);

            
        }
        
        if(colorPiece == Colors.black){
            
            if (row == 6){
                if (tableState[column][row - 1].piece == null){
                    legalSquares.push([column, row - 1]);
                }
                if ((tableState[column][row - 1].piece == null) &&
                    ((tableState[column][row - 1].piece == null)))
                legalSquares.push([column, row - 2]);
            }

            else{
                //can delete the isInsideBoard check when I implement promotion
                if (tableState[column][row - 1].piece == null){
                isInsideBoard(column, row - 1)? legalSquares.push([column, row - 1]) : undefined;
                }
            }

            possibleCaptures = this.possibleCaptures(colorPiece, column, row);
            legalSquares = legalSquares.concat(possibleCaptures);

        }
        return legalSquares;
    }
    legalMoves(square:Squares):[number, number][] {         
        return Pawn.legalMoves(square);
    }

    static possibleCaptures(color: Colors, column : number, row: number):
        [number, number][]{

        let captureSquares: [number, number][] = []
        let possibleColumn: number | null = null;
        let possibleRow: number | null = null;
        
        if (color == Colors.white){

            possibleColumn = column + 1;
            possibleRow    = row + 1;
            if (isACapture(color, possibleColumn, possibleRow)){
                captureSquares.push([possibleColumn, possibleRow])
            }

            possibleColumn = column - 1;
            possibleRow    = row + 1;
            if (isACapture(color, possibleColumn, possibleRow)){
                captureSquares.push([possibleColumn, possibleRow])
            }

            return captureSquares;
        }

        else{

            possibleColumn = column + 1;
            possibleRow    = row - 1;
            if (isACapture(color, possibleColumn, possibleRow)){
                captureSquares.push([possibleColumn, possibleRow])
            }

            possibleColumn = column - 1;
            possibleRow    = row - 1;
            if (isACapture(color, possibleColumn, possibleRow)){
                captureSquares.push([possibleColumn, possibleRow])
            }
            
            return captureSquares;
        }

    }

    }
    
class Knight extends Piece{
    constructor(color: Colors){
        super(color);
    }
        
    static legalMoves(square:Squares): [number , number][] {
        let legalSquares: [number , number][] = [] ;
        let column = square.column;
        let row = square.row;
        let colorPiece = square.piece?.color;

        if (isInsideBoard(column + 2, row + 1)){
            if (colorPiece != tableState[column + 2][row + 1]?.piece?.color){
                legalSquares.push([column + 2, row + 1]);
            }
        }
        if (isInsideBoard(column + 2, row - 1)){
            if (colorPiece != tableState[column + 2][row - 1]?.piece?.color){
                legalSquares.push([column + 2, row - 1]);
            }
        }
        if (isInsideBoard(column - 2, row + 1)){
            if (colorPiece != tableState[column - 2][row + 1]?.piece?.color){        
                legalSquares.push([column - 2, row + 1]);
            }
        }
        if (isInsideBoard(column - 2, row - 1)){
            if (colorPiece != tableState[column -2][row - 1]?.piece?.color){
                legalSquares.push([column - 2, row - 1]);
            }
        }
        if (isInsideBoard(column + 1, row + 2)){
            if (colorPiece != tableState[column + 1][row + 2]?.piece?.color){
                legalSquares.push([column + 1, row + 2]);
            }
        }
        if (isInsideBoard(column + 1, row - 2)){
            if (colorPiece != tableState[column + 1][row - 2]?.piece?.color){        
                legalSquares.push([column + 1, row - 2]);
            }
        }
        if (isInsideBoard(column - 1, row + 2)){
            if (colorPiece != tableState[column - 1][row + 2]?.piece?.color){        
                legalSquares.push([column - 1, row + 2]);
            }
        }
        if (isInsideBoard(column - 1, row - 2)){
            if (colorPiece != tableState[column - 1][row - 2]?.piece?.color){
                legalSquares.push([column - 1, row - 2]);
            }
        }

        return legalSquares;
    }
    
    legalMoves(square:Squares):[number, number][] {         
        return Knight.legalMoves(square);
    }
}
        
        
class Bishop extends Piece{
    constructor(color: Colors){
    super(color);}
    
    static legalMoves(square:Squares): [number , number][] {
        let legalSquares: [number , number][] = [] ;
        let column: number = square.column;
        let row: number = square.row;
        let colorPiece = square.piece?.color;

        let possibleColumn: number = column;
        let possibleRow: number = row;
        let insideBoard: boolean = true;
        
        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)){
            possibleColumn += 1;
            possibleRow += 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);

            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)){
                break;
            }

            if (insideBoard){
                legalSquares.push([possibleColumn,possibleRow]);
            }
        }

        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;

        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)){
            possibleColumn -= 1;
            possibleRow -= 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);

            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)){
                break;
            }

            if (insideBoard){
                legalSquares.push([possibleColumn,possibleRow]);
            }
        }

        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;

        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)){
            possibleColumn += 1
            possibleRow -= 1;            
            insideBoard = isInsideBoard(possibleColumn, possibleRow);

            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)){
                break;
            }

            if (insideBoard){
                legalSquares.push([possibleColumn,possibleRow]);
            }
        }

        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;

        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)){
            possibleColumn -= 1
            possibleRow += 1; 
            insideBoard = isInsideBoard(possibleColumn, possibleRow);

            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)){
                break;
            }

            if (insideBoard){
                legalSquares.push([possibleColumn,possibleRow]);
            }
        }

        return legalSquares;
    }
    
    legalMoves(square:Squares):[number, number][] {         
        return Bishop.legalMoves(square);
    }
    
}

class Rook extends Piece{
    constructor(color: Colors){    
    super(color);}
    
    static legalMoves(square:Squares): [number , number][] {
        let legalSquares: [number , number][] = [] ;
        let column: number = square.column;
        let row: number = square.row;
        let colorPiece = square.piece?.color;

        let possibleColumn: number = column;
        let possibleRow: number = row;
        let insideBoard: boolean = true;
        
        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)){
            possibleColumn += 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);

            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)){
                break;
            }

            if (insideBoard){
                legalSquares.push([possibleColumn,possibleRow]);
            }
        }

        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;

        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)){
            possibleColumn -= 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);

            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)){
                break;
            }

            if (insideBoard){
                legalSquares.push([possibleColumn,possibleRow]);
            }
        }

        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;

        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)){
            possibleRow += 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);

            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)){
                break;
            }

            if (insideBoard){
                legalSquares.push([possibleColumn,possibleRow]);
            }
        }

        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;

        while ((insideBoard) && !isACapture(colorPiece, possibleColumn, possibleRow)){
            possibleRow -= 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);

            if (isFriendlyPiece(colorPiece, possibleColumn, possibleRow)){
                break;
            }

            if (insideBoard){
                legalSquares.push([possibleColumn,possibleRow]);
            }
        }
        return legalSquares;
    } 
    
    legalMoves(square:Squares):[number, number][] {         
        return Rook.legalMoves(square);
    }
}

class Queen extends Piece{
    constructor(color: Colors){
    super(color);}
    
    static legalMoves(square:Squares): [number , number][] {
        let legalSquares: [number , number][] = [] ;
        
        legalSquares = Rook.legalMoves(square).concat(Bishop.legalMoves(square));

        return legalSquares;
    }
    
    legalMoves(square:Squares):[number, number][] {         
        return Queen.legalMoves(square);
    }  
    
}

class King extends Piece{
    constructor(color: Colors){
    super(color);}
    
    static legalMoves(square:Squares): [number , number][] {
        let legalSquares: [number , number][] = [] ;
        let column = square.column;
        let row = square.row;
        let colorPiece = square.piece?.color;


        let possibleColumn: number;
        let possibleRow:number;

        possibleColumn = column + 1;
        possibleRow = row;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn,
            possibleRow))? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;  
        
        possibleColumn = column - 1;
        possibleRow = row;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn,
            possibleRow))? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;
        
        possibleColumn = column;
        possibleRow = row + 1;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn,
            possibleRow))? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;
        
        possibleColumn = column;
        possibleRow = row -1;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn,
            possibleRow))? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;

        possibleColumn = column + 1;
        possibleRow = row + 1;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn,
            possibleRow))? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;

        possibleColumn = column - 1;
        possibleRow = row - 1;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn,
            possibleRow))? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;

        possibleColumn = column + 1;
        possibleRow = row - 1;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn,
            possibleRow))? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;

        possibleColumn = column - 1;
        possibleRow = row + 1;
        (isInsideBoard(possibleColumn, possibleRow) && !isFriendlyPiece(colorPiece, possibleColumn,
            possibleRow))? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;    
            
        return legalSquares;
    }
    
    legalMoves(square:Squares):[number, number][] {
         return King.legalMoves(square);
    }
    
}

function isInsideBoard(column: number, row: number): boolean{
    if ((0 <= column && column <=7) && (0 <= row && row <=7)){
        return true;
    }
    else{ 
        return false
    }
}

function isFriendlyPiece(color: Colors | undefined, column: number, row: number): boolean{
    
    if (isInsideBoard(column, row)){
        let currentPieceInSquare : Piece | null = tableState[column][row].piece;
        if(color == Colors.white){
            return currentPieceInSquare?.color == Colors.white? true : false;
        }

        else if(color == Colors.black){
            return currentPieceInSquare?.color == Colors.black? true : false;
        }

        else {
            return false;
        }
    }

    else{
        return false;
    }
}

function isACapture(color: Colors | undefined, column: number, row: number): boolean{
    
    if (isInsideBoard(column, row)){
        let currentPieceInSquare : Piece | null = tableState[column][row].piece;
        
        if(color == Colors.white){
            return currentPieceInSquare?.color == Colors.black? true : false;
        }

        else if(color == Colors.black){
            return currentPieceInSquare?.color == Colors.white? true : false;
        }

        else {
            return false;
        }
    }

   return false
}

//Responsible for verifying if there is a Piece in the square to be moved,
//and for making sure that a piece will disapear in a square and apear in another
function movePiece(piece: Piece, fromSquare: Squares, toSquare: Squares){

    if (fromSquare.piece == piece){
        toSquare.createPiece(piece);
        fromSquare.destructPiece(); //needs to be changed to match the new functions in Square
        let fen: string = generateFEN();
        makeRequest(fen);
    }
    else{
        throw new Error("Specified piece not found in Square");
    }

}


let tableState: Array<Array<Squares>> = []

initializeEmptyBoard();

function initializeEmptyBoard(){

    for (let i: number = 0; i < 8; i++){
        
        tableState[i] = [];

        for (let j: number = 0; j < 8; j++){
            tableState[i][j] = new Squares(i,j);
        }
    }

}

initializePieces();

function initializePieces(){
    
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

function getIdByCoordinates(column: number, row: number):string{
    return columnDictionary[column] + (row + 1).toString();
}

function getIdBySquare(square: Squares): string{
    return columnDictionary[square.column] + (square.row + 1).toString();
}


function addPieceOnBoard(piece:Piece, square:Squares){
    let id: string = getIdBySquare(square); 
    let squareHTML: HTMLElement | null = document.getElementById(id);
    
    
    let pieceIMG: HTMLElement = document.createElement('img');
    pieceIMG.classList.add('piece');
    pieceIMG.id = 'image' + square.column.toString() + square.row.toString();
    pieceIMG.setAttribute('src', createImgURL(piece))

    squareHTML?.appendChild(pieceIMG);
}

function removePieceFromBoard(square:Squares){
    let id: string = getIdBySquare(square); 
    let squareHTML: HTMLElement | null = document.getElementById(id);
    let pieceIMG: HTMLElement | null= document.getElementById('image' +
        square.column.toString() + square.row.toString())
    if (pieceIMG != null){
        squareHTML?.removeChild(pieceIMG);
    }
}

function createImgURL(piece: Piece): string {
    let URL:string;
    let kind:string = (piece.constructor.name).toLowerCase();
    let color:string = 'none';

    if(piece.color == 0){
        color = 'white';
    }
    else if(piece.color == 1){
        color = 'black';
    }

    URL = 'img/' + color + '-' + kind + '.png';

    return URL;
} 

let turn: Colors = Colors.white;
let selectedSquare: Squares | null = null;
let selectedPiece: Piece | null = null;
function squareClick(id: string){

    let column: number = columnDictionaryReverse[id[0]];
    let row:    number = (+(id[1]) - 1); //the unary + operator trasnforms the string into a number
    let piece:  Piece | null  = tableState[column][row].piece;
    let square: Squares = tableState[column][row];

    let legalSquares: HTMLCollection = document.getElementsByClassName('legalMove');
    let legalMoveList: string[] = [];
    
    for (let square of legalSquares){
        legalMoveList.push(square.id);
    }
    
    if (piece?.color == turn){
        eraseAllLegalMoves();
        showLegalMoves(piece, square);
        selectedSquare = square;
        selectedPiece = piece;        
    }

    else if ((legalMoveList.includes(id)) && (selectedPiece !=null)
        && (selectedSquare != null)){
        movePiece(selectedPiece, selectedSquare, square);
        eraseAllLegalMoves();
        changeTurn();
    }    

    else{
        selectedSquare = null;
        selectedPiece = null;
        eraseAllLegalMoves();
    }

}

function changeTurn(){
    if (turn == Colors.white){
        turn = Colors.black
    }
    else if (turn == Colors.black){
        turn = Colors.white
    }
}

function showLegalMoves(piece: Piece, square: Squares){

    let moveList : [number, number][] = [];
    
    if (piece instanceof Pawn){
        moveList = Pawn.legalMoves(square);
    }

    else if (piece instanceof Knight){
        moveList = Knight.legalMoves(square);
    }
    
    else if (piece instanceof Bishop){
        moveList = Bishop.legalMoves(square);
    }
    
    else if (piece instanceof Rook){
        moveList = Rook.legalMoves(square);
    }
    
    else if (piece instanceof Queen){
        moveList = Queen.legalMoves(square);
    }
    
    else if (piece instanceof King){
        moveList = King.legalMoves(square);
    }
    
    for (let square of moveList){
        let column = square[0];
        let row = square[1];

        let id : string = getIdByCoordinates(column, row);
        let squareHTML: HTMLElement | null = document.getElementById(id);
        squareHTML?.classList.add('legalMove');
    }

}

function eraseAllLegalMoves(){
    let legalSquares: Element[] = Array.from(document.getElementsByClassName('legalMove'));
    legalSquares.forEach(legalSquares =>{
        legalSquares.classList.remove('legalMove')
    })
    
}

const FENDictionary: { [key: string]: string } = {
    Pawn  : 'p',
    Knight: 'n',
    Bishop: 'b',
    Rook  : 'r',
    Queen : 'q',
    King  : 'k'
};

function generateFEN(): string{
    let fen         : string = '';
    let emptySquares: number = 0;
    
    for (let i = 7 ; i >= 0 ; i--){
        for (let j = 0 ; j <= 7 ; j++){
            let kind : string | undefined = (tableState[j][i].piece)?.constructor.name;
            let color: Colors | undefined = (tableState[j][i].piece)?.color;

            if (kind != undefined){
                
                fen = (emptySquares != 0)? (fen + emptySquares.toString()) : fen;
                emptySquares = 0;
                fen = fen + ((color == 0)? FENDictionary[kind].toUpperCase() : FENDictionary[kind]);
                //why can't I call a function to do that and persist the value of fen?
            }

            else{
                emptySquares += 1;
            }
        }
        fen = (emptySquares != 0)? (fen + emptySquares.toString()) : fen;
        emptySquares = 0;
        (i != 0)? (fen = fen + '/') : undefined;
    }

    return fen
}

//request to the API

async function makeRequest(fen: string){
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
    	const response = await fetch(url, options);
    	const result = await response.text();
    	console.log(result);
    } catch (error) {
    	console.error(error);
    }
}
