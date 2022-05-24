import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './button.css';
import {fetchData, postData} from './AWSfunctions';
import * as AWS from 'aws-sdk'
import {ConfigurationOptions} from 'aws-sdk'



class WeekButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: '',
    stemString1: null,
    stemString2: null,
    stemString3: null,
    stemString4: null,
    stemString5: null
  };   
}


handleWeekButtonClick(val) {
  //let prompts = getPrompts1(val);
  console.log(val);
  getWeeklyPrompts(val);
  /*console.log(prompts[0]);
  this.setState({
    stemString1:getStem(0),
    stemString2:getStem(1),
    stemString3:getStem(2),
    stemString4:getStem(3),
    stemString5:getStem(4)
  });*/
}

handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);

  let finisher_id = data.get('stem');
  let finisher = data.get('0');
  console.log(finisher_id);

  var dataObject1 = {
      "finisher_id":  finisher_id,
      "finisher":  data.get('0'),
      "user_id": "0"
  }
  postData(dataObject1);


  var dataObject2 = {
      "finisher_id":  finisher_id,
      "finisher":  data.get('1'),
      "user_id": "0"
  }
  postData(dataObject2);

  var dataObject3 = {
      "finisher_id":  finisher_id,
      "finisher":  data.get('2'),
      "user_id": "0"
  }
  postData(dataObject3);

  var dataObject4 = {
      "finisher_id":  finisher_id,
      "finisher":  data.get('3'),
      "user_id": "0"
  }
  postData(dataObject4);
}

handleEndOfWeek(){
   document.getElementById("finishers1Header").innerHTML = document.getElementById("stem1").innerHTML  + ': ';
   document.getElementById("finishers2Header").innerHTML = document.getElementById("stem2").innerHTML  + ': ';
   document.getElementById("finishers3Header").innerHTML = document.getElementById("stem3").innerHTML  + ': ';
   document.getElementById("finishers4Header").innerHTML = document.getElementById("stem4").innerHTML  + ': ';
   document.getElementById("finishers5Header").innerHTML = '';
  

    let id = document.getElementById("stem1Id").value;
    document.getElementById("finishers1").innerHTML = '';
    fetch("http://localhost:3002/finishers/stem_number/" + id)
      .then((response) => response.json())
      .then((json) => {
      json.forEach(function(item){
        console.log(item.finisher);
        document.getElementById("finishers1").innerHTML += ', ' + item.finisher;
      });
    })
    .catch((error) => {
    console.error(error);
  }); 

    id = document.getElementById("stem2Id").value;
    document.getElementById("finishers2").innerHTML = '';
    fetch("http://localhost:3002/finishers/stem_number/" + id)
      .then((response) => response.json())
      .then((json) => {
      json.forEach(function(item){
        console.log(item.finisher);
        document.getElementById("finishers2").innerHTML += ', ' + item.finisher;
      });
    })
    .catch((error) => {
    console.error(error);
  }); 


  id = document.getElementById("stem3Id").value;
    document.getElementById("finishers3").innerHTML = '';
    fetch("http://localhost:3002/finishers/stem_number/" + id)
      .then((response) => response.json())
      .then((json) => {
      json.forEach(function(item){
        console.log(item.finisher);
        document.getElementById("finishers3").innerHTML += ', ' + item.finisher;
      });
    })
    .catch((error) => {
    console.error(error);
  });     

  id = document.getElementById("stem4Id").value;
    document.getElementById("finishers4").innerHTML = '';
    fetch("http://localhost:3002/finishers/stem_number/" + id)
      .then((response) => response.json())
      .then((json) => {
      json.forEach(function(item){
        console.log(item.finisher);
        document.getElementById("finishers4").innerHTML += ', ' + item.finisher;
      });
    })
    .catch((error) => {
    console.error(error);
  }); 

  document.getElementById("finishers5").innerHTML = '';
  if(getStem(5) != null){
    document.getElementById("finishers5Header").innerHTML = getStem(4) + ': ';
    id = document.getElementById("stem5Id").value;
      fetch("http://localhost:3002/finishers/stem_number/" + id)
        .then((response) => response.json())
        .then((json) => {
        json.forEach(function(item){
          console.log(item.finisher);
          document.getElementById("finishers5").innerHTML += ', ' + item.finisher;
        });
      })
      .catch((error) => {
      console.error(error);
    }); 
  }

  
}
/*<button onClick={() => fetchDataFormDynamoDb()}> Fetch </button>*/
render() {

  let stem1 = this.state.stemString1;
  let stem2 = this.state.stemString2;
  let stem3 = this.state.stemString3;
  let stem4 = this.state.stemString4;
  let stem5 = this.state.stemString5;


  return ( 
    <div>
    <h1> Sentence Stem Completion</h1>
    <h4> inspired by <a href='http://nathanielbranden.com/sentence-completion-i'> Nathaniel Branden </a> </h4>

    

    <a onClick={() => this.handleWeekButtonClick("1")} class="btn red circular">Week 1</a>
    <a onClick={() => this.handleWeekButtonClick("2")} class="btn circular">Week 2</a>
    <a onClick={() => this.handleWeekButtonClick("3")} class="btn orange circular">Week 3</a>
    <a onClick={() => this.handleWeekButtonClick("4")} class="btn light-orange circular">Week 4</a>
    <a onClick={() => this.handleWeekButtonClick("5")} class="btn yellow-orange circular">Week 5</a>
    <a onClick={() => this.handleWeekButtonClick("6")} class="btn yellow circular">Week 6</a>
    <a onClick={() => this.handleWeekButtonClick("7")} class="btn yellow-green circular">Week 7</a>
    <a onClick={() => this.handleWeekButtonClick("8")} class="btn green circular">Week 8</a>
    <a onClick={() => this.handleWeekButtonClick("9")} class="btn dark-green circular">Week 9</a>
    <a onClick={() => this.handleWeekButtonClick("10")} class="btn teal circular">Week 10</a>
    <a onClick={() => this.handleWeekButtonClick("11")} class="btn light-blue circular">Week 11</a>
    <a onClick={() => this.handleWeekButtonClick("12")} class="btn blue circular">Week 12</a>
    <a onClick={() => this.handleWeekButtonClick("13")} class="btn sky circular">Week 13</a>
    <a onClick={() => this.handleWeekButtonClick("14")}class="btn dark-blue circular">Week 14</a>
    <a onClick={() => this.handleWeekButtonClick("15")} class="btn purple circular">Week 15</a>
    <a onClick={() => this.handleWeekButtonClick("16")} class="btn pink circular">Week 16</a>
    <a onClick={() => this.handleWeekButtonClick("17")} class="btn pink-purple circular">Week 17</a>
    <a onClick={() => this.handleWeekButtonClick("18")}class="btn wine circular">Week 18</a>
    <a onClick={() => this.handleWeekButtonClick("19")} class="btn deep-black circular">Week 19</a>
    <a onClick={() => this.handleWeekButtonClick("20")} class="btn black circular">Week 20</a>
    <a onClick={() => this.handleWeekButtonClick("21")} class="btn gray circular">Week 21</a>
    <a onClick={() => this.handleWeekButtonClick("22")} class="btn gray-brown circular">Week 22</a>
    <a onClick={() => this.handleWeekButtonClick("23")} class="btn brown circular">Week 23</a>
    <a onClick={() => this.handleWeekButtonClick("24")} class="btn tan circular">Week 24</a>
    <a onClick={() => this.handleWeekButtonClick("25")} class="btn whitesmoke circular">Week 25</a> 
    <br/>
    <br/>
    <br/>
    <form onSubmit={this.handleSubmit} autocomplete="off">
    <h3 id="stem1">{stem1}</h3>
    <input id="stem1Id"  type="hidden" name="stem"/>

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
    <h3 id="stem2">{stem2}</h3>
    <input id="stem2Id" type="hidden" name="stem"/>
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
    <h3 id="stem3">{stem3}</h3>
    <input id="stem3Id" type="hidden" name="stem"/>
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
    <h3 id="stem4">{stem4}</h3>
    <input id="stem4Id" type="hidden" name="stem"/>
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

    <div id="lastForm" style={{display: "none"}}>
    <form onSubmit={this.handleSubmit} autocomplete="off">
    <h3 id="stem5">{stem5}</h3>
    <input id="stem5Id" type="hidden" name="stem"/>
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
    <button id="" className="square">Send data!</button>
    </form>
    </div>

    <button className="square" onClick={() => this.handleEndOfWeek()}>End of the week</button>
    <h3 id="finishers1Header"> </h3>
    <p id="finishers1"> </p>
    <h3 id="finishers2Header"> </h3>
    <p id="finishers2"> </p>
    <h3 id="finishers3Header"> </h3>
    <p id="finishers3"> </p>
    <h3 id="finishers4Header"> </h3>
    <p id="finishers4"> </p>
    <h3 id="finishers5Header"> </h3>
    <p id="finishers5"> </p>

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

//=================

ReactDOM.render(<WeekButtons />, document.getElementById("root"));

let finisher_stem_array = [];
let finisher_id_array = [];

function handleErrors(response) {
  if (!response.ok) {
    alert("error");
    throw Error(response.statusText);
  }
  return response;
}

async function getPrompts1(week_id){
   finisher_id_array = [];
   finisher_stem_array = [];
  const Http = new XMLHttpRequest();
  const url='http://localhost:3002/finishers/prompt/' + week_id;
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    if (Http.readyState == 4 && Http.status == 200){
      console.log(Http.responseText);
      let temp = JSON.parse(Http.responseText);

      document.getElementById("stem1").innerHTML = temp[0].prompt;
      document.getElementById("stem1Id").value = temp[0].id;

      document.getElementById("stem2").innerHTML = temp[1].prompt;
      document.getElementById("stem2Id").value = temp[1].id;

      document.getElementById("stem3").innerHTML = temp[2].prompt;
      document.getElementById("stem3Id").value = temp[2].id;

      document.getElementById("stem4").innerHTML = temp[3].prompt;
      document.getElementById("stem4Id").value = temp[3].id;

      if(temp[4] != null){
        document.getElementById("lastForm").style.display = "inline";
        finisher_stem_array = [temp[0].prompt, temp[1].prompt, 
          temp[2].prompt, temp[3].prompt, temp[4].prompt];
        finisher_id_array = [temp[0].id, temp[1].id, 
          temp[2].id, temp[3].id, temp[4].id];
        document.getElementById("stem5").innerHTML = temp[4].prompt;
        document.getElementById("stem5Id").value = temp[4].id;

      }else{
        document.getElementById("lastForm").style.display = "none";
        finisher_stem_array = [temp[0].prompt, temp[1].prompt, 
          temp[2].prompt, temp[3].prompt];
        finisher_id_array = [temp[0].id, temp[1].id, 
          temp[2].id, temp[3].id];
      }

      return temp;
    } 
  }
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
      alert("Error: " + error);
    });

  }

  function getStem(num){
    return finisher_stem_array[num];
  }

   function getId(num){
    return finisher_id_array[num];
  }

  async function getWeeklyPrompts(weekNum) {
    console.log("getWeeklyPrompts: " + weekNum);
    var result = await fetchData(weekNum);
    console.log(result);

    document.getElementById("stem1").innerHTML = result[0].prompt;
    document.getElementById("stem1Id").value = result[0].Id;

    document.getElementById("stem2").innerHTML = result[1].prompt;
    document.getElementById("stem2Id").value = result[1].Id;

    document.getElementById("stem3").innerHTML = result[2].prompt;
    document.getElementById("stem3Id").value = result[2].Id;

    document.getElementById("stem4").innerHTML = result[3].prompt;
    document.getElementById("stem4Id").value = result[3].Id;

    if(result[4] != null){
        document.getElementById("lastForm").style.display = "inline";
        document.getElementById("stem5").innerHTML = result[4].prompt;
        document.getElementById("stem5Id").value = result[4].Id;
      }
      else  {
        document.getElementById("lastForm").style.display = "none";
      }
  }







