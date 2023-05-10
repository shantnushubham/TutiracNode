const fs = require("fs");

const NOTES_FILE_PATH = "notes.txt";

function createNewNote(text) {
  fs.writeFileSync(NOTES_FILE_PATH, text);
}

function addToNote(text) {
  fs.appendFileSync(NOTES_FILE_PATH, `\n${text}`);
}

function readNote() {
  console.log(
    fs.readFileSync(NOTES_FILE_PATH, {
      encoding: "utf-8",
    })
  );
}

module.exports = { createNewNote, addToNote, readNote };
