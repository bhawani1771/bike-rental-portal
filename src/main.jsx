import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.jsx';
import { Appp } from './Appp.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from 'react-use-cart';
import { Todo } from './components/todo.jsx';
import { Newapp } from './newapp.jsx';
import { Newappp } from './newappp.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <CartProvider>
        {/* <App /> */}
     <Newapp   />
      </CartProvider>
    </HelmetProvider>
  </StrictMode>,
);
