const express = require("express");
const app = express();
app.use(express.json());

const port = 3005;

let users = [{id:1, name:"Pare", email:"pare@mail.com"}]

app.get("/users", (req, res) => {
    res.send(users)
})

app.post("/users", (req,res) => {
    let user = {id:users.length +1, name:req.body.name, email:req.body.email}
    users.push(user)
    res.send(users)

})

app.delete("/users/:id", (req, res) => {
    let user = users.find(user => user.id === parseInt(req.params.id));
    if(!user) {
        res.status(404).send("User not found");
    }
    let index = users.indexOf(user);
    users.splice(index, 1);
    res.send(user);
})

app.put("/users/:id", (req,res) => {
    let user = users.find((user) => user.id === parseInt(req.params.id));
    if (!user) {
      res.status(404).send("User not found");
    }
    user.name = req.body.name;
    user.email = req.body.email;
    res.send(user);
})



app.listen(port, () => {
    console.log(`Server is listening on £(port)`);
})