const output = document.getElementById("output");
const link = document.getElementById("vorname");


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

          dir = js.vornameInput.value+js.nachnameInput.value
          
          if not os.path.exists(dir):
            os.makedirs(dir)
            print("Für die Ablage der Dateien wurde folgender Ordner erstellt :", dir)
          else:
            print("Für die Ablage der Dateien wurde der bereits existierende Ordner verwendet :", dir)

            

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
              "bewerbung auf" : js.artSelect.options.selected.value,
              "dateien" : js.datei.value
              }
            ]  
          }
            
          # Serializing json; indent -> spaces for the json formatting
          json_object = json.dumps(data, indent = 2)
            
          # Writing to data.json; open mode ('a' -> append new content to the end of the file, "r" & "rt" -> read, "w" & "wt" -> write)
          with open('/data.json', 'a') as outfile:
              outfile.write(json_object)

          


          print(data)
          `);
        addToOutput(output);
        let x = pyodide.runPython("open('/data.json', 'r').read()");
        //let y = pyodide.runPython("open('js.datei', 'r').read()");
        addToOutput(x);
        //addToOutput(y);
        alert("Übermittlung der Daten erfolgreich!");



    } catch (err) {
        addToOutput(err);
        alert("Etwas lief schief! Bitte überprüfen Sie Ihre Eingaben und versuchen es gegebenenfalls zu einem späteren Zeitpunkt erneut!");
    }
}