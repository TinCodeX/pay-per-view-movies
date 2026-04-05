import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import { ShoppingBag, Calendar } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
         try {
           const res = await api.get('orders/');
           setOrders(res.data);
         } catch (err) {
           console.error("Failed to load orders", err);
         } finally {
           setLoading(false);
         }
      };
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><ShoppingBag /> My Orders</h1>
      
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>You haven't purchased any movies yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map(order => (
            <div key={order.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ marginBottom: '0.25rem' }}>{order.movie?.title || `Movie ID: ${order.movie}`}</h3>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}>
                  <Calendar size={14} /> Created: {new Date(order.created_at).toLocaleDateString()}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>${order.amount}</div>
                <div style={{ fontSize: '0.8rem', color: order.status === 'completed' ? '#10b981' : '#f59e0b', textTransform: 'uppercase' }}>
                  {order.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
