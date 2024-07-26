//imports
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
//file import 
import authRoutes from './routes/auth.route.js';
import moiveRoutes from './routes/movie.route.js'
import tvRoutes from './routes/tv.route.js'
import searchRoutes from './routes/search.route.js'
import { protectRoute } from './middleware/protectRoute.js';
import path from 'path';


//setup
dotenv.config();
const app = express();
const port  = process.env.PORT || 3001
const __dirname = path.resolve();

//middlewares
app.use(express.json()); //parser
app.use(cookieParser()); //cookie parser


//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/movie',protectRoute,moiveRoutes);
app.use('/api/v1/tv',protectRoute,tvRoutes);
app.use('/api/v1/search',protectRoute,searchRoutes);
// if(process.env.NODE_ENV==="production"){
//     app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});

// }


app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


app.listen(port ,()=>{
    try {
    mongoose.connect(process.env.MONGO_DB).then(()=>console.log('database connected')).catch((err)=>console.log(err));
    } catch (error) {
        console.log(error)
        
    }
    console.log(`sever is running on port ${port}`)
})