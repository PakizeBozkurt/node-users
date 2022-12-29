const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const port = 3005;

let users = [
  { id: 1, name: "Pare", email: "pare@mail.com" },
  { id: 2, name: "Bare", email: "bare@mail.com" },
];


// All users end-point!
//req(use body!)
//res status code(200(200 = Get succsess!, 201 = Post succsess!), 400(10 codes 400(bad req), 401(unautorotaise), 403(), 404()), 500(Server errors!))
app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
    let userId = Number(req.params.id);
    let user = users.filter((user) => user.id === (userId));
    res.send(user);
})

//*** CRUD => Create(POST), retrive(GET), update(PUT, PATCH), delete(DELETE)

//Create data req.body!
app.post("/users", (req, res) => {
  let user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(user);
  res.send(users);
});


// Delete data form database!
app.delete("/users/:id", (req, res) => {
  let user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("User not found");
  }
  let index = users.indexOf(user);
  users.splice(index, 1);
  res.send(user);
});

//Update speciphic data!
app.put("/users/:id", (req, res) => {
  let user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("User not found");
  }
  user.name = req.body.name;
  user.email = req.body.email;
  res.send(user);
});

//Server!
app.listen(port, () => {
  console.log(`Server is running port on ${port}`);
});
