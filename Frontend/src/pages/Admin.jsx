import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Admin.css';

function Admin() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    stock_quantity: '',
    scent: '',
    size: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchCategories();
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        image: null
      }));
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category_id', formData.category_id);
      formDataToSend.append('stock_quantity', formData.stock_quantity);
      formDataToSend.append('scent', formData.scent);
      formDataToSend.append('size', formData.size);
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      console.log('Submitting product with image:', formData.image ? formData.image.name : 'No image');
      
      const response = await api.post('/products', formDataToSend);
      
      console.log('Product created:', response.data);
      console.log('Image URL:', response.data.image_url);

      setMessage({ type: 'success', text: 'Product added successfully!' });
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category_id: '',
        stock_quantity: '',
        scent: '',
        size: '',
        image: null
      });
      
      // Clear file input and preview
      document.getElementById('image-input').value = '';
      setImagePreview(null);

      // Redirect to admin products page after 2 seconds
      setTimeout(() => {
        navigate('/admin/products');
      }, 2000);
    } catch (error) {
      console.error('Error adding product:', error);
      const errData = error.response?.data;
      const errMsg = errData?.error || errData?.details || error.message || 'Failed to add product. Please try again.';
      setMessage({ type: 'error', text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <h1>Add New Product</h1>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g., Vanilla Dream Candle"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Describe your candle..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (PKR) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                placeholder="1500"
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock_quantity">Stock Quantity *</label>
              <input
                type="number"
                id="stock_quantity"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="50"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category_id">Category *</label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="scent">Scent</label>
              <input
                type="text"
                id="scent"
                name="scent"
                value={formData.scent}
                onChange={handleInputChange}
                placeholder="e.g., Vanilla, Lavender"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="size">Size</label>
            <input
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              placeholder="e.g., Small, Medium, Large"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Product Image *</label>
            <input
              type="file"
              id="image-input"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            {imagePreview && (
              <div className="image-preview-container">
                <p className="image-preview-label">Preview:</p>
                <img 
                  src={imagePreview} 
                  alt="Product preview" 
                  className="image-preview-img"
                />
                <p className="image-preview-filename">{formData.image.name}</p>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/products')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Admin;

