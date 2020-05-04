// Imports
const express = require('express');
const shortid = require('shortid');
// console.log(shortid.generate());


const server = express();

// tell server how to read JSON
server.use(express.json());

// Global Variables
let users = [
    {
        id: shortid.generate(), // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    },
    {
        id: 2, // hint: use the shortid npm package to generate it
        name: "Marge Simpson", // String, required
        bio: "Not Homer's Wife, another Marge",  // String, required
    },
    {
        id: shortid.generate(), // hint: use the shortid npm package to generate it
        name: "Dave", // String, required
        bio: "Lill D",  // String, required
    },
]

// Route Handlers
server.post('/api/users', (req, res) => {
    const userInfo = {
        id: shortid.generate(),
        name: req.body.name,
        bio: req.body.bio
    };
    if (res) {
        if (userInfo.name && userInfo.bio) {
            if (typeof userInfo.name !== 'string' || typeof userInfo.bio !== 'string') {
                res.status(400).json({
                    errorMessage: "Please provide name and bio for the user."
                })
            } else {
                users.push(userInfo)
                res.status(201).json(userInfo)
            }
        } else {
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user."
            })
        }
    } else {
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database"
        })
    }
})

server.get('/api/users', (req, res) => {
    if (res) {
        res.status(200).json(users);
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be retrieved."
        })
    }
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.filter(user => user.id == id);
    if (res) {
        if (user.length != 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be retrieved."
        })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const delUser = users.filter(user => user.id == id);

    if (res) {
        if (delUser.length != 0) {
            users = users.filter(user => user.id != id);

            res.status(200).json(delUser);
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    } else {
        res.status(500).json({
            errorMessage: "The user could not be removed"
        })
    }
})

server.put('/api/user/:id', (req, res) => {
    const id = req.params.id;


})


server.listen(8000, () => console.log('\n== API is up ==\n'));