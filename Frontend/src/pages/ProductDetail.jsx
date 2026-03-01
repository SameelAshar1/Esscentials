import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './ProductDetail.css';
import { formatPriceInPKR } from '../utils/currency';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="error">
        <p>{error || 'Product not found'}</p>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <div className="product-detail-content">
          <div className="product-image-section">
            {product.image_url && product.image_url.trim() !== '' ? (
              <img 
                src={product.image_url} 
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  const placeholder = document.createElement('div');
                  placeholder.className = 'placeholder-image-large';
                  placeholder.textContent = '🕯️';
                  e.target.parentElement.appendChild(placeholder);
                }}
              />
            ) : (
              <div className="placeholder-image-large">🕯️</div>
            )}
          </div>
          <div className="product-info-section">
            <h1>{product.name}</h1>
            <p className="product-price-large">{formatPriceInPKR(product.price)}</p>
            {product.scent && (
              <p className="product-scent-large">
                <strong>Scent:</strong> {product.scent}
              </p>
            )}
            {product.size && (
              <p className="product-size">
                <strong>Size:</strong> {product.size}
              </p>
            )}
            {product.description && (
              <div className="product-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>
            )}
            <div className="product-stock">
              <strong>Stock:</strong> {product.stock_quantity > 0 ? `${product.stock_quantity} available` : 'Out of stock'}
            </div>
            <button
              className="btn btn-primary add-to-cart-btn"
              onClick={() => addToCart(product, 1)}
              disabled={product.stock_quantity <= 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

