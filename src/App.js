import './App.css';
import { Routes,Route,Navigate } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Navbar from './componets/Navbar/Navbar';
import Login from './pages/formauth/Login';
import Register from './pages/formauth/Register';
import PrivateRoute from "./utils/PrivateRoute";
import Notes from './pages/Notes/Notes';
import { useAuth } from './contexts/auth';
import CreateNote from './pages/CreateNote/CreateNote';
import UpdateNote from './pages/UpdateNote/UpdateNote';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './componets/Footer/Footer';

function App() {
  const {user} = useAuth();

  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/notes/create' element={<CreateNote/>}/>
          <Route path='/notes' element={<Notes/>}/>
          <Route path='/notes/update/:id' element={<UpdateNote/>}/>
        </Route>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={user? <Navigate to={"/"}/> : <Register/>}/>
        <Route path='/login' element={user? <Navigate to={"/"}/> : <Login/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
