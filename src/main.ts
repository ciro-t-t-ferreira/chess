/*
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
        this.piece = piece;
        addPieceOnBoard(piece, this);
    }

    destructPiece(){
        this.piece = null;
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
        let legalSquares: [number , number][] = [] ;
        
        let colorPiece = square.piece?.color;
        let column = square.column;
        let row = square.row;
        
        if(colorPiece == Colors.white){
            
            if (row == 1){
                legalSquares.push([column, row + 1]);
                legalSquares.push([column, row + 2]);
            }

            else{
                isInsideBoard(column, row + 1)? legalSquares.push([column, row + 1]) : undefined;
            }
            
        }
        
        if(colorPiece == Colors.black){
            
            if (row == 6){
                legalSquares.push([column, row - 1]);
                legalSquares.push([column, row - 2]);
            }

            else{
                isInsideBoard(column, row - 1)? legalSquares.push([column, row - 1]) : undefined;
            }

        }
        return legalSquares;
    }
        legalMoves(square:Squares):[number, number][] {         
            return Pawn.legalMoves(square);
       }
    }
    
class Knight extends Piece{
    constructor(color: Colors){
        super(color);}
        
        static legalMoves(square:Squares): [number , number][] {
            let legalSquares: [number , number][] = [] ;
            let column = square.column;
            let row = square.row;

            isInsideBoard(column + 2, row + 1)? legalSquares.push([column + 2, row + 1]) : undefined;
            isInsideBoard(column + 2, row - 1)? legalSquares.push([column + 2, row - 1]) : undefined;
            isInsideBoard(column - 2, row + 1)? legalSquares.push([column - 2, row + 1]) : undefined;
            isInsideBoard(column - 2, row - 1)? legalSquares.push([column - 2, row - 1]) : undefined;
            isInsideBoard(column + 1, row + 2)? legalSquares.push([column + 1, row + 2]) : undefined;
            isInsideBoard(column + 1, row - 2)? legalSquares.push([column + 1, row - 2]) : undefined;
            isInsideBoard(column - 1, row + 2)? legalSquares.push([column - 1, row + 2]) : undefined;
            isInsideBoard(column - 1, row - 2)? legalSquares.push([column - 1, row - 2]) : undefined;

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

        let possibleColumn: number = column;
        let possibleRow: number = row;
        let insideBoard: boolean = true;
        
        while (insideBoard){
            possibleColumn += 1;
            possibleRow += 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (insideBoard){
                legalSquares.push([possibleColumn,possibleRow]);
            }
        }

        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;

        while (insideBoard){
            possibleColumn -= 1;
            possibleRow -= 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (insideBoard){
                legalSquares.push([possibleColumn,possibleRow]);
            }
        }

        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;

        while (insideBoard){
            possibleColumn += 1
            possibleRow -= 1;            
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (insideBoard){
                legalSquares.push([possibleColumn,possibleRow]);
            }
        }

        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;

        while (insideBoard){
            possibleColumn -= 1
            possibleRow += 1; 
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
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

        let possibleColumn: number = column;
        let possibleRow: number = row;
        let insideBoard: boolean = true;
        
        while (insideBoard){
            possibleColumn += 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (insideBoard){
                legalSquares.push([possibleColumn,possibleRow]);
            }
        }

        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;

        while (insideBoard){
            possibleColumn -= 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (insideBoard){
                legalSquares.push([possibleColumn,possibleRow]);
            }
        }

        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;

        while (insideBoard){
            possibleRow += 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
            if (insideBoard){
                legalSquares.push([possibleColumn,possibleRow]);
            }
        }

        possibleColumn = column;
        possibleRow = row;
        insideBoard = true;

        while (insideBoard){
            possibleRow -= 1;
            insideBoard = isInsideBoard(possibleColumn, possibleRow);
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

        let possibleColumn: number;
        let possibleRow:number;

        possibleColumn = column + 1;
        possibleRow = row;
        isInsideBoard(possibleColumn, possibleRow)? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;  
        
        possibleColumn = column - 1;
        possibleRow = row;
        isInsideBoard(possibleColumn, possibleRow)? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;
        
        possibleColumn = column;
        possibleRow = row + 1;
        isInsideBoard(possibleColumn, possibleRow)? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;
        
        possibleColumn = column;
        possibleRow = row -1;
        isInsideBoard(possibleColumn, possibleRow)? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;

        possibleColumn = column + 1;
        possibleRow = row + 1;
        isInsideBoard(possibleColumn, possibleRow)? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;

        possibleColumn = column - 1;
        possibleRow = row - 1;
        isInsideBoard(possibleColumn, possibleRow)? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;

        possibleColumn = column + 1;
        possibleRow = row - 1;
        isInsideBoard(possibleColumn, possibleRow)? legalSquares.push(
            [possibleColumn, possibleRow]): undefined;

        possibleColumn = column - 1;
        possibleRow = row + 1;
        isInsideBoard(possibleColumn, possibleRow)? legalSquares.push(
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

//Responsible for verifying if there is a Piece in the square to be moved,
//and for making sure that a piece will disapear in a square and apear in another
function movePiece(piece: Piece, fromSquare: Squares, toSquare: Squares){

    if (fromSquare.piece == piece){
        fromSquare.piece = null; //needs to be changed to match the new functions in Square
        toSquare.piece == piece;
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
    
    let blackQueen = new Queen(Colors.black);
    tableState[2][2].createPiece(blackQueen);
    Queen.legalMoves(tableState[2][2]); //just testing, this command will be handled in other way
}

/*
    Player clicks square
    HTML square verifies pieces present in the square
        by checking tableState[column][row]
    Model obtains the square and runs logic by the 
        Piece in the abstract

*/

//****** CONTROLLER ********


function addPieceOnBoard(piece:Piece, square:Squares){
    let id: string = columnDictionary[square.column] + (square.row + 1).toString(); 
    let squareHTML: HTMLElement | null = document.getElementById(id);
    
    
    let pieceIMG: HTMLElement = document.createElement('img');
    pieceIMG.classList.add('piece');
    pieceIMG.setAttribute('src', createImgURL(piece))

    squareHTML?.appendChild(pieceIMG);
}

function squareClick(id: string){

    let column: number = columnDictionaryReverse[id[0]];
    let row:    number = (+(id[1]) - 1); //the unary + operator trasnforms the string into a number
    console.log(tableState[column][row]);
    //console.log(row);
    //tableState[column][row].piece

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
