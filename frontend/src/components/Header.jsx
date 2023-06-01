import { Navbar, Nav, NavItem, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaHome, FaExclamationCircle, FaPhoneSquare,
         FaUserCircle, FaUserEdit, FaKey} from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  var userDados = '';
  if (userInfo) {
    if (userInfo.name) {
      userDados = userInfo.name;
    };
    if (userInfo.role) {
      userDados = userDados + ` ( ${userInfo.role} )`;
    };
  };
  const navDropdownTitle = (<><FaUserCircle/> Central do Cliente</>);

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Controle de Condomínio</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>

              <LinkContainer to='/'>
                <Nav.Link><FaHome /> Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/about'>
                <Nav.Link><FaExclamationCircle /> Sobre</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/contact'>
                <Nav.Link><FaPhoneSquare /> Contato</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <NavDropdown title={navDropdownTitle} id='username'>
                    <LinkContainer to=''>
                        <NavDropdown.Item>{userDados}</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/profile'>
                      <NavDropdown.Item><FaUserEdit />Perfil</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                     <FaSignOutAlt />Sair
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <NavDropdown title={navDropdownTitle} id='usersite'>
                    <LinkContainer to='/login'>
                      <NavDropdown.Item><FaSignInAlt /> Entrar</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/register'>
                      <NavDropdown.Item><FaSignOutAlt /> Registro</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/passwordReset'>
                      <NavDropdown.Item><FaKey /> Recuperar Senha</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
