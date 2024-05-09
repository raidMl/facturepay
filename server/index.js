import express from 'express'
import adminFacture from './routes/adminFacture.routes.js';
import login from './routes/login.routes.js';
import register from './routes/register.routes.js';
import client from './routes/client.routes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/adminFacture', adminFacture);
app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/user', client);


app.listen(8080,()=>(console.log('server is running in port 8080')));

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }) 
.then(()=>console.log('connected to database'))
.catch((err)=>console.log("error in connecting to database"));