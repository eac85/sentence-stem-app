import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Button from 'react-bootstrap/Button'


function Square(props) {
  return (
    <button className="square" 
    style={{height: '30px', width : '100px'}}
    size="lg" 
    onClick={props.onClick}>
    {props.value}
    </button>
    );
  }


  class Board extends React.Component {
    renderSquare(i) {
      return (
      <Square
      value={"Week " + i}
      onClick={() => this.props.onClick(i)}
      />
      );
    }

    render() {
      return (
      <div>
      <div className="board-row">
      {this.renderSquare(1)}
      {this.renderSquare(2)}
      {this.renderSquare(3)}
      {this.renderSquare(4)}
      {this.renderSquare(5)}
      {this.renderSquare(6)}
      {this.renderSquare(7)}
      {this.renderSquare(8)}
      </div>

      <div className="board-row">
      {this.renderSquare(9)}
      {this.renderSquare(10)}
      {this.renderSquare(11)}
      {this.renderSquare(12)}
      {this.renderSquare(13)}
      {this.renderSquare(14)}
      {this.renderSquare(15)}
      {this.renderSquare(16)}
      </div>

      <div className="board-row">
      {this.renderSquare(17)}
      {this.renderSquare(18)}
      {this.renderSquare(19)}
      {this.renderSquare(20)}
      {this.renderSquare(21)}
      {this.renderSquare(22)}
      {this.renderSquare(23)}
      {this.renderSquare(24)}
      </div>

      <div className="board-row">
      {this.renderSquare(25)}
      </div>
      </div>
      );
    }
  }

  class Game extends React.Component {
    constructor(props) {
      super(props);
      
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEndOfWeek = this.handleEndOfWeek.bind(this);

      this.state = {
        history: [
        {
          squares: Array(9).fill(null)
        }
        ],
        stepNumber: 0,
        xIsNext: true,
        stemString1: null,
        stemString2: null,
        stemString3: null,
        stemString4: null,
        weekText1: null,
        weekText2: null,
        weekText3: null,
        weekText4: null,
        weekNum: null,
        id1: null,
        id2: null,
        id3: null,
        id4: null
      };
    }

    handleClick(i) {
      setWeek(i);
      let index = i*4;      
      this.setState({
        weekNum:i,
        stemString1:getStem(index - 3),
        stemString2:getStem(index - 2),
        stemString3:getStem(index - 1),
        stemString4:getStem(index),
        id1: index - 3,
        id2: index - 2,
        id3: index - 1,
        id4: index 
      });
    }

    handleSubmit(event) {
      let weekNum = getWeek();
      event.preventDefault();
      const data = new FormData(event.target);

      let stemNumber = data.get('stem');
      console.log(stemNumber);

      postFinisher('http://localhost:3002/finishers', 
      {"stem_number":stemNumber, "finisher":data.get('0')});
      postFinisher('http://localhost:3002/finishers', 
      {"stem_number":stemNumber, "finisher":data.get('1')});
      postFinisher('http://localhost:3002/finishers', 
      {"stem_number":stemNumber, "finisher":data.get('2')});
      postFinisher('http://localhost:3002/finishers', 
      {"stem_number":stemNumber, "finisher":data.get('3')});
      postFinisher('http://localhost:3002/finishers', 
      {"stem_number":stemNumber, "finisher":data.get('4')});

    }


    handleEndOfWeek(){
      let weekNum = getWeek();
      let index = weekNum*4;
      fetch('http://localhost:3002/finishers')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        let tempString1 = getStem(index - 3);
        let tempString2 = getStem(index - 2);
        let tempString3 = getStem(index - 1);
        let tempString4 = getStem(index);


        json.forEach(function(item){
          switch(item.stem_number) {
            case (index - 3):
            tempString1 = tempString1 + ", " + item.finisher;
            break;
            case (index - 2):
            tempString2 = tempString2 + ", " + item.finisher;
            break;
            case (index - 1):
            tempString3 = tempString3 + ", " + item.finisher;
            break;
            case (index): 
            tempString4 = tempString4 + ", " + item.finisher;
            break;
          }

        })
        this.setState({
          weekText1:tempString1,
          weekText2:tempString2,
          weekText3:tempString3,
          weekText4:tempString4
        });
      })
      .catch((error) => {
        console.error(error);
      });    
    }


    render() {
      let stem1 = this.state.stemString1;
      let stem2 = this.state.stemString2;
      let stem3 = this.state.stemString3;
      let stem4 = this.state.stemString4;
      let weekText1Var = this.state.weekText1;
      let weekText2Var = this.state.weekText2;
      let weekText3Var = this.state.weekText3;
      let weekText4Var = this.state.weekText4;
      let weekNum = this.state.weekNum;
      let id1 = this.state.id1;
      let id2 = this.state.id2;
      let id3 = this.state.id3;
      let id4 = this.state.id4;

      return (
      <div className="game">
      <h1> Sentence Stem Completion</h1>
      <h4> inspired by <a href='http://nathanielbranden.com/sentence-completion-i'> Nathaniel Branden </a> </h4>
      <div className="game-board">
      <Board
      onClick={i => this.handleClick(i)}
      />
      </div>
      <div className="game-info">
      
      <form onSubmit={this.handleSubmit} autocomplete="off">
      <h3>{stem1}</h3>
      <input type="hidden" name="stem" value={id1}/>
      <input id="0" name="0"
      type="text"
      required/> <br/>
      <input id="1" name="1"
      type="text"
      required/> <br/>
      <input id="2" name="2"
      type="text"
      required/> <br/>
      <input id="3" name="3"
      type="text"
      required/> <br/>
      <input id="4" name="4"
      type="text"
      required/><br/>
      <button className="square">Send data!</button>
      </form>
      <form onSubmit={this.handleSubmit} autocomplete="off">
      <h3>{stem2}</h3>
      <input type="hidden" name="stem" value={id2}/>
      <input id="0" name="0"
      type="text"
      required/> <br/>
      <input id="1" name="1"
      type="text"
      required/> <br/>
      <input id="2" name="2"
      type="text"
      required/> <br/>
      <input id="3" name="3"
      type="text"
      required/> <br/>
      <input id="4" name="4"
      type="text"
      required/><br/>
      <button className="square">Send data!</button>
      </form>
      <form onSubmit={this.handleSubmit} autocomplete="off">
      <h3>{stem3}</h3>
      <input type="hidden" name="stem" value={id3}/>
      <input id="0" name="0"
      type="text"
      required/> <br/>
      <input id="1" name="1"
      type="text"
      required/> <br/>
      <input id="2" name="2"
      type="text"
      required/> <br/>
      <input id="3" name="3"
      type="text"
      required/> <br/>
      <input id="4" name="4"
      type="text"
      required/><br/>
      <button className="square">Send data!</button>
      </form>
      <form onSubmit={this.handleSubmit} autocomplete="off">
      <h3>{stem4}</h3>
      <input type="hidden" name="stem" value={id4}/>
      <input id="0" name="0"
      type="text"
      required/> <br/>
      <input id="1" name="1"
      type="text"
      required/> <br/>
      <input id="2" name="2"
      type="text"
      required/> <br/>
      <input id="3" name="3"
      type="text"
      required/> <br/>
      <input id="4" name="4"
      type="text"
      required/><br/>
      <button className="square">Send data!</button>
      </form>
      </div>
      <button className="square" onClick={() => this.handleEndOfWeek()}>End of the week</button>
      <p> {weekText1Var}</p>
      <p> {weekText2Var}</p>
      <p> {weekText3Var}</p>
      <p> {weekText4Var}</p>
      <form onSubmit={this.handleSubmit} autocomplete="off">
      <h3>If any of what I wrote this week is true, it might be helpful if I…</h3>
      <input type="hidden" name="stem" value={stem3}/>
      <input id="0" name="0"
      type="text"
      required/> <br/>
      <input id="1" name="1"
      type="text"
      required/> <br/>
      <input id="2" name="2"
      type="text"
      required/> <br/>
      <input id="3" name="3"
      type="text"
      required/> <br/>
      <input id="4" name="4"
      type="text"
      required/><br/>
      <button className="square">Send data!</button>
      </form>
      </div>
      );
    }
  }




  // ========================================

  ReactDOM.render(<Game />, document.getElementById("root"));

  let fileContents = new Array();
  let WEEKNUM = 0;

  function setWeek(week){
    WEEKNUM = week;
  }

  function getWeek(){
    return WEEKNUM;
  }


  function getStem(i){
    let stemMap = new Map([
      [1, 'If I bring more awareness to my life today…'], 
      [2, 'If I take more responsibility for my choices and actions today…'],
      [3, 'If pay more attention to how I deal with people today…'],
      [4, 'If I boost my energy level by 5 percent today…'],
      [5, 'If I bring 5 percent more awareness to my important relationships…'],
      [6, 'If I bring 5 percent more awareness to my insecurities…'],
      [7, 'If I bring 5 percent more awareness to my deepest needs and wants…'],
      [8, 'If I bring 5 percent more awareness to my emotions…'],
      [9, 'If I treat listening as a creative act…'],
      [10, 'If I notice how people are affected by the quality of my listening…'],
      [11, 'If I bring more awareness to my dealings with people today…'],
      [12, 'If I commit to dealing with people fairly and benevolently…']
      ]);
    return stemMap.get(i);
  }

  function handleErrors(response) {
    if (!response.ok) {
        alert("error");
        throw Error(response.statusText);
    }
    return response;
  }

  async function postFinisher(url = '', data = {}) {
    // Default options are marked with *
    fetch('http://localhost:3002/finishers', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  
}




