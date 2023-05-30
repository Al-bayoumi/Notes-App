import './App.css';
import LayOut from './Components/LayOut/LayOut';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import {  createHashRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState} from 'react';
import jwtdecode from "jwt-decode";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

export default function App() {

  const [userData, setUserData] = useState({});


  useEffect(() => {
    if (localStorage.getItem('userToken')!==null) {
      saveUserData();
    }
  }, []);

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtdecode(encodedToken);
    setUserData(decodedToken);
  }

  const routers = createHashRouter([
    {
      path: "/", element: <LayOut setUserData={setUserData} userData={userData} />, children: [
        { index:true, element: <ProtectedRoute> <Home  saveUserData={saveUserData}/> </ProtectedRoute> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register saveUserData={saveUserData} /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ]);

  return <RouterProvider router={routers}></RouterProvider>

}