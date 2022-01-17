// Get the modal
var modal = document.getElementById("uebersichtsModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//constants of form and its input fields for validation and the error that is showing
const form = document.getElementById("form");
const errorElement = document.getElementById("error");
const vorname = document.getElementById("vornameInput");
const nachname = document.getElementById("nachnameInput");
const email = document.getElementById("emailInput");
const strasse = document.getElementById("strasseInput");
const ort = document.getElementById("ortInput");
const nummer = document.getElementById("nummerInput");

const output = document.getElementById("output");
const input1 = document.getElementById('fileUpload1');
const input2 = document.getElementById('fileUpload2');
const input3 = document.getElementById('fileUpload3');
const downloadLink1 = document.getElementById('link1');
const downloadLink2 = document.getElementById('link2');
const downloadLink3 = document.getElementById('link3');
let objectURL1;
let objectURL2;
let objectURL3;
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

  //Python code with pyodide getting Data and Writing Data
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

    //Shows JSON Data in the output textfield
    let x = pyodide.runPython(`open('/data.json', 'r').read()`);
    addToOutput(x); 

    //If Success shows this message in the console
    console.log("Übermittlung der Daten erfolgreich!, Success!");

    //Showing the saved Data in the Modal
    modalView();

  } catch (err) {
    addToOutput(err);
    //Popup Message Failure
    alert("Etwas lief schief! Bitte überprüfen Sie Ihre Eingaben, die Vollständigkit dieser und versuchen es, gegebenenfalls zu einem späteren Zeitpunkt, erneut!");
  }
}

//Loading JSON data dynamically into the Modal after pressing the Abschicken Button
async function showModalData() {
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

  } catch (err) {
    addToOutput(err);
    //Popup Message Failure
    alert("Etwas lief schief! Bitte überprüfen Sie Ihre Eingaben, die Vollständigkit dieser und versuchen es, gegebenenfalls zu einem späteren Zeitpunkt, erneut!");
  }
  return pyodide;
}


//Eventlistener for file input Bewerbungsschreiben
input1.addEventListener('change', function () {
  if (objectURL1) {
    // revoke the old object url to avoid using more memory than needed
    URL.revokeObjectURL(objectURL1);
  }
  const file = this.files[0];
  objectURL1 = URL.createObjectURL(file);

  downloadLink1.download = file.name; // this name is used when the user downloads the file
  downloadLink1.href = objectURL1;
  downloadLink1.innerText = "Download " + file.name; //download link name in the modal
});

//Eventlistener for file input Lebenslauf
input2.addEventListener('change', function () {
  if (objectURL2) {
    // revoke the old object url to avoid using more memory than needed
    URL.revokeObjectURL(objectURL2);
  }
  const file = this.files[0];
  objectURL2 = URL.createObjectURL(file);
  downloadLink2.download = file.name; // this name is used when the user downloads the file
  downloadLink2.href = objectURL2;
  downloadLink2.innerText = "Download " + file.name; //download link name in the modal

});

//Eventlistener for file input Abschlusszeugnis
input3.addEventListener('change', function () {
  if (objectURL3) {
    // revoke the old object url to avoid using more memory than needed
    URL.revokeObjectURL(objectURL3);
  }
  const file = this.files[0];
  objectURL3 = URL.createObjectURL(file);
  downloadLink3.download = file.name; // this name is used when the user downloads the file
  downloadLink3.href = objectURL3;
  downloadLink3.innerText = "Download " + file.name; //download link name in the modal
});

//Validation for textfields (input aquired)
form.addEventListener('submit', (e) => {
  let messages = []
  if(vorname.value === '' || vorname.value == null){
    messages.push('Bitte geben Sie Ihren Vornamen an.')
  }
  else if(nachname.value === '' || nachname.value == null){
    messages.push('Bitte geben Sie Ihren Nachnamen an.')
  }
  else if(email.value === '' || email.value == null){
    messages.push('Bitte geben Sie Ihren Email-Adresse an.')
  }
  else if(strasse.value === '' || strasse.value == null){
    messages.push('Bitte geben Sie Ihre Straße mit Hausnummer an.')
  }
  else if(ort.value === '' || ort.value == null){
    messages.push('Bitte geben Sie Ihren Wohnort mit PLZ an.')
  }


  if(messages.length > 0){
    e.preventDefault()
    errorElement.innerText = messages.join(', ')
  }
});


//updates the list of chosen files to upload
async function updateList(){
    var output = document.getElementById('fileList');
    var children = "";

  children += '<li>' + input1.files.item(0).name + '</li>';
  output.innerHTML = '<ul>' + children + '</ul>';
  children += '<li>' + input2.files.item(0).name + '</li>';
  output.innerHTML = '<ul>' + children + '</ul>';
  children += '<li>' + input3.files.item(0).name + '</li>';
  output.innerHTML = '<ul>' + children + '</ul>';
}


//opens the Modal after pressing the "Abschicken" - Button
function modalView() {
  modalOpen = true;
  showModalData();
  modal.style.display = "block";
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}



