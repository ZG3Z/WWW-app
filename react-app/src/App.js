import {Routes, Route } from 'react-router-dom';
import { useState } from "react";
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/other/MainContent';
import LoginForm from './components/other/LoginForm';
import Footer from './components/fragments/Footer';
import CustomerList from './components/customer/CustomerList';
import CustomerDetails from './components/customer/CustomerDetails';
import CustomerForm from './components/customer/CustomerForm';
import CustomerUpdate from './components/customer/CustomerUpdate';
import BikeList from './components/bike/BikeList';
import BikeDetails from './components/bike/BikeDetails';
import BikeForm from './components/bike/BikeForm';
import BikeUpdate from './components/bike/BikeUpdate';
import RentalList from './components/rental/RentalList';
import RentalDetails from './components/rental/RentalDetails';
import RentalForm from './components/rental/RentalForm';
import RentalUpdate from './components/rental/RentalUpdate';
import AccessoryList from './components/accessory /AccessoryList';
import AccessoryDetails from './components/accessory /AccessoryDetails';
import Equipment from './components/equipment/Equipment';

function App() {
  const [user, setUser] = useState();
  const handleLogin = (user) => {
    console.log(user);
    localStorage.setItem('user', user);
    setUser(user);
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(undefined);
    window.location.reload();
  };
  return (
    <>
      <Header />
      <Navigation handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
        <Route path="/" element={<MainContent />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/details/:customerId" element={ <CustomerDetails /> }/>
        <Route path="/customers/edit/:customerId" element={<CustomerUpdate />} />
        <Route path="/customers/add" element={<CustomerForm />} />
        <Route path="/bikes" element={<BikeList />} />
        <Route path="/bikes/details/:bikeId" element={ <BikeDetails /> }/>
        <Route path="/bikes/edit/:bikeId" element={<BikeUpdate />} />
        <Route path="/bikes/add" element={<BikeForm />} />
        <Route path="/rentals" element={<RentalList/>} />
        <Route path="/rentals/details/:rentalId" element={ <RentalDetails /> }/>
        <Route path="/rentals/edit/:rentalId" element={<RentalUpdate />} />
        <Route path="/rentals/add" element={<RentalForm  />} />
        <Route path="/accessories" element={<AccessoryList  />} />
        <Route path="/accessories/details/:accessoryId" element={ <AccessoryDetails /> }/>
        <Route path="/equipments"  element={ <BikeList /> }/>
        <Route path="/equipments/add/:bikeId"  element={ <Equipment /> }/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
//dodawanike equipment => do rowerows sprzet
