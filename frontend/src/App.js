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
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PasswordChangeScreen from './screens/PasswordChangeScreen';
import ShippingScreen from './screens/ShippingScreen';
import ChoosePaymentScreen from './screens/ChoosePaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <Cart />
      <main className='py-3'>
        <Container>
          {/* <h1>HEMPIRE</h1> */}

          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/placeOrder' component={PlaceOrderScreen} />
          <Route path='/payment' component={ChoosePaymentScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/changePassword' component={PasswordChangeScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/section' component={SectionScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          {/* <Route path='/cart/:id?' component={CartScreen} /> */}
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
