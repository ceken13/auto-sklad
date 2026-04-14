import { Header } from '../../components/Header';
import UserAuthorization from '../../components/UserAuthorization/UserAuthorization';
import { Footer } from '../../components/Footer';
import { useParams } from 'react-router-dom';

export function UserAuthorizationPage() {
  return (
    <>
      <Header />
      <UserAuthorization />
      <Footer />
    </>
  );
}

export default UserAuthorizationPage;
