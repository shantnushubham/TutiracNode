const promiseFunction = (a, b) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      let sum = a + b;
      if (sum > 15) {
        resolve(sum);
      } else {
        reject({ errorMessage: "Sum must not be less than 16." });
      }
    }, 2000);
  });

promiseFunction(10, 15)
  .then((sum) => {
    console.log("After function call.", sum);
    // return sum * -1;
  })
  .then((negativeSum) => {
    console.log(negativeSum);
    throw new Error("This is my error");
  })
  .catch((err) => {
    console.error(err);
    throw new Error("Hello");
  })
  .then((data) => console.log("Inside Then", data))
  .catch((data) => console.log("Inside Catch", data));
