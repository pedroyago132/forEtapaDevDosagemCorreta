import React from 'react';
import { BrowserRouter, Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Measurement from './pages/Measurement';
import Register from './pages/Register';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { getDatabase } from 'firebase/database';
import QRCode from './pages/QRCode';
import Configuracao from './pages/Config';
import Clientes from './pages/Clientes';
import RegisterClient from './pages/RegisterClient';
import Payment from './pages/Payment';
import { initMercadoPago } from '@mercadopago/sdk-react';
import ChangePassword from './pages/ChangePassword';
import CustomForm from './pages/ClientForm';
import LoadingScreen from './pages/Loading';


const firebaseConfig = {
  apiKey: "AIzaSyAuBuQVnz974K2fXi9iq2qgtDm5kkd93zk",
  authDomain: "dosagem-79271.firebaseapp.com",
  databaseURL: "https://dosagem-79271-default-rtdb.firebaseio.com",
  projectId: "dosagem-79271",
  storageBucket: "dosagem-79271.firebasestorage.app",
  messagingSenderId: "258455838256",
  appId: "1:258455838256:web:d8386e88c570417720d7f5",
  measurementId: "G-MV68282QW7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);


export { database }



const theme = createTheme({
  colorSchemes: {
    
    light: {
      palette: {
        primary: {
          main: '#FF5733',
          light:'#7F00FF',
          dark:"#7F00FF"
        },

        secondary:{
          main: '#FF5733',
          light:'#7F00FF',
          dark:"#7F00FF"
        },
        
      
        // ...other tokens
      },
      
    },
    dark: {
      palette: {
        primary: {
          main: '#FF5733',
          light:'#7F00FF',
          dark:"#7F00FF"
        },

        secondary:{
          main: '#FF5733',
          light:'#7F00FF',
          dark:"#7F00FF"
        },
       
      },
    },

  },
});

function App() {


  return (

    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/measure" element={<Measurement />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/qrcode" element={<QRCode />} />
          <Route path="/config" element={<Configuracao />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/registerClient" element={<RegisterClient />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/password" element={<ChangePassword />} />
          <Route path="/payment/customForm" element={<CustomForm />} />
          <Route path="/loading" element={<LoadingScreen />} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
   
  );
}

export default App;