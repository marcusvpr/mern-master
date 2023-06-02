import './App.css' // for CSS
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';

import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const App = () => {

  return (
    <main classname="App">
      <Header />
      <ToastContainer />
      <Container className='my-2'>
        <Outlet />
      </Container>
      <Footer />
    </main>
  );
};

export default App;
