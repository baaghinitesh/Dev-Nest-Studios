import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';

const SimpleProductTest: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('SimpleProductTest: Starting fetch...');
        const response = await apiService.products.getAll({ limit: 5 });
        console.log('SimpleProductTest: Response received:', response.data);
        
        if (response.data && response.data.success) {
          const productsList = response.data.data?.products || [];
          console.log('SimpleProductTest: Products found:', productsList.length);
          setProducts(productsList);
          setError('');
        } else {
          setError('API response not successful');
        }
      } catch (err: any) {
        console.error('SimpleProductTest: Error:', err);
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const containerStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: '#ffffff',
    color: '#000000',
    border: '2px solid #333',
    margin: '20px 0',
    fontFamily: 'Arial, sans-serif'
  };

  const productStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <h2>🔄 Loading Products Test...</h2>
        <p>Fetching data from API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <h2>❌ Error in Product Test</h2>
        <p style={{color: 'red'}}>{error}</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2>✅ Simple Products Test ({products.length} found)</h2>
      {products.length === 0 ? (
        <p style={{color: 'orange'}}>No products found in response</p>
      ) : (
        products.map((product, index) => (
          <div key={product._id || index} style={productStyle}>
            <h3 style={{color: '#333'}}>{product.title || 'No Title'}</h3>
            <p><strong>Price:</strong> ${product.price || 'N/A'}</p>
            <p><strong>Category:</strong> {product.category || 'N/A'}</p>
            <p><strong>ID:</strong> {product._id || 'No ID'}</p>
            <p><strong>Featured:</strong> {product.isFeatured ? 'Yes' : 'No'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SimpleProductTest;