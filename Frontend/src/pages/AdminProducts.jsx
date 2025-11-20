import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './AdminProducts.css';
import { formatPriceInPKR } from '../utils/currency';

function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage({ type: 'error', text: 'Failed to load products' });
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'N/A';
  };

  const handleDelete = async (productId, productName) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await api.delete(`/products/${productId}`);
      setMessage({ type: 'success', text: `Product "${productName}" deleted successfully!` });
      
      // Remove product from list
      setProducts(products.filter(p => p.id !== productId));
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to delete product' 
      });
    }
  };

  const handleEdit = (productId) => {
    navigate(`/admin/edit/${productId}`);
  };

  if (loading) {
    return (
      <div className="admin-products-page">
        <div className="container">
          <div className="loading">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-products-page">
      <div className="container">
        <div className="admin-header">
          <h1>Manage Products</h1>
          <div className="admin-actions">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/admin')}
            >
              + Add New Product
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/products')}
            >
              View Store
            </button>
          </div>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {products.length === 0 ? (
          <div className="no-products">
            <p>No products found. <button onClick={() => navigate('/admin')} className="link-button">Add your first product</button></p>
          </div>
        ) : (
          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Scent</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-image-cell">
                        {product.image_url && product.image_url.trim() !== '' ? (
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = '<div class="table-placeholder">🕯️</div>';
                            }}
                          />
                        ) : (
                          <div className="table-placeholder">🕯️</div>
                        )}
                      </div>
                    </td>
                    <td>{product.name}</td>
                    <td>{formatPriceInPKR(product.price)}</td>
                    <td>{getCategoryName(product.category_id)}</td>
                    <td>{product.stock_quantity || 0}</td>
                    <td>{product.scent || 'N/A'}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-edit"
                          onClick={() => navigate(`/products/${product.id}`)}
                          title="View"
                        >
                          👁️
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(product.id, product.name)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;

