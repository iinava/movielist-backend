import prisma from "../db/prismaClient.js";
import slugify from "slugify";

export const getAllMovies = async (req, res) => {
  // console.log("endpoint hit");
  try {
    const movies = await prisma.movie.findMany();
    // console.log(movies,"movieslist");
    if (!movies) {
      res.status(404).json({ error: "No movies found" });
    }
    res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching movies" });
  }
};

// GET a movie by slug
export const getMovieBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const movie = await prisma.movie.findUnique({
      where: { slug: slug },
    });
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching movie" });
  }
};

export const Addmovie = async (req, res) => {
  const { image, title, year, genre } = req.body;
  try {
    // Generate the slug
    const slug = slugify(`${title}-${year}`, { lower: true });

    const newMovie = await prisma.movie.create({
      data: {
        image,
        title,
        year,
        genre,
        slug,
      },
    });
    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error creating movie" });
  }
};

// PUT update a movie
export const updateMovieRatingReview = async (req, res) => {
  const { slug } = req.params;
  const { review, rating } = req.body;

  try {
    const movie = await prisma.movie.findUnique({
      where: { slug: slug },
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const updatedMovie = await prisma.movie.update({
      where: { slug: slug },
      data: {
        review,
        rating,
      },
    });

    res.json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error updating movie" });
  }
};

// DELETE a movie
export const deleteMovie = async (req, res) => {
    const { slug } = req.params;
    try {
      // Find the movie by slug
      const movie = await prisma.movie.findUnique({
        where: { slug: slug },
      });
  
      // If the movie doesn't exist, return an error
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      // Delete the movie
      await prisma.movie.delete({
        where: { slug: slug },
      });
  
      res.status(204).json({ message: 'Movie deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error deleting movie' });
    }
  };


//Edit Movie fully (PUT)
export const UpdateMovie = async (req, res) => {
    const { slug } = req.params;
    const { image, title, year, genre ,review, rating } = req.body;
  
    try {
      const movie = await prisma.movie.findUnique({
        where: { slug: slug },
      });
  
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }
  
      const updatedMovie = await prisma.movie.update({
        where: { slug: slug },
        data: {
            image,
            title,
            year,
            genre,
            review,
            rating,
          },
      });
  
      res.json(updatedMovie);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Error updating movie" });
    }
  };

