import { useState } from 'react';

import { Container, Card} from 'react-bootstrap';
import { FaRegChartBar } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';

const DashboardScreen = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#4bc0c0'
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#565656'
        }
    ]
  };

  const { userInfo } = useSelector((state) => state.auth);
  const [state, setState] = useState(false);

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h2 className='text-center mb-4'>
            <FaRegChartBar /> Dashboard:
          </h2>

          <div className="card flex justify-content-center">
            <Chart type="line" data={data} />
          </div>

          <Dialog visible={state} onHide={() => setState(false)}>
            <p className='text-center mb-4'>
              Usuário Logado: {userInfo.name} ( {userInfo.role} )
            </p>
            <p className='text-center mb-4'>
              Último acesso: 01.06.2023 às 19:27:00 
            </p>
          </Dialog>

          <div className="card flex justify-content-center">
            <p> </p>
            <Button label="Info Usuário" onClick={() => setState(true)} />
          </div>

        </Card>
      </Container>
    </div>
  );
};
export default DashboardScreen; 
