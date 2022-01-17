// Get the modal
var modal = document.getElementById("uebersichtsModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const output = document.getElementById("output");
const input1 = document.getElementById('fileUpload1');
const input2 = document.getElementById('fileUpload2');
const input3 = document.getElementById('fileUpload3');
const downloadLink1 = document.getElementById('link1');
const downloadLink2 = document.getElementById('link2');
const downloadLink3 = document.getElementById('link3');
let objectURL;
let pyodide;


function addToOutput(s) {
  // Wert in, welcher eingegeben wird, wird in der Python Consolenansicht wiedergegeben  
  output.value += s + "\n";
}

output.value = "Initializing Python...\n";
// init Pyodide
async function main() {
  pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/"
  });

  output.value += "Ready!\n";
  return pyodide;
}
let pyodideReadyPromise = main();

// execute with onClick
async function evaluatePython() {
 
  pyodide = await pyodideReadyPromise;

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
          bewerbungsSchreiben = js.fileUpload1.value
          lebensLauf = js.fileUpload2.value
          zeugnis = js.fileUpload3.value


          #saving the data into JSON format
          data = {
            "vorname" : vorname,
            "nachname" : nachname,
            "email" : email,
            "strasse" : strasse,
            "wohnort" : wohnort,
            "telefon" : telefon,
            "bewerbungAuf" : bewerbungAuf,
            "bewerbungsSchreiben" : bewerbungsSchreiben,
            "lebensLauf" : lebensLauf,
            "zeugnis" : zeugnis
          }
            
          # Serializing json; indent -> spaces for the json formatting
          json_object = json.dumps(data, indent = 2)
            
          # Writing to data.json; open mode ('a' -> append new content to the end of the file, "r" & "rt" -> read, "w" & "wt" -> write)
          with open('/data.json', 'w') as outfile:
              outfile.write(json_object)

          `);
    let x = pyodide.runPython(`open('/data.json', 'r').read()`);
    //const data = pyodide.globals.get(['data']['vorname']);
    
    addToOutput(x); // wird im output textfeld angezeigt
   
    //zeigt das Modal an
    modalView();
    //Popup Message Success
    console.log("Übermittlung der Daten erfolgreich!, Success!");
    downloadLink1.style.display = "block";
    downloadLink2.style.display = "block";
    downloadLink3.style.display = "block";

  } catch (err) {
    addToOutput(err);
    //Popup Message Failure
    alert("Etwas lief schief! Bitte überprüfen Sie Ihre Eingaben, die Vollständigkit dieser und versuchen es, gegebenenfalls zu einem späteren Zeitpunkt, erneut!");
  }
}

async function showModalData(){
  pyodide = await pyodideReadyPromise;

  try {
    pyodide.runPython(`
    import js
    import json

    with open('/data.json', 'r') as outfile:
      #load data from the JSON format
      js.showName.innerText = data['vorname']+" "+data['nachname']
      js.showEmail.innerText = data['email']
      js.showAnschrift.innerText = data['strasse']+', '+data['wohnort']
      js.showTelefon.innerText = data['telefon']
      js.showArt.innerText = data['bewerbungAuf']
    
    `)

  }catch (err) {
    addToOutput(err);
    //Popup Message Failure
    alert("Etwas lief schief! Bitte überprüfen Sie Ihre Eingaben, die Vollständigkit dieser und versuchen es, gegebenenfalls zu einem späteren Zeitpunkt, erneut!");
  }
  return pyodide;
  

}



input1.addEventListener('change', function () {
  if (objectURL) {
    // revoke the old object url to avoid using more memory than needed
    URL.revokeObjectURL(objectURL);  
  }

  const file = this.files[0];
  objectURL = URL.createObjectURL(file);

  downloadLink1.download = file.name; // this name is used when the user downloads the file
  downloadLink1.href = objectURL;
  downloadLink1.innerText = "Download "+file.name;
});


input2.addEventListener('change', function () {
  if (objectURL) {
    // revoke the old object url to avoid using more memory than needed
    URL.revokeObjectURL(objectURL);  
  }

  const file = this.files[0];
  objectURL = URL.createObjectURL(file);

  downloadLink2.download = file.name; // this name is used when the user downloads the file
  downloadLink2.href = objectURL;
  downloadLink2.innerText = "Download "+file.name;

});

input3.addEventListener('change', function () {
  if (objectURL) {
    // revoke the old object url to avoid using more memory than needed
    URL.revokeObjectURL(objectURL);  
  }

  const file = this.files[0];
  objectURL = URL.createObjectURL(file);

  downloadLink3.download = file.name; // this name is used when the user downloads the file
  downloadLink3.href = objectURL;
  downloadLink3.innerText = "Download "+file.name;
});


async function updateList(){
    var output = document.getElementById('fileList');
    var children = "";

    children += '<li>' + input1.files.item(0).name + '</li>';
    output.innerHTML = '<ul>'+children+'</ul>';
    children += '<li>' + input2.files.item(0).name + '</li>';
    output.innerHTML = '<ul>'+children+'</ul>';
    children += '<li>' + input3.files.item(0).name + '</li>';
    output.innerHTML = '<ul>'+children+'</ul>';
}

function modalView() {
  // When the user clicks on the button, open the modal

  showModalData();
  modal.style.display = "block";

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

}



