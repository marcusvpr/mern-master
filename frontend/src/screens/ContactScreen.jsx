import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Container, Card, Image, Form, InputGroup } from 'react-bootstrap';
import { FaPhoneSquare, FaSignOutAlt } from 'react-icons/fa';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';

const ContactScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [state, setState] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    toast.error('Concluir função = Fale Conosco !');
  };

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h2 className='text-center mb-4'>
            <FaPhoneSquare /> Contato:
          </h2>
          
          <p className='text-center mb-4'>
            Bem-vindo à página de contato. <br/>
          </p>

          <Image style={{width:'20vh'}} src="/pombal_logo.png" fluid />

          <div className='d-flex'>
              <ul>
                <li>Telefone : (21) 99999-9999</li>
                <li>E-mail : contato@mail.com.br</li>
              </ul>
          </div>

          <Dialog header="Fale Conosco:" className="col col-sm-4"
            visible={state} onHide={() => setState(false)}>
            <Form onSubmit={submitHandler}>
              <Form.Group className='my-2' controlId='name'>
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Entre seu Nome'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='my-2' controlId='email'>
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Entre seu E-mail'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='my-2' controlId='phone'>
                <Form.Label>Telefone:</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="phoneId">+55</InputGroup.Text>
                  <Form.Control aria-describedby="phoneId" className="mobileBox"
                    type='tel'
                    placeholder='Entre seu Telefone'
                    required
                    maxLength="15"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                </InputGroup>
              </Form.Group>
              <Form.Group className='my-3' controlId='object'>
                <Form.Label>Assunto:</Form.Label>
                <Form.Control
                  as="textarea" rows="{5}"
                  placeholder='Entre o Assunto'
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary' className='mt-3'>
                <FaSignOutAlt /> Enviar
              </Button>
            </Form>
          </Dialog>

          <p> </p>
          <Button label="Fale Conosco - clique aqui !" onClick={() => setState(true)} />
        </Card>

      </Container>
    </div>
  );
};
export default ContactScreen;
