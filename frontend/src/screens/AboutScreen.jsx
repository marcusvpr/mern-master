import { Container, Card, Button } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/fa';

const AboutScreen = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h2 className='text-center mb-4'>
            <FaExclamationCircle /> Sobre o Controle de Condomínio:
          </h2>

          <p className='text-center mb-4'>
            Bem-vindo à página de informações, sobre o nosso sistema de controle de
            condomínio.
            <br/><br/>
            O nosso &nbsp;sistema foi &nbsp;desenvolvido para&nbsp; simplificar e &nbsp;otimizar a &nbsp;gestão de
            condomínios,<br/> proporcionando uma plataforma abrangente para síndicos,
            moradores e administradores.
            <br/><br/>
            Com as nossas ferramentas avançadas, você pode:
          </p>
          <div className='d-flex'>
            <ul>
              <li>Registrar e gerenciar informações dos moradores, como dados de contato e informações de unidades ;</li>
              <li>Realizar reservas de áreas comuns, como salões de festas, quadras esportivas e churrasqueiras ;</li>
              <li>Gerenciar o acesso de visitantes e prestadores de serviço ;</li>
              <li>Acompanhar e registrar ocorrências e solicitações de manutenção ;</li>
              <li>Comunicar-se facilmente com os moradores por meio de mensagens e notificações ;</li>
            </ul>
          </div>
          <p>Estamos comprometidos em fornecer uma solução eficiente e segura para facilitar a vida em seu condomínio.</p>
        </Card>
      </Container>
    </div>
  );
};
export default AboutScreen;
