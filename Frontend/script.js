const output = document.getElementById("output");
      const link = document.getElementById("vorname");
        
      
      function addToOutput(s) {
        // Wert in, welcher eingegeben wird, wird in der Python Consolenansicht wiedergegeben  
        output.value += s + "\n";
      }

      output.value = "Initializing Python...\n";
      // init Pyodide
      async function main(){
        let pyodide = await loadPyodide({
          indexURL : "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/"
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
 
          # Data to be written
          data ={
            "vorname" : js.vornameInput.value,
            "nachname" : js.nachnameInput.value,
            "daten" : [
              {
              "E-Mail" : js.emailInput.value,
              "StrasseHausnummer" : js.strasseInput.value,
              "PLZWohnort" : js.ortInput.value,
              "Telefon" : js.vorwahlInput.value +"/"+ js.nummerInput.value,
              "Bewerbung auf" : js.artSelect.value 
              }
            ]  
          }
            
          # Serializing json; indent -> spaces for the json formatting
          json_object = json.dumps(data, indent = 2)
            
          # Writing to data.json; open mode ('a' -> append new content to the end of the file, "r" & "rt" -> read, "w" & "wt" -> write)
          with open('/data.txt', 'a') as outfile:
              outfile.write(json_object)


          print(data)
          `);
          addToOutput(output);
          let x = pyodide.runPython("open('/data.txt', 'r').read()");
          addToOutput(x);

          

        } catch (err) {
          addToOutput(err);
        }
    }
    