import { useState, useEffect } from 'react';
import api from '../api/axios';
import MovieCard from '../components/MovieCard';
import { Film } from 'lucide-react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get('movies/');
        setMovies(res.data);
      } catch (err) {
        console.error("Failed to load movies", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Film /> Available Movies</h1>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
