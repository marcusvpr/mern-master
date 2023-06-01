import { Container, Card, Button, Image, Row, Col } from 'react-bootstrap';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h2 className='text-center mb-4'>
            <FaHome /> Controle de Condomínio:
          </h2>

          <Row>
            <Col>
              <Image style={{width:'50vh'}} src="/central-de-portaria.png" fluid />
            </Col>
          </Row>

          <p className='text-center mb-4'>
            Utilize nosso sistema de Controle de Condomínios. Sinta-se em casa!
          </p>
          <div className='d-flex'>
            {userInfo ? (
              <>
                <Button variant='secondary' href='/profile'>
                  <FaUserEdit /> Perfil
                </Button>
                &nbsp;&nbsp;&nbsp;Usuário: {userInfo.name} ( {userInfo.role} )
              </>
            ) : (
              <>
                <Button variant='primary' href='/login' className='me-3'>
                  <FaSignInAlt /> Entrar
                </Button>
                <Button variant='secondary' href='/register'>
                  <FaSignOutAlt /> Registrar
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
