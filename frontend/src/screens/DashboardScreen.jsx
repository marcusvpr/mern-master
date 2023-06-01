import { Container, Card, Button } from 'react-bootstrap';
import { FaRegChartBar } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const DashboardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h2 className='text-center mb-4'>
            <FaRegChartBar /> Dashboard:
          </h2>

          <p className='text-center mb-4'>
            Usuário: {userInfo.name} ( {userInfo.role} )
          </p>
        </Card>
      </Container>
    </div>
  );
};
export default DashboardScreen; 
