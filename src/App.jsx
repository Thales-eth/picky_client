import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <NavBar />
      <AppRoutes />
    </>
  );
}

export default App;
