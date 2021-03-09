import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import Cart from './components/cart/Cart';
import SectionScreen from './screens/SectionScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <Cart />
      <main className='py-3'>
        <Container>
          {/* <h1>HEMPIRE</h1> */}

          <Route path='/' component={HomeScreen} exact />
          <Route path='/section' component={SectionScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
