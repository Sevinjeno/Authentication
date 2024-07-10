import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app=express();

const port=5000;

app.use(cors());


const jwtSecret = process.env.JWT_SECRET;

console.log("Heyyaaaa",jwtSecret)


const users=[];

app.post('/register',async(req,res)=>{

   const {username,password}=req.body;
   const hashpassword=await bcrypt.hash(password,10);
   users.push({username,password:hashpassword})
   res.status(201).send('User registered')

})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username },jwtSecret);
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('Token is required');
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};

app.get('/protected', verifyToken, (req, res) => {
    res.send('This is a protected route');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

