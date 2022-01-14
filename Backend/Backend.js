const output = document.getElementById("output");
        const link = document.getElementById("uri");
       

       
      function addToOutput(s) {
        // Wert in, welcher eingegeben wird, wird in der Python Consolenansicht wiedergegeben  
        output.value += ">>>" + link.value + "\n" + s + "\n";
      }

      output.value = "Initializing...\n";
      // init Pyodide
      async function main(){
        let pyodide = await loadPyodide({
          indexURL : "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/"
        });
        console.log(pyodide.runPython(`
        from pytube import YouTube

        # Url des Videos
        url = 'https://www.youtube.com/watch?v=YDDz1Er2IXA&list=RDMMYDDz1Er2IXA&start_radio=1'
        my_video = YouTube(url)

        # Gibt den Videotitel in der Konsole Wieder
        print(my_video.title)

        # Wählt die höchste mögliche Auflösung des Videos zum download
        my_video = my_video.streams.get_highest_resolution()

        # Downloaded das Video
        my_video.download()
        
        `));

        output.value += "Ready!\n";
        return pyodide;
      }
      let pyodideReadyPromise = main();

      async function evaluatePython() {
        let pyodide = await pyodideReadyPromise;
        try {
          let output = pyodide.runPython("'"+link.value+"'");
          addToOutput(output);
        } catch (err) {
          addToOutput(err);
        }
      }