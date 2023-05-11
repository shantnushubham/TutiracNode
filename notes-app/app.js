const { createNewNote, addToNote, readNote } = require("./notes");
const { verifyIfEmail } = require("./myValidator");

createNewNote("Let's start learning with Tutorac!");

addToNote("Hi! I am learning with Tutorac!");

readNote();

console.log(verifyIfEmail("www.tutorac.com"));

console.log("This is after installing Nodemon");
