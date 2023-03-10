import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './button.css';
import {fetchData, postData, fetchFinishers, getUser, postUser} from './AWSfunctions';
import * as AWS from 'aws-sdk'
import chroma from 'chroma-js';
import Modal from 'react-modal';
const { SHA3 } = require('sha3');
const { Keccak } = require('sha3');


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
  getWeeklyPrompts(val);
}

handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);

  let finisher_id = data.get('stem');
  let finisher = data.get('0');

  var dataObject1 = {
    "finisher_id":  finisher_id,
    "finisher":  data.get('0'),
    "user_id": sessionStorage.getItem('currentloggedinid')
  }
  postData(dataObject1);


  var dataObject2 = {
    "finisher_id":  finisher_id,
    "finisher":  data.get('1'),
    "user_id": sessionStorage.getItem('currentloggedinid')
  }
  postData(dataObject2);

  var dataObject3 = {
    "finisher_id":  finisher_id,
    "finisher":  data.get('2'),
    "user_id": sessionStorage.getItem('currentloggedinid')
  }
  postData(dataObject3);

  var dataObject4 = {
    "finisher_id":  finisher_id,
    "finisher":  data.get('3'),
    "user_id": sessionStorage.getItem('currentloggedinid')
  }
  postData(dataObject4);
}

async handleEndOfWeek(){
 let dataObject = null;
 let result = null;
 let i = null;

 dataObject = setEOWDataObject(document.getElementById("stem1Id").value, 0);
 result = await fetchFinishers(dataObject);
 if (result != null){
   document.getElementById("finishers1Header").innerHTML = document.getElementById("stem1").innerHTML  + ': ';
   document.getElementById("finishers1").innerHTML = result[0].finisher;
   for (i = 1; i < result.length; i++) {
    if(result[i].user_id === sessionStorage.getItem('currentloggedinid')){
        document.getElementById("finishers1").innerHTML += ', ' + result[i].finisher;
    }   
  }
}

dataObject = setEOWDataObject(document.getElementById("stem2Id").value, 0);
result = await fetchFinishers(dataObject);
if (result != null){
  document.getElementById("finishers2Header").innerHTML = document.getElementById("stem2").innerHTML  + ': ';
  document.getElementById("finishers2").innerHTML = result[0].finisher;
  for (i = 1; i < result.length; i++) {
    if(result[i].user_id === sessionStorage.getItem('currentloggedinid')){
        document.getElementById("finishers1").innerHTML += ', ' + result[i].finisher;
    } 
  }
}
result = null;
dataObject = setEOWDataObject(document.getElementById("stem3Id").value, 0);
result = await fetchFinishers(dataObject);
if (result != null){
 document.getElementById("finishers3Header").innerHTML = document.getElementById("stem3").innerHTML  + ': ';
 document.getElementById("finishers3").innerHTML = result[0].finisher;
 for (i = 1; i < result.length; i++) {
  if(result[i].user_id === sessionStorage.getItem('currentloggedinid')){
        document.getElementById("finishers1").innerHTML += ', ' + result[i].finisher;
    } 
}
}

dataObject = setEOWDataObject(document.getElementById("stem4Id").value, 0);
result = await fetchFinishers(dataObject);
if (result != null){
 document.getElementById("finishers4Header").innerHTML = document.getElementById("stem4").innerHTML  + ': ';
 document.getElementById("finishers4").innerHTML = result[0].finisher;
 for (i = 1; i < result.length; i++) {
  if(result[i].user_id === sessionStorage.getItem('currentloggedinid')){
        document.getElementById("finishers1").innerHTML += ', ' + result[i].finisher;
    } 
}
}

dataObject = setEOWDataObject(document.getElementById("stem5Id").value, 0);
result = await fetchFinishers(dataObject);
if (result != null){
 document.getElementById("finishers5Header").innerHTML = document.getElementById("stem5").innerHTML  + ': ';
 document.getElementById("finishers5").innerHTML = result[0].finisher;
 for (i = 1; i < result.length; i++) {
  if(result[i].user_id === sessionStorage.getItem('currentloggedinid')){
        document.getElementById("finishers1").innerHTML += ', ' + result[i].finisher;
    } 
}
}

}




render() {

  let stem1 = this.state.stemString1;
  let stem2 = this.state.stemString2;
  let stem3 = this.state.stemString3;
  let stem4 = this.state.stemString4;
  let stem5 = this.state.stemString5;


  const hexColors = [
    '#d55050',    '#FBDEDB',    '#e96633',    '#EC8423',    '#FCBB2B',    '#FFFF00',    '#B4C150',    '#5bbd72',    '#35750F',    '#50d5a1',    '#C3D7F8',    '#7abedf',    '#6698cb',    '#2F5594',    '#564f8a',    '#cb99c5',    '#612C65',    '#000000',    '#000000',    '#d2d2d2',    '#877876',    '#684D2A',    '#DEB887',    '#F5EFF0'];
  const colorScale = chroma.scale(hexColors).mode('hsl').domain([1, 30]);


  return ( 
    <div>
    <div id="loginModal"> </div>
    <div id="signUpModal"> </div>
    <h1> Sentence Stem Completion</h1>
    <h4> inspired by <a href='http://nathanielbranden.com/sentence-completion-i'> Nathaniel Branden </a> </h4>


    <div style={{position: "relative", width: "250px"}}>
    <div style={{position: "absolute", top: 0, right: 0, width: "100px", textAlign:"right"}}>

    </div>
    <div style={{position: "absolute", bottom: 0, right: 0, width: "100px", textAlign: "right"}}>
    </div>

    </div>

    {Array.from(Array(30)).map((_, idx) => {
      let week = idx + 1;
      return(
      <a 
      onClick={() => this.handleWeekButtonClick(String(week))} 
      className="btn circular"
      style={{backgroundColor: colorScale(week)}}
      >Week {week}</a>
      );
    })}


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

    <form style={{display: "none"}} onSubmit={this.handleSubmit} autocomplete="off">
    <h3>If any of what I wrote this week is true, it might be helpful if I???</h3>
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

const customStyles = {
  content: {
    display: 'block',
    width: '70%',
    height: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#appElement');

function App() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.

  }

  function closeModal() {
    setIsOpen(false);
  }

  const [suModalIsOpen, setSUIsOpen] = React.useState(false);

  function openSUModal() {
    setSUIsOpen(true);
  }

  function afterOpenSUModal() {
    // references are now sync'd and can be accessed.

  }

  function closeSUModal() {
    setSUIsOpen(false);
  }

  return (
    <div>
    <div id="greeting" style={{ position: "absolute",
    top: 0,
    right: 100
  }}> </div>
  <a 
  onClick={openModal}
  style={{ position: "absolute",
  top: 0,
  right: 0
}}> login</a>
<a 
  onClick={openSUModal}
  style={{ position: "absolute",
  top: 0,
  right: 50
}}> sign up</a>
<Modal
isOpen={modalIsOpen}
onAfterOpen={afterOpenModal}
onRequestClose={closeModal}
style={customStyles}
contentLabel="Example Modal"
>
<h1 ref={(_subtitle) => (subtitle = _subtitle)}>LOGIN</h1>
<button id="closeLoginModal" onClick={closeModal} style={{ position: "absolute",
top: 0,
right: 0
}}>X</button>
<form id="login_form">
<input id="username" name="username" type="text" required/>
<input id="password" name="password" type="text" required />

</form>
<a onClick={() => { 
  const form = document.getElementById('login_form');
  const data = new FormData(form);
  login(data.get("username"), data.get("password"));
}} 
class="btn dark-green circular" style={{display: "block"}}>Login</a>

</Modal>

<Modal
isOpen={suModalIsOpen}
onAfterOpen={afterOpenSUModal}
onRequestClose={closeSUModal}
style={customStyles}
contentLabel="Sign Up Modal"
>
<h1 ref={(_subtitle) => (subtitle = _subtitle)}>SIGN UP</h1>
<button onClick={closeSUModal} style={{ position: "absolute",
top: 0,
right: 0
}}>X</button>
<form id="sign_up_form">
<input id="firstName" name="firstName" type="text" placeholder="First Name" required/>
<input id="lastName" name="lastName" type="text"  placeholder="Last Name"required/>
<input id="email" name="email" type="text" placeholder="Email" required/>
<input id="username" name="username" type="text" placeholder="Username" required/>
<input id="password" name="password" type="text" placeholder="Password" required />

</form>
<a onClick={() => { 
  const form = document.getElementById('sign_up_form');
  const data = new FormData(form);
  login(data.get("username"), data.get("password"));
  signUp(data.get("firstName"), data.get("lastName"), data.get("email"), data.get("username"), data.get("password"));
}} 
class="btn dark-green circular" style={{display: "block"}}>Sign Up</a>

</Modal>
</div>
);
}

//=================

ReactDOM.render(<WeekButtons />, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("loginModal"));
ReactDOM.render(<App />, document.getElementById("signUpModal"));

const isLoggedIn = () => sessionStorage.getItem('currentloggedin') != null;
const setGreeting = () =>   
  document.getElementById('greeting').innerHTML = 'Hi, ' + sessionStorage.getItem('currentloggedin');


async function login(username, password){
  const hash = new Keccak(256);
  hash.update(password);
  let digest = hash.digest('hex');
  hash.reset();
  var result = await getUser(username);
  if(result[0].hash === digest){
    sessionStorage.setItem('currentloggedin', username);
    sessionStorage.setItem('currentloggedinid', result[0].user_id);
    setGreeting();
    document.getElementById("closeLoginModal").click();
  }
  else {
    alert("Incorrect username/login");
  }
}

function signUp(firstName, lastName, email, username, password){
  const hash = new Keccak(256);
  hash.update(password);
  let digest = hash.digest('hex');
  hash.reset();
  sessionStorage.setItem('currentloggedin', username);
  let dataObject = {
    "username": username,
    "first_name": firstName,
    "last_name": lastName,
    "email": email,
    "hash": digest
  }
  postUser(dataObject);
}

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

function getStem(num){
  return finisher_stem_array[num];
}

function getId(num){
  return finisher_id_array[num];
}



async function getWeeklyPrompts(weekNum) {
  var result = await fetchData(weekNum);

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
function setEOWDataObject(stem_id, user_id){
  let dataObject = {
    "stem_id": stem_id,
    "user_id": sessionStorage.getItem('currentloggedinid')
  }
  return dataObject;
}







