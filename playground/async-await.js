function myFunction(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("This is inside setTimeout.");
      if (value < 6) {
        resolve(true);
      } else {
        reject("Value is greater than 5.");
      }
    }, 2000);
  });
}

// myFunction(10)
//   .then((data) => {
//     console.log("This is from the caller side: ", data);
//   })
//   .catch((error) => {
//     console.error("Error", error);
//   });

const funFunction = async () => {
  try {
    const message = await myFunction(10);
    console.log(message);
  } catch (err) {
    console.error(err);
  }
};

funFunction();
