const fs = require("fs");

const NOTES_FILE_PATH = "notes.json";

const addNewNote = (title, body) => {
  let notes = readNotes();
  if (isNoteTitleUnique(title)) {
    notes.push({ title, body });
    writeNoteFile(notes);
  } else {
    console.error("Title is already taken.");
  }
};

const readNotes = () => {
  try {
    const data = fs.readFileSync(NOTES_FILE_PATH, {
      encoding: "utf-8",
    });
    return JSON.parse(data);
  } catch (err) {
    console.error("File not found!");
    return [];
  }
};

const removeNote = (title) => {
  if (!isNoteTitleUnique(title)) {
    let notes = readNotes();
    notes = notes.filter((note) => note.title !== title);
    writeNoteFile(notes);
  } else {
    console.error("Title not found.");
  }
};

function writeNoteFile(notesArray) {
  fs.writeFileSync(NOTES_FILE_PATH, JSON.stringify(notesArray));
}

const isNoteTitleUnique = (title) => {
  let notes = readNotes();
  return notes.findIndex((note) => note.title === title) < 0;
};

const listNotes = () => {
  let notes = readNotes();
  notes.forEach((note) => {
    console.log(`Title: ${note.title}\nBody: ${note.body}\n`);
  });
};

const readNoteByTitle = (title) => {
  let notes = readNotes();
  let note = notes.find((note) => note.title === title);
  if (!note) {
    console.error("Note with title was not found.");
  } else {
    console.log(`Title: ${note.title}\nBody: ${note.body}\n`);
  }
};

module.exports = { addNewNote, removeNote, listNotes, readNoteByTitle };
