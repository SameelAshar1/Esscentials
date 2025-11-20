import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import './Home.css';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get('/products');
        // Get first 6 products as featured
        setFeaturedProducts(response.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Esscentials Candle Studio</p>
          <h1>Soft Light. Gentle Scents. Elevated Rituals.</h1>
          <p>Thoughtfully poured candles inspired by calm mornings, slow evenings, and self-care rituals.</p>
          <Link to="/products" className="btn btn-primary">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured Collections</h2>
          <p>Curated blends crafted with botanical oils and soy wax for a clean, serene glow.</p>
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : featuredProducts.length > 0 ? (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="loading">No products available</div>
          )}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/products" className="btn btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

