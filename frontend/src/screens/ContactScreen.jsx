import { Container, Card, Button } from 'react-bootstrap';

const ContactScreen = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Contato:</h1>
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
