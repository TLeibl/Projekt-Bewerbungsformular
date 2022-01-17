# Bewerbungsformular mit Datenspeicherung
WebDev Endabgabe
Teammitglieder:
Marc Nauendorf [200882], Tabea Leibl [204105], David Flaig [198687]

Funktionsweise:
Der Nutzer kann ein Bewerbungsformular ausfüllen und durch Klick auf den Abschicken-Button werden die eingegebenen Daten (Vorname, Nachname, Email, Straße, Wohnort mit PLZ, Telefonnummer sowie Bewerbungsstelle) in einer JSON-Datei abgespeichert. Zusätzlich können im Formular Dokumente ausgewählt werden (Bewerbungsschreiben, Lebenslauf sowie Abschlusszeugnis), welche dann ebenfalls gespeichert werden. 
Durch das Speichern der Daten sowie Dateien wird ein Server simuliert.
War der Upload erfolgreich oder ging etwas schief, so erscheint eine entsprechende Benachrichtigung.
Fehlen Eingaben, so soll hierzu ebenfalls eine Benachrichtigung erscheinen.
Die gespeicherten Daten sowie Links zum erneuten Download der hochgeladenen Dateien sind für den Nutzer durch Klick auf den Button "Bisher gespeicherte Daten ansehen" einsehbar. Nach Abschicken der Daten sind diese ebenfalls zusammengefasst für den Nutzer einsehbar.

Das Outputfenster unten wurde erhalten, um die Kommunikation mit Python via Pyodide zu veranschaulichen.

Unterstützte Browser:
- Google Chrome ab Version 71.0
- Firefox ab Version 70.0

Der Code wird durch Verwendung von Pyodide in Web Assembly (WASM) compiled.
Programmiersprache Backend: Python
                   Frontend: HTML, CSS, JavaScript


