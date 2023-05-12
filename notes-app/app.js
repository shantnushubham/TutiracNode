const { createNewNote, addToNote, readNote } = require("./notes");
const yargs = require("yargs");

// const action = process.argv[2];

// if (action === "read") {
//   readNote();
// } else if (action === "write") {
//   createNewNote("This is new Note");
// } else if (action === "add") {
//   addToNote("Note was added.");
// }

yargs.version("2.1.0");

yargs.command({
  command: "add",
  describe: "This is used to add a new Note.",
  handler: function () {
    // console.log("This command will add a new note.");
    addToNote("Note was added.");
  },
});

yargs.command({
  command: "read",
  describe: "This is used to read all the notes.",
  handler: function () {
    readNote();
  },
});

yargs.command({
  command: "write",
  describe: "This command will create a new note and delete the old one.",
  handler: function () {
    createNewNote("This is new Note");
  },
});

console.log(yargs.argv);
