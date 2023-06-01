import { Container, Card, Button } from 'react-bootstrap';
import { FaPhoneSquare } from 'react-icons/fa';

const ContactScreen = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h2 className='text-center mb-4'>
          <FaPhoneSquare /> Contato:
          </h2>
          
          <p className='text-center mb-4'>
            Bem-vindo à página de contato, <br/>
          </p>
          <div className='d-flex'>
            <ul>
              <li>Telefone : (21) 99999-9999</li>
              <li>E-mail : contato@mail.com.br</li>
            </ul>
          </div>
        </Card>
      </Container>
    </div>
  );
};
export default ContactScreen;
