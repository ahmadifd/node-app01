import { connect, model, Schema } from "mongoose";

connect(
  "mongodb://root:XMBjo2J0QUCl9dRu@services.irn1.chabokan.net:2039/CompanyDB"
)
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect"));

const Book = model(
  "Book",
  new Schema({
    title: String,
    pages: Number,
  })
);

const User = model(
  "User",
  new Schema({
    first_name: String,
    last_name: String,
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  })
);

async function createUser(first_name, last_name, book_id) {
  const user = new User({
    first_name,
    last_name,
    book: book_id,
  });

  const result = await user.save();
  console.log(result);
}

async function createBook(title, pages) {
  const book = new Book({
    title,
    pages,
  });

  const result = await book.save();
  console.log(result);
}

async function getUsers() {
  const users = await User.find().populate("book", "title pages -_id");
  console.log(users);
}

//createBook('nodejs programming', 100);
// createUser('mohammad', 'seyedAghaei', '65520df2474924a3fc63f809');
getUsers();
