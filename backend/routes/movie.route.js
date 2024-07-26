import express from 'express';
import { getTrendingMovie,getMoiveTrailers,getSimilarMovies,getMovieDetails, getMoviesByCategory } from '../controller/movie.controller.js';


const router = express.Router();


router.get('/trending',getTrendingMovie);
router.get('/:id/trailers',getMoiveTrailers);
router.get('/:id/details',getMovieDetails);
router.get('/:id/similar',getSimilarMovies);
router.get('/:category',getMoviesByCategory);





export default router;