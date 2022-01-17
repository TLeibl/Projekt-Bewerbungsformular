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
    // let output = pyodide.runPython(link.value);
    let output = pyodide.runPython(`
          import js
          import json
          import os

          #dir = js.vornameInput.value+js.nachnameInput.value
          
          #if not os.path.exists(dir):
          #  os.makedirs(dir)
          #  print("Für die Ablage der Dateien wurde folgender Ordner erstellt :", dir)
          #else:
          #  print("Für die Ablage der Dateien wurde der bereits existierende Ordner verwendet :", dir)

            

          # Data to be written
          data ={
            "vorname" : js.vornameInput.value,
            "nachname" : js.nachnameInput.value,
            "daten" : [
              {
              "email" : js.emailInput.value,
              "strasse" : js.strasseInput.value,
              "Wohnort" : js.ortInput.value,
              "telefon" : js.nummerInput.value,
              "bewerbung auf" : js.artSelect.value,
              "dateien" : js.fileUpload.value
              }
            ]  
          }
            
          # Serializing json; indent -> spaces for the json formatting
          json_object = json.dumps(data, indent = 2)
            
          # Writing to data.json; open mode ('a' -> append new content to the end of the file, "r" & "rt" -> read, "w" & "wt" -> write)
          with open('/data.json', 'w') as outfile:
              outfile.write(json_object)

          


          print(data)
          `);
    addToOutput(output);
    let x = pyodide.runPython("open('/data.json', 'r').read()");
    addToOutput(x);
    //addToOutput(y);
    //Popup Message Success
    alert("Übermittlung der Daten erfolgreich!");
    location.href="Uebersicht.html";
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


