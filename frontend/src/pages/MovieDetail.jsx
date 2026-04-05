import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import { ArrowLeft, ShoppingCart, PlayCircle } from 'lucide-react';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`movies/${id}/`);
        setMovie(res.data);
      } catch (err) {
        console.error("Failed to load movie", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setBuying(true);
    try {
      await api.post('payments/', { movie_id: id });
      alert('Purchase request sent! Check your orders.');
      navigate('/orders');
    } catch (err) {
      console.error(err);
      alert('Failed to purchase. Please try again.');
    } finally {
      setBuying(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found.</div>;

  return (
    <div className="movie-detail">
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={18} /> Back
      </button>

      <div className="glass-panel" style={{ display: 'flex', gap: '3rem', padding: '2rem', flexWrap: 'wrap' }}>
        {movie.poster ? (
          <img src={movie.poster} alt={movie.title} style={{ maxWidth: '400px', width: '100%', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
        ) : (
          <div className="movie-placeholder" style={{ maxWidth: '400px', width: '100%', borderRadius: 'var(--radius-md)' }}>No Poster</div>
        )}
        
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>{movie.title}</h1>
          <div className="movie-meta" style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>
            <span>{movie.release_date}</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>${movie.price}</span>
          </div>
          
          <div style={{ marginBottom: '2rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            <p>{movie.description}</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handlePurchase} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} disabled={buying}>
              <ShoppingCart size={20} /> {buying ? 'Processing...' : `Buy for $${movie.price}`}
            </button>
            {movie.video_url && (
              <a href={movie.video_url} target="_blank" rel="noreferrer" className="btn btn-outline">
                <PlayCircle size={20} /> Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
