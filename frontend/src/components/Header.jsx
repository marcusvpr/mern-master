import { Navbar, Nav, NavItem, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaHome, FaExclamationCircle, FaPhoneSquare,
         FaUserCircle, FaUserEdit, FaKey, FaRegChartBar, FaUserCog, FaCogs} 
         from 'react-icons/fa';
import { LinkContainer} from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

import { Link } from "react-router-dom"
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

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

  var isAdmin = false;
  if (userInfo && userInfo.role == 'ADMIN') {
    isAdmin = true;
  }

  var userDados = '';
  if (userInfo) {
    if (userInfo.name) {
      userDados = userInfo.name;
    };
    if (userInfo.role) {
      userDados = userDados + ` ( ${userInfo.role} )`;
    };
  };

  const start = <Link to="/">
                  <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png"
                       height="40" className="mr-2">
                  </img>
                </Link>;
  const end = <InputText placeholder="Busca" type="text" className="w-full" />;

  var item = [];
  var items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: (e) => {
        navigate('/');
      }
    },
    {
      label: 'Sobre',
      icon: 'pi pi-fw pi-info-circle',
      command: (e) => {
        navigate('/about');
      }
    },
    {
      label: 'Contato',
      icon: 'pi pi-fw pi-phone',
      command: (e) => {
        navigate('/contact');
      }
    },
  ];

  if (userInfo) {
    item = [{
      label: 'DashBoard',
      icon: 'pi pi-fw pi-desktop',
      command: (e) => {
        navigate('/dashboard');
      }
    }];
    items = [...items, ...item];

    item = [{
      label: 'Central do Cliente',
      icon: 'pi pi-fw pi-cog',
      items: [{
        label: 'Perfil',
        icon: 'pi pi-fw pi-user',
        command: (e) => {
          navigate('/profile');
        }
      },
      {
        label: 'Sair do Sistema',
        icon: 'pi pi-fw pi-power-off',
        command: (e) => {
          logoutHandler();
        }
      }]
    }];
    items = [...items, ...item];
  } else {
    item = [
      {  
        label: 'Central do Cliente',
        icon: 'pi pi-fw pi-cog',
        items: [
            {
              label: 'Entrar no Sistema',
              icon: 'pi pi-fw pi-sign-in',
              command: (e) => {
                navigate('/login');
              }
            },
            {
              label: 'Criar sua Conta',
              icon: 'pi pi-fw pi-user-plus',
              command: (e) => {
                navigate('/register');
              }
            },
            {
              label: 'Recuperar Senha',
              icon: 'pi pi-fw pi-eye',
              command: (e) => {
                navigate('/passwordReset');
              }
            },
        ]
      }];
      items = [...items, ...item];
    };

  return (
    <header>
      <Menubar model={items} start={start} end={end} />
    </header>
  );
};

export default Header;
