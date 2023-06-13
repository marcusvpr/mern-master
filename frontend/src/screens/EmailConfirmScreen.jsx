import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaKey, FaMailBulk } from 'react-icons/fa';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useEmailConfirmMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const EmailConfirmScreen = () => {
  const [codeEmail, setCodeEmail] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailConfirm, { isLoading }] = useEmailConfirmMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
       navigate('/login');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const email = userInfo.email;
      const res = await emailConfirm({ email, codeEmail }).unwrap();
      toast.success(res.message);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.data?.message || err.data.message);
    }
  };

  const onButtonClick = async (e) => {
    e.preventDefault();
    try {
      const email = userInfo.email;
      const codeEmail = 'ReSendEmailCode';
      const res = await emailConfirm({ email, codeEmail }).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.data.message);
    }
  };

  return (
    <FormContainer>
      <h3 className='text-center mb-4'>
        <FaKey /> Código Confirmação de E-mail: {userInfo.email}
      </h3>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='codeId'>
          <Form.Label>Código de conifrmação:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Entre com o código de confirmação enviado para o seu e-mail'
            required
            value={codeEmail}
            onChange={(e) => setCodeEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className='mt-3'>
          <FaKey /> Confirmar Código
        </Button>

        <Row className='py-2'>
          <Col>
            Possui o Código de Confirmação?
          </Col>
        </Row>
        <Row className='py-2'>
          <Col> 
            <Button
                disabled={isLoading}
                onClick={onButtonClick}
                variant='secondary'
                className='mt-3'>
                <FaMailBulk /> Reenviar
            </Button>
          </Col>
        </Row>

      </Form>

      {isLoading && <Loader />}

    </FormContainer>
  );
};

export default EmailConfirmScreen;
