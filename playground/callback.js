function myFunction(value, callback) {
  setTimeout(() => {
    console.log("This is inside setTimeout.");
    if (value < 6) {
      callback(undefined, true);
    } else {
      callback("Value is greater than 5.");
    }
  }, 2000);
}

myFunction(10, (error, data) => {
  if (error) {
    console.error("Error", error);
  } else {
    console.log("This is from the caller side: ", data);
  }
});

console.log("Program Finished.");
