import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';



//TODO 

// Check for wins

// create reset button
class Reset extends React.Component {
  constructor(props){
    // always include a super when creating constructor of a subclass
    super(props)
    // two options: 
    // forfeit
    // reset
    this.state = {
        value: null
    }
  }
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
        // turn
        turn: 'X',
        // fill 9 squares will null
        squares: Array(9).fill(null),
      }
    //   [
    //      0,  1, 2,
    //      3,  4, 5,
    //      6,  7, 8,
    //   ]
    }
    renderSquare(i) {
      return <Square 
      value={this.state.squares[i]}
      onClick = {() => this.handleClick(i)}
      />;
    }
    renderResetButton() {
      return <Reset 
      value={"Reset Game"}
      onClick = {() => this.resetGame()}
      />;
    }
    
    resetGame(){
      let emptySquares =Array(9).fill(null);
      this.setState({ squares: emptySquares })
      this.setState({ turn: "X"})
    }
    
    handleClick(i){
      // check if squares have already been filled
      if (this.state.squares[i] === null){
        if (this.state.turn === 'X'){
          let squares = this.state.squares;
          squares[i] = 'X'
          this.setState({squares: squares})
          this.setState({turn: 'O'});
        }
        else{
          let squares = this.state.squares;
          squares[i] = 'O'
          this.setState({squares: squares})
          this.setState({turn: 'X'});
        }
      }
    }
    
  
    render() {
      const status = `Next player: ${this.state.turn}`;
      
      return (
        <div>
          <div className="status">{status}</div>
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
  