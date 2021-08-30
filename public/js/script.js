var url = "localhost:4000/server"


document.getElementById("resetS1btn").addEventListener("click", function(){
    sendData({ data : "button1"})
});
document.getElementById("resetS2btn").addEventListener("click", function(){
    sendData({ data : "button2"})
});
function sendData(data) {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
    console.log(data)
    fetch('/', options);
  }
let myData;
async function fetchText(){
    let response = await fetch('../state.json');
    myData = await response.text();
    myData = JSON.parse(myData);
    console.log(myData[0]);
    loadElements(myData);
}

function loadElements(data){
    var numCuadrados = data.length;
    var tamanio = 20;
    var espacio = 10;
    for(var x = 1; x < 3 ; x++){
            document.getElementById(`server${x}`).width = (numCuadrados*tamanio) + ((numCuadrados-1)*espacio);
            var tamanioCanvas = document.getElementById(`server${x}`);
            var ctx = tamanioCanvas.getContext('2d');
            for(var i = 0; i < data.length; i++){    
                var active = false;
                if(x == 1){
                    active = data[i].state1 == "OK"? true : false;
                    if (active){
                        document.getElementById(`resetS${x}btn`).disabled = true;
                        document.getElementById(`resetS${x}btn`).style.background = 'gray';
                    }
                    else{
                        document.getElementById(`resetS${x}btn`).disabled = false;
                        document.getElementById(`resetS${x}btn`).style.background = "#52BE96";
                    }
                } else if(x == 2){
                    active = data[i].state2 == "OK"? true : false;
                    if (active){
                        document.getElementById(`resetS${x}btn`).disabled = true;
                        document.getElementById(`resetS${x}btn`).style.background = 'gray';
                    }
                    else{
                        document.getElementById(`resetS${x}btn`).disabled = false;
                        document.getElementById(`resetS${x}btn`).style.background = "#52BE96";
                    }
                }
                if(active){
                    ctx.fillStyle = 'green'
                } else {
                    ctx.fillStyle = 'red'
                }
                ctx.fillRect(tamanio*i + espacio*i, 0, tamanio, tamanio);
        }
    }
}

window.addEventListener('load', () => {
    fetchText();
});
