const {
  addNewNote,
  removeNote,
  listNotes,
  readNoteByTitle,
} = require("./notes");
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
  command: "list",
  describe: "This is used to read all the notes.",
  handler: () => {
    listNotes();
  },
});

yargs.command({
  command: "add",
  describe: "This command will create a new note and delete the old one.",
  builder: {
    title: {
      describe:
        "This represents the title of the note which needs to be added.",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "This represents the body of the note.",
      demandOption: true,
      type: "string",
    },
  },
  handler: ({ title, body }) => {
    addNewNote(title, body);
  },
});

yargs.command({
  command: "remove",
  describe: "This command will remove the note with given title.",
  builder: {
    title: {
      describe: "This represents the title of the note to be deleted.",
      demandOption: true,
      type: "string",
    },
  },
  handler: ({ title }) => {
    removeNote(title);
  },
});

yargs.command({
  command: "read",
  describe: "This command will let us read a note by its title.",
  builder: {
    title: {
      describe: "This represents the title of the note to be read.",
      demandOption: true,
      type: "string",
    },
  },
  handler: ({ title }) => {
    readNoteByTitle(title);
  },
});

console.log(yargs.argv);
