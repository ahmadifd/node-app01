import { connect, Schema, model } from "mongoose";

connect(
  "mongodb://root:XMBjo2J0QUCl9dRu@services.irn1.chabokan.net:2039/CompanyDB"
)
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect"));

const bookSchema = new Schema({
  title: String,
  pages: Number,
});

const Book = model("Book", bookSchema);

const User = model(
  "User",
  new Schema({
    first_name: String,
    last_name: String,
    books: [bookSchema],
  })
);

async function createUser(first_name, last_name, books) {
  const user = new User({
    first_name,
    last_name,
    books: books,
  });

  const result = await user.save();
  console.log(result);
}

async function getUsers() {
  const users = await User.find();
  console.log(users);
}

async function updateUser(id) {
  const user1 = await User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        books: [{ title: "333" }, { title: "444" }],
        //'books.title' : '32123'
      },
      //   $unset: {
      //     books: "", //'book.title' :''
      //   },
    }
  );
}

async function addBook(userId, book) {
  const user = await User.findById(userId);
  user.books.push(book);
  await user.save();
}

async function removeBook(userId, bookId) {
  const user = await User.findById(userId);
  const book = user.books.id(bookId);
  book.deleteOne();
  await user.save();
}

// createUser("mohammad", "seyedAghaei", [
//   new Book({ title: "nodejs progamming", pages: 100 }),
//   new Book({ title: "react progamming", pages: 150 }),
//   new Book({ title: "mongodb tutorial", pages: 200 }),
// ]);

// addBook('616d6cf194c1e2a6523436c4', new Book({title:'js tutorial', pages: 300}))
//updateUser("655207bcdf74c7004c840f2d");
//getUsers()
//removeBook("655207bcdf74c7004c840f2d", "6552168671d5aca455c51de3");
