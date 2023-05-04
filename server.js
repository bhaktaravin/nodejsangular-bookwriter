import dotenv from 'dotenv'; 
dotenv.config({ path: './config.env'}); 
import express from 'express'; 
import cors from 'cors'; 
import userRouter from './routes/userRoutes.js'; 
import { dbConnect } from './config/db.js';

dbConnect(); 

const app = express(); 
app.use(express.json()); 

app.use(cors({
    credentials: true, 
    origin: ["http://localhost:8080"]
}));

app.get('/', (req,res) => {
    res.json({ message: 'Testing...'})
});

app.use("/api/users", userRouter); 


const port = process.env.PORT || 5000; 
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});