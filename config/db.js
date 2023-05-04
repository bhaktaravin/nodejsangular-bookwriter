import { connect } from 'mongoose';
import dotenv from 'dotenv'; 

dotenv.config({ path: '../config.env'})

export const dbConnect = () => {
    connect( process.env.MONGO_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        dbName: 'journal'
    }).then(
        () => console.log("Connected Successfully"), 
        (error) => console.log(error)
    )
}