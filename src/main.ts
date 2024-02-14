/*
    Refat: 
        -it must be a simpler way of describing the king's moves
*/

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
        super(color);}
        
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
            console.log(legalSquares);
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
        console.log(legalSquares);

        return legalSquares;
    }
    
    legalMoves(square:Squares):[number, number][] {         
        return Rook.legalMoves(square);
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
/*
class Queen extends Piece{
    constructor(color: Colors){
    super(color);}
    
    static legalMoves(square:Squares): [number , number][] {
        let legalSquares: [number , number][] = [] ;
        let column = square.column;
        let row = square.row;
        return legalSquares;
    }
    
    legalMoves(square:Squares):[number, number][] {         
        return Queen.legalMoves(square);
    }
    
}

*/

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
    
    let blackBishop = new Bishop(Colors.black);
    tableState[3][3].createPiece(blackBishop);
    Bishop.legalMoves(tableState[3][3]); //just testing, this command will be handled in other way
}

/*
    Player clicks square
    HTML square verifies pieces present in the square
        by checking tableState[column][row]
    Model obtains the square and runs logic by the 
        Piece in the abstract

*/
