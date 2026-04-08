import { Header } from '../../components/Header';
import User from '../../components/User/User';
import { Footer } from '../../components/Footer';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export function UserPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <Header />

      {/* Кнопка logout (додай) */}
      <Button color="error" onClick={handleLogout}>
        Вийти
      </Button>

      <User />
      <Footer />
    </>
  );
}

export default UserPage;
