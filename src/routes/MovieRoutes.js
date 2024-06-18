import express from 'express';
import { getAllMovies, getMovieBySlug, Addmovie, updateMovieRatingReview, deleteMovie } from '../controllers/movieController.js';

const router = express.Router();

// GET all movies
router.get('/', getAllMovies);

// GET a single movie by slug
router.get('/get/:slug', getMovieBySlug);

// POST a new movie
router.post('/add', Addmovie);

// PUT update a movie
router.put('/edit/:slug', updateMovieRatingReview);

// DELETE a movie
router.delete('/delete/:slug', deleteMovie);

export default router;
