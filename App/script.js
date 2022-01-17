const output = document.getElementById("output");
const input = document.getElementById('fileUpload');
const downloadLink = document.getElementById('link');
let objectURL;


function addToOutput(s) {
  // Wert in, welcher eingegeben wird, wird in der Python Consolenansicht wiedergegeben  
  output.value += s + "\n";
}

output.value = "Initializing Python...\n";
// init Pyodide
async function main() {
  let pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/"
  });

  output.value += "Ready!\n";
  return pyodide;
}
let pyodideReadyPromise = main();

// execute with onClick
async function evaluatePython() {
 
  let pyodide = await pyodideReadyPromise;

  try {
    pyodide.runPython(`
          import js
          import json
          import os
          
          #Get the values from the input fields
          vorname = js.vornameInput.value
          nachname = js.nachnameInput.value
          email = js.emailInput.value
          strasse = js.strasseInput.value
          wohnort = js.ortInput.value
          telefon = js.nummerInput.value
          bewerbungAuf = js.artSelect.value
          dateien = js.fileUpload.value


          #saving the data into JSON format
          data = {
            "vorname" : vorname,
            "nachname" : nachname,
            "email" : email,
            "strasse" : strasse,
            "wohnort" : wohnort,
            "telefon" : telefon,
            "bewerbungAuf" : bewerbungAuf,
            "dateien" : dateien
          }
            
          # Serializing json; indent -> spaces for the json formatting
          json_object = json.dumps(data, indent = 2)
            
          # Writing to data.json; open mode ('a' -> append new content to the end of the file, "r" & "rt" -> read, "w" & "wt" -> write)
          with open('/data.json', 'w') as outfile:
              outfile.write(json_object)

          
          #print(data)

          #load data from the JSON format
          js.showName.innerText = data['vorname']+" "+data['nachname']
          js.showEmail.innerText = data['email']
          js.showAnschrift.innerText = data['strasse']+', '+data['wohnort']
          js.showTelefon.innerText = data['telefon']
          js.showArt.innerText = data['bewerbungAuf']

          `);
    let x = pyodide.runPython(`open('/data.json', 'r').read()`);
    //const data = pyodide.globals.get(['data']['vorname']);
    
    addToOutput(x); // wird in der console ausgegeben
   
    
    //addToOutput(x);
    //addToOutput(y);
    //Popup Message Success
    alert("Übermittlung der Daten erfolgreich!");
    //location.href="Output.html";
    downloadLink.style.display = "block";
    



  } catch (err) {
    addToOutput(err);
    //Popup Message Failure
    alert("Etwas lief schief! Bitte überprüfen Sie Ihre Eingaben, die Vollständigkit dieser und versuchen es, gegebenenfalls zu einem späteren Zeitpunkt, erneut!");
  }
}


  



input.addEventListener('change', function () {
  if (objectURL) {
    // revoke the old object url to avoid using more memory than needed
    URL.revokeObjectURL(objectURL);  
  }

  const file = this.files[0];
  objectURL = URL.createObjectURL(file);

  downloadLink.download = file.name; // this name is used when the user downloads the file
  downloadLink.href = objectURL;
});


async function updateList(){
    var input = document.getElementById('fileUpload');
    var output = document.getElementById('fileList');
    var children = "";

    for (var i = 0; i < input.files.length; ++i) {
      children += '<li>' + input.files.item(i).name + '</li>';
    }
    output.innerHTML = '<ul>'+children+'</ul>';
}


// Get the modal
var modal = document.getElementById("uebersichtsModal");

// Get the button that opens the modal
var btn = document.getElementById("uebersichtBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


