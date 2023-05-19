require("./appMongoose");
const User = require("./models/User");

// function myTestFunction() {
//   User.findOneAndDelete({ _id: "646497a6291460dccdd86efe" })
//     .then((deleteResult) => {
//       console.log(deleteResult);
//       return "Deleted";
//     })
//     .then((status) => {
//       console.log(status);
//       User.countDocuments({}).then((countData) => console.log(countData));
//     })
//     .catch((err) => console.error(err));
// }

async function myTestFunction() {
  try {
    const updateResult = await User.findOneAndUpdate(
      {
        _id: "6464aa71077fe23c8868875a",
      },
      { age: 28 }
    );
    console.log(updateResult);
    console.log("Updated");
    const countData = await User.countDocuments({});
    console.log(countData);
  } catch (err) {
    console.error(err);
  }
}

myTestFunction();
