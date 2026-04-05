import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card glass-panel">
      {movie.poster ? (
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
      ) : (
        <div className="movie-placeholder">
          <span>No Poster</span>
        </div>
      )}
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span>{movie.release_date || 'Unknown'}</span>
          <span className="movie-price">${movie.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
