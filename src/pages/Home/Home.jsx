import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';
const style = {
  minHeight: '100vh',
  display: 'grid',
  gridTemplateRows: 'auto 1fr 5%',
  gridRowGap: '0.5rem',
  background: 'light-blue',
};

const Home = () => (
  <div style={style}>
    <Header />
    <Main />
    <Footer />
  </div>
);

export default Home;
