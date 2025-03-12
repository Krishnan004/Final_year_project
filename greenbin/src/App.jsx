import React, { useContext } from 'react';
import { Routes, Route } from 'react-router';
import Header from './component/Header';
import Footer from './component/Footer';
import Mobiles from './component/mobile selling/Mobiles';
import "./css/app.css";
import Home from './component/home/Home';
import ViewMobile from './component/mobile selling/ViewMobile';
import DeviceEvaluvation from './component/mobile selling/DeviceEvaluvation';
import SellingPortal from './component/sell now/SellingPortal';
import UserLogin from './component/authentication/userLogin';
import UserSignUp from './component/authentication/UserSignUp';
import { Context } from './context/Context';
import ProtectedRoute from './component/authentication/ProtectedRoute';
import MobileOrder from './component/admine/MobileOrder';
import OrderPlaced from './component/admine/OrderPlaced';
import AcceptOrder from './component/admine/AcceptOrder';
import AdminLogin from './component/authentication/AdminLogin';
import AdminSignUp from './component/authentication/AdminSignUp';
import AdminProtectRouter from './component/authentication/AdminProtectRouter';

const App = () => {
  const { user } = useContext(Context);

  return (
    <div className="main">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="admine/login" element={<AdminLogin/>}/>
        <Route path="admine/signup" element={<AdminSignUp/>}/>


        {/* Protected Routes */}
        <Route path="/mobileselling" element={<ProtectedRoute><Mobiles /></ProtectedRoute>} />
        <Route path="/mobileselling/:id" element={<ProtectedRoute><ViewMobile /></ProtectedRoute>} />
        <Route path="/mobileselling/evaluvation/:id" element={<ProtectedRoute><DeviceEvaluvation /></ProtectedRoute>} />
        <Route path="/sellingportal/:id" element={<ProtectedRoute><SellingPortal /></ProtectedRoute>} />
        <Route path="/admine" element={<AdminProtectRouter><OrderPlaced/></AdminProtectRouter>}/>
        <Route path="/acceptorder/:userid/:orderid" element={<AcceptOrder/>}/>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
