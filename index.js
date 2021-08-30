const express = require("express");
const readLastLines = require('read-last-lines');
const exec = require('child_process').exec;
const fs = require('fs').promises;
const cors = require('cors');
const port = 4000;
const app = express();
const shell = require('shelljs');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

let serverAStatus = false;
let serverBStatus = false;
let time='';
let states = [];

app.listen(port, () => {
	console.log(`App is listening to port ${port}`);
  });  

setInterval(()=>{
	exec(`sh watch.sh `, (error, stout, stderr) => {
		if (error !== null) {
			console.log(`exec error: ${error}`);
		}
	});
	readLastLines.read('log.txt', 5).then((lines) => {
		let data = lines.split('\n');
		if(data[0].includes('TIME'))
			for (var i = 0; i < data.length; i++) {
				if(data[i] == 'ServerA'){
					if(data[i + 1] === '')
						serverAStatus = 'FAIL';
					else
						serverAStatus = 'OK';
					i++;
				}else if(data[i] == 'ServerB'){
					if(data[i + 1] === '')
						serverBStatus = 'FAIL';
					else
						serverBStatus = 'OK';
					i++;
				}else if (data[i].includes('TIME') ){
					time = data[i];
				}else{
					i++;
				}
			}
	});
	updateStates(serverAStatus, serverBStatus);
},1000);
function updateStates(aState, bState){
	if(typeof aState === 'string' && typeof bState === 'string'){
		const state = {
			state1: aState,
			state2: bState,
		};
		states.push(state);
	}
	if(states.length >= 10){
		states.shift();
	}
	fs.writeFile('./public/state.json', JSON.stringify(states));
}

app.get("/", (req, res) => {
	res.sendFile(__dirname + '/public/html/index.html');
});

app.post("/", (req, res) =>{
	var message = req.body.data;
	var server = message.charAt(message.length-1);
	shell.exec(`./docker.sh instance${server} instance 300${server-1} 4000 `);
	res.send("Server reseted succesfully")
});