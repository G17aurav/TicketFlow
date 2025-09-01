// import './App.css'
import { useEffect } from "react";
import {Routes, Route} from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import HomePage from './pages/superadmin/HomePage';
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./redux/slices/authSlice";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);


  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/superadmin/home' element={<HomePage/>}/>
      </Routes>
    </div>
  )
}

export default App
