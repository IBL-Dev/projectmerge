import './App.css';

import Header from './components/Header';
import AddStudent from './components/AddStudent';
import AllStudent from './components/AllStudents';
import AllConsultations from './components/AllConsultation';
import ViewConsultation from './components/ViewConsultation';
import ConsultationForm from './components/ConsultationForm';
import Home from './components/Home';
import Footer from './components/footer';
import MainHome from './components/MainHome';
import Thilina from './components/Thilina';
import Thamindu from './components/Thamindu';
import Sakila from './components/Sakila';
import Praveen from './components/Praveen';
import VeterinaryRecordForm from './components/kk'; 
import AdminDashboard from './components/adminDashboard';
import Overview from './financial/Components/Overview/Overview';
import Invoice from './financial/Components/Invoice/Invoice';
import Cpayment from './financial//Components/Cpayment/Cpayment';
import Ppayment from './financial/Components/Ppayment/Ppayment';
import Refunds from './financial/Components/Refunds/Refunds';
import NewInvoice from './financial/Components/Invoice/NewInvoice/NewInvoice';
import Client from './financial/Components/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  


function App() {
  return (
    <Router>
      <div>
        <Header />
        
        <Routes> 
          <Route path="/ManinHome" element={<MainHome />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<AllStudent />} /> */}
          <Route path="/add" element={<AddStudent />} />
          <Route path="/consultation" element={<AllConsultations />} />
          <Route path="/consultation/:id" element={<ViewConsultation />} />
          <Route path="/consultation-form" element={<ConsultationForm />} />
          <Route path="/thilina" element={<Thilina />} />
          <Route path="/thamindu" element={<Thamindu />} />
          <Route path="/sakila" element={<Sakila />} />
          <Route path="/praveen" element={<Praveen />} />
          <Route path="/veterinary-records/form" element={<VeterinaryRecordForm />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/" element={<Overview />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/cpayment" element={<Cpayment />} />
      <Route path="/ppayment" element={<Ppayment />} />
      <Route path="/refunds" element={<Refunds />} />
      <Route path="/ninvoice" element={<NewInvoice />} />
      <Route path="/client" element={<Client />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
