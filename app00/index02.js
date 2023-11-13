import express from "express";
import helmet from "helmet";
import config from "config";
import userRouter from "./02/routes/users.js";
//import homeRouter from "./02/routes/home.js";
import mongoose from "mongoose";

const { Schema } = mongoose;

const employeeSchema = new Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
});

const employee = mongoose.model("Employee", employeeSchema);

// console.log(
//   await mongoose.createConnection(
//     "mongodb://root:XMBjo2J0QUCl9dRu@services.irn1.chabokan.net:2039//test"
//   ).name
// );

await mongoose
  .connect(
    "mongodb://root:XMBjo2J0QUCl9dRu@services.irn1.chabokan.net:2039/CompanyDB"
    //"mongodb+srv://ahmadifd:ua3jZ8BW6w0PIMb5@ac-huiyzvg-shard-00-01.jad41dh.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(async () => {
    console.log("connected");

    // const employee1 = new employee({
    //   first_name: "farshid",
    //   last_name: "ahmadi",
    // });

    // const employee2 = new employee({
    //   first_name: "farshad",
    //   last_name: "ahmadi",
    // });

    // await employee
    //   .create(employee2)
    //   .then(() => {
    //     console.log("created");
    //   })
    //   .catch((err) => console.log("not created", err));

    // await employee1
    //   .save()
    //   .then(() => {
    //     console.log("created");
    //   })
    //   .catch((err) => console.log("not created", err));

    // const employees = await employee.find();
    // console.log(employees);

    // const employee3 = await employee.find({
    //   first_name: "farshid" ,
    //   last_name: "ahmadi",
    // });
    // console.log(employee3);

    // const employees1 = await employee
    //   .find({
    //     last_name: "ahmadi",
    //   })
    //   .limit(1)
    //   .sort({ first_name: 1 }) //-1
    //   .select({ first_name: 1 });

    // const employees2 = await employee.find().count();

    // const employees3 = await employee.find({ age: { $gte: 20, $ne: 10 } });//gt gte lt lte eq ne
    //const employees4 = await employee.find({ age: { $in: [10, 20, 30] } });

    // const employees5 = await employee
    //   .find()
    //   .or({ age: { $in: [10, 20, 30] } }, { first_name: "farshid" }); //and

    // const pn = 1;
    // const ps = 2;
    // const employees6 = await employee
    //   .find()
    //   .skip((pn - 1) * ps)
    //   .limit(ps);

    //console.log(employees6);
  })
  .catch((err) => console.log("not connected", err));

/*






const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// console.log("Application Name:", config.get("name"));
// console.log("Application version:", config.get("version"));
// console.log("sms:", config.get("SMS.ip"));

// if (app.get("env") === "development") {
//   console.log("morgan is active");
// }

app.use((req, res, next) => {
  // res.send('this response is coming from middleware 1')
  console.log("midd 1");
  next();
});

app.use((req, res, next) => {
  console.log("midd 2");
  next();
});

app.use("/api/users", userRouter);
app.use("/", homeRouter);

app.use((req, res, next) => {
  console.log("midd 3");
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listen to ${PORT}`);
});

*/
