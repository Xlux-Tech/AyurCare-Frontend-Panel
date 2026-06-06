import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../api';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(({ data }) => setProducts(data));
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div>
      <h2>Products</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Name</th><th>Price</th><th>Stock</th><th>Action</th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>
              <td><button onClick={() => handleDelete(p._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
