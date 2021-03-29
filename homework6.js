const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()
const app = express();
app.use(express.json());
const port = 3000;


app.get('/users', async (req, res) => {
    const users = await prisma.users.findMany();
    res.status(200).send(users);
});

app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    const user = await prisma.users.findUnique({
        where: {
            id: id
        }
    });
    res.status(200).send(user); 
});

app.post('/users', (req, res) => {
    const user = prisma.users.create({
        where: {
            id: req.body.id
        },
        data: {
            name: req.body.name,
            salary: req.body.salary
        }
    });
    res.status(201).send(user);
});

app.put('/users', async (req, res) => {
    const id = req.body.id;
    const user = await prisma.users.update({
        where: {
            id: id
        },
        data: {
            name: req.body.name,
            salary: req.body.salary
        }
    });
    res.status(200).send(user); 
});

app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    const user = await prisma.users.delete({
        where: {
            id: id
        }
    });
    res.status(200).send(user); 
});
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});