import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { winState } from './winStates/winStates.js'

// DONE
// create reset button
// Check for wins
// Add Recording and Make immutable
// Check over previous code to see if any improvements could be made.
// used to alternate between X and 0


//TODO 
// Create object called board state
  // have reference to next and previous states
  // store turn, winner, and win
  // contain references to all positions
// add boardState as 
// create a button for next/previous boardstates
  // one react Component class
  // create board variable for history changing
//
const turnDict = {
  0: 'X',
  1: 'O',
}

class TimelineButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      delta: props.value.delta,
    }
  }

  render(){
    return <button 
      class="timeline"
      onClick={()=> this.props.onClick() }>
      {
        this.props.value 
      }</button>
  }
}

class Reset extends React.Component {
  render(){
    return (
      <button 
      className='reset'
      onClick={()=> {
        this.props.onClick();
      }}>
        {
          this.props.value
        }
      </button>
    )
  }
}

class Square extends React.Component {
    constructor(props){
        // always include a super when creating constructor of a subclass
        super(props)
        this.state = {
            value: null
        }
    }
    render() {
      return (
          // if you don't have the onclick value as a function, then it will fire every
          // time the component renders
        <button className="square" onClick={() => {
           this.props.onClick();
          }
        }>
          {
              // render the constructors and value of the react componenet
              this.props.value
          }
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // if the game is won
        win: false,
        winner: null, 
        // turn
        turn: 0, // consider holding other in variable?
        // fill 9 squares will null
        history: [Array(9).fill(null)]
      }
    //   [
    //      0,  1, 2,
    //      3,  4, 5,
    //      6,  7, 8,
    //   ]
    }
    renderSquare(i) {
      return <Square 
      value={this.state.history.slice(-1)[0][i]}
      onClick = {() => this.handleClick(i)}
      />;
    }
    renderResetButton() {
      return <Reset 
      value={"Reset Game"}
      onClick = {() => this.resetGame()}
      />;
    }
    //move forward or back in time by 1 step 
    changeStep(delta) {
      //
    }
    renderTimelineButton({delta, symbol}) {
      return <TimelineButton
        value= { symbol }
        delta= { delta }
        onClick = {() =>  this.changeStep(delta)}
      ></TimelineButton>
    }
    resetGame(){
      let emptySquares = Array(9).fill(null);
      this.setState({ history: [emptySquares] })
      this.setState({ turn: 0})
      this.setState({win: false})
    }
    
    handleClick(i){      
      // check if squares have already been filled
        // check last entry in history
      // check if there is no win
      if (this.state.history.slice(-1)[0][i] === null && this.state.win === false){
          let squares = this.state.history.slice(-1)[0];
          squares[i] = turnDict[this.state.turn];
          this.state.history.push(squares)
          this.checkForWins(turnDict[this.state.turn]);
          // alternate between X and 0 using dictionary
          let turn = (this.state.turn + 1) % 2
          this.setState({turn: turn});
      }
    
    }

    declareWinner(player){
      // value is set
      this.setState({
        win: true,
        winner: player,
      })
    }

    checkForWins(player){
      // check to see if three values in a winning position are equal and not null
      // winning position is set out in winStates
      const squares = this.state.history.slice(-1)[0]
      winState.three.forEach(function(element){
        if (squares[element[0]] === squares[element[1]] &&
            squares[element[0]] === squares[element[2]] &&
            squares[element[0]] != null
          ) {
            return this.declareWinner(player)
          }
      }, this)
    }

    
    render() {
      const status = this.state.win ? `${this.state.winner} has won the game` : `Next player: ${turnDict[this.state.turn]}`;
      const turnNumber = ` Turn ${this.state.history.length -1}`
      return (
        <div>
          <div className="status">{status}</div>
          <div className="status">{turnNumber}</div>

          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <div className="timeline">
            {this.renderTimelineButton({delta: -1, symbol: '<'})}
            {this.renderTimelineButton({ delta: 1, symbol: '>'})}
          </div>
          <div>{this.renderResetButton()}</div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  