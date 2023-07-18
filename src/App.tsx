import { Provider } from 'react-redux';

import './App.css';
import Products from './features/products/Products';
import store from './shared/store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductDetails from './features/products/product-details/ProductDetails';
import Cart from './features/cart/Cart';

function App() {

  const router = createBrowserRouter([
    { path: '', element: <Products /> },
    { path: '/products/:productId', element: <ProductDetails /> },
    { path: '/cart', element: <Cart /> }
  ]);

  return (
    <Provider store={store}> <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
