import { Link } from 'react-router-dom';
import './ProductCard.css';
import { formatPriceInPKR } from '../utils/currency';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="product-image">
          {product.image_url && product.image_url.trim() !== '' ? (
            <img 
              src={product.image_url} 
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '';
                e.target.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'placeholder-image';
                placeholder.textContent = '🕯️';
                e.target.parentElement.appendChild(placeholder);
              }}
            />
          ) : (
            <div className="placeholder-image">🕯️</div>
          )}
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="product-price">{formatPriceInPKR(product.price)}</p>
          {product.scent && <p className="product-scent">Scent: {product.scent}</p>}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;

