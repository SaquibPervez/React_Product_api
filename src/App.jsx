import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="Main">
        <div className="container">
          <h1>React Api</h1>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="product-container">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img className="product-image" src={product.image} alt={product.title} />
            <h1 className="product-title">{product.title}</h1>
            <h1 className="product-price">Price: ${product.price}</h1>
            <p className="product-rating">Rating: {product?.rating?.rate}⭐</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
