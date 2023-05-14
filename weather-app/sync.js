console.log("Starting My Program.");

const addTwoNumbers = (a, b) => a + b;

setTimeout(() => {
  console.log("This is inside setTimeout of 2 seconds.");
}, 2000);

console.log(addTwoNumbers(5, 6));

setTimeout(() => {
  console.log("This is inside setTimeout of 0 seconds.");
}, 0);

console.log("Ending My Program.");





// EXPECTATION:
// Starting my program.
// ** Waits for 2 secs
// This is inside setTimeout of 2 seconds.
// 11
// Ending my program.
