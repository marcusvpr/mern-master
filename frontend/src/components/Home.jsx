import { Container, Card, Button, Image, Row, Col } from 'react-bootstrap';
import { FaHome, FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h2 classname='text-center mb-4'>
            <FaHome /> Controle de Condomínio:
          </h2>

          <Row>
            <Col>
              <Image style={{width:'40vh'}} src="/pombal_logo.png" fluid />
            </Col>
            <Col>
              <Image style={{width:'40vh'}} src="/central-de-portaria.png" fluid />
            </Col>
          </Row>

          <p classname='text-center mb-4'>
            Utilize nosso sistema de Controle de Condomínios. Sinta-se em casa!
          </p>
          <div classname='d-flex'>
            {userInfo ? (
              <>
              </>
            ) : (
              <>
                <Button variant='primary' href='/login' className='me-3'>
                  <FaSignInAlt /> Entrar
                </Button>
                <Button variant='secondary' href='/register'>
                  <FaSignOutAlt /> Criar Conta
                </Button>
              </>
            )}

          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Home;
