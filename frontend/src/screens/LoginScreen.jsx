import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaKey } from 'react-icons/fa';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.indStatus.length == 5) {
        navigate('/emailConfirm');
      } else {
        navigate('/dashboard');
      }
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...res }));

    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h2 className='text-center mb-4'>
        <FaSignInAlt /> Entrar no Sistema:
      </h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>E-mail:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Entre com seu e-mail'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Senha:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Entre com sua senha'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className='mt-3'
        >
          <FaSignInAlt /> Entrar
        </Button>
      </Form>

      {isLoading && <Loader />}

      <Row className='py-3'>
        <Col>
          Novo Usuário? <FaSignOutAlt /> <Link to='/register'> Criar Conta</Link>
        </Col>
        <Col>
          Esqueci minha Senha? <FaKey /> <Link to='/passwordReset'> Recuperar</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
