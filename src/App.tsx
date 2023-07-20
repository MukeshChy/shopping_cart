import './App.css';
import Products from './features/products/Products';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from './features/products/product-details/ProductDetails';
import Cart from './features/cart/Cart';
import Header from './features/header/Header';

function App() {

  return ( <>
      <Header />
      <Routes> 
          <Route path="/" element={<Products/>} />
          <Route path="/products/:productId" element={<ProductDetails/>} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Cart/>}/>
        </Routes>
      </>
  );
}

export default App;
