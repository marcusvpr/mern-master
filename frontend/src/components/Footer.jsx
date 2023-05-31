import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
        <Container className='d-flex justify-content-center'>
          <h6>
            © Copyright MPXDS 2023 - &nbsp;
            <a href="https://mpxds.com.br" target="_blank">www.mpxds.com.br</a>
          </h6>
        </Container>
    </footer>
  );
};

export default Footer;
