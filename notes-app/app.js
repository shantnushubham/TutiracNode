const { createNewNote, addToNote, readNote } = require("./notes");

createNewNote("Let's start learning with Tutorac!");

addToNote("Hi! I am learning with Tutorac!");

readNote();

// fs.writeFileSync(NOTES_FILE_PATH, "Let's start learning with Tutorac!");

// CHALLENGE 1:
// Use appendFileSync() to add something to the notes.txt file.
// Statement: "Hi! I am learning with Tutorac!"

// fs.appendFileSync(NOTES_FILE_PATH, "\nHi! I am learning with Tutorac!");

// CHALLENGE 2:
// 1. Make a notes.js file, and inside, write function to add, and read some text to Notes file.
// 2. Call these functions from app.js file.
