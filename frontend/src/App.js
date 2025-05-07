import './App.css';
import './index.css';

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
import SignIn from "./usermanagement/components/login/index"; 
import Signup from "./usermanagement/components/register/index";
import Allusers from "./usermanagement/emplyee/Allusers";
import Edidemployeeprofile from "./usermanagement/emplyee/Edidemployeeprofile";
import Userupdate from "./usermanagement/emplyee/Userupdate";
import Euserprofile from "./usermanagement/emplyee/Euserprofile";
import Employeedashboard from "./usermanagement/emplyee/Employeedashboard";
import Homepage from "./usermanagement/components/home/index";

import AddUser from "../src/projectmanagement/AddUser/AddUser";
import UpdateUser from "../src/projectmanagement/UpdateUser/UpdateUser";
import Dashboard from "../src/projectmanagement/Dashbord/Dashboard";
import ViewProject from "../src/projectmanagement/viewProject/ViewProject"; // Add this import
import ProjectDetails  from "../src/projectmanagement/viewProject/ViewProject";
import Users from "../src/projectmanagement/UserDetails/Users";

import TalentPoolDashboard from "../src/assisment/Components/TalentPool/TalentPoolDashboard";
import DashboardHome from "../src/assisment/Components/TalentPool/DashboardHome";
import AddApp from "../src/assisment/Components/ApplicantFeatures/AddApp/AddApp";
import ApplicantDetails from "../src/assisment/Components/ApplicantDetails/ApplicantDetails";
import JobList from "../src/assisment/Components/Jobs/JobList";
import NewJob from "../src/assisment/Components/Jobs/NewJob";
import JobDetail from "../src/assisment/Components/Jobs/JobDetail";
import PublicCareers from "../src/assisment/Components/Public/Careers/PublicCareers";
import PublicHeader from "../src/assisment/Components/Public/Layout/PublicHeader";
import PublicJobDetail from "../src/assisment/Components/Public/Careers/PublicJobDetails";
// import Login from "../src/assisment/Components/Auth/Login";
import AppSuccessful from "../src/assisment/Components/Public/Careers/AppSuccessful";
import AssignmentManager from "../src/assisment/Components/TalentPool/AssignmentManager";
import ApplicationReview from "../src/assisment/Components/TalentPool/ApplicationReview";






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
      
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/e_allusers" element={<Allusers />} />
      <Route path="/e_editprofile/:uid" element={<Edidemployeeprofile/>}/>
      <Route path="/e_updates/:userid" element={<Userupdate/>}/>
      <Route path="e_userprofile/:empid" element={<Euserprofile/>}/>
      <Route path="/employeeDashboard" element={<Employeedashboard/>}/>
      <Route path="/employeehome" element={<Homepage/>}/>

      <Route path="/addproject" element={<AddUser/>}/>
      <Route path="/projectdetails" element={<Users/>}/>
      <Route path="/projectdetails/:id" element={<UpdateUser/>}/>
      <Route path="/update/:id" element={<UpdateUser/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/project/:id" element={<ViewProject />} />
      <Route path="/project-details" element={<ProjectDetails />} />



         {/* Public Routes */}
         <Route
        path="/assignment"
        element={
          <>
          
            <PublicCareers />
          </>
        }
      />

      {/* Public Job Details Route */}
      <Route
        path="/jobs/:id"
        element={
          <>
            <PublicHeader />
            <PublicJobDetail />
          </>
        }
      />

      {/* Public Application Route */}
      <Route
        path="/apply/:jobId"
        element={
          <>
            <PublicHeader />
            <AddApp />
          </>
        }
      />

      {/* <Route path="/login" element={<Login />} /> */}

      {/* Talent Pool Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
         
            <TalentPoolDashboard />
         
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="assignments" element={<AssignmentManager />} />
        <Route path="addapp" element={<AddApp />} />
        <Route path="applicants" element={<ApplicantDetails />} />
        <Route path="applicants/:id" element={<ApplicationReview />} />
        <Route path="jobs" element={<JobList />} />
        <Route path="jobs/create" element={<NewJob />} />
        <Route path="jobs/edit/:id" element={<NewJob />} />
        <Route path="jobs/:id" element={<JobDetail />} />
      </Route>

      {/* Application Success Route */}
      <Route
        path="/application-success"
        element={
          <>
            <PublicHeader />
            <AppSuccessful />
          </>
        }
      />

          
        </Routes>
        <Footer />        
      </div>
    </Router>
  );
}

export default App;
