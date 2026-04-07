import { Header } from '../../components/Header';
import User from '../../components/User/User';
import { Footer } from '../../components/Footer';
import { useParams } from 'react-router-dom';

export function UserPage() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <>
      <Header />
      <User />
      <Footer />
    </>
  );
}

export default UserPage;
