const express = require("express");
const readLastLines = require('read-last-lines');
const fs = require('fs').promises;
const port = 4000;
const app = express();
app.use(express.static('public'));

let serverAStatus = false;
let serverBStatus = false;
let time='';

setInterval(()=>{
	exec(`sh watch.sh `, (error, stout, stderr) => {
		if (error !== null) {
			console.log(`exec error: ${error}`);
		}
	});
	readLastLines.read('log.txt', 5).then((lines) => {
		let data = lines.split('\n');
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
},1000);

app.get("/", (req, res) => {
	res.sendFile(__dirname + '/public/html/index.html');
	/*res.send(
		`<table>
			<thead>
				<tr>
					<th>Hora</th>
					<th>Nombre</th>
					<th>Estado</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td rowspan="3">${time}</td>
				</tr>
				<tr>
					<td>Server A</td>
					<td>${serverAStatus}</td>
				</tr>
				<tr>
					<td>Server B</td>
					<td>${serverBStatus}</td>
				</tr>
			</tbody>
		</table>`
	);*/
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});