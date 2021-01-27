import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

const App = (props) => {
  const { children } = props;

  return (
    <div>
      <Header />
        { children }
      <Footer />
    </div>
  );
}

export default App;