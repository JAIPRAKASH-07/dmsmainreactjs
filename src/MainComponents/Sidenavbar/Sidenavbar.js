
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CategoryIcon from "@mui/icons-material/Category";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
//import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";

// import the table components
import Hospitals from '../Hospitals/Hospitals';
import Doctors from '../Doctors/Doctors';
import Categorys from '../Categorys/Categorys';
import Principles from '../Principles/Principles';
import Product from '../Product/Product';
import Departments from '../Departments/Departments';
//import SalesEmployee from '../SalesEmployee/SalesEmployee';
import CaseTable from "../Case_creation/CaseTable";
import CaseDetailsModal from "../Case_creation/CaseDetailsModal";
// import all forms

import EditDoctors from '../Doctors/EditDoctors';
import DoctorsForm from '../Doctors/DoctorsForm';
import PrinciplesForm from '../Principles/PrincipleForm';
import ProductForm from '../Product/ProductForm';
import HospitalsForm from "../Hospitals/HospitalsForm";
import DepartmentsForm from '../Departments/DepartmentsForm';
//import Editdepartment from "../Departments/Editdepartment";
import Editproduct from "../Product/Editproduct";
import Edithospits from "../Hospitals/Edithospits";
//  import SalesEmployeeForm from '../SalesEmployee/SalesEmployeeForm';
import CaseForm from "../Case_creation/CaseForm";
import './Sidenavbar.css'

const Sidenavbar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isMouseOverSidebar, setIsMouseOverSidebar] = useState(false);

  const handleMouseEnter = () => setIsMouseOverSidebar(true);
  const handleMouseLeave = () => setIsMouseOverSidebar(false);

  useEffect(() => {
    if (!isMouseOverSidebar) {
      setSidebarVisible(false);
    }
  }, [isMouseOverSidebar]);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="d-flex flex-column">
      {/* Navigation bar */}
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-primary full-width-navbar ${
          isSidebarVisible ? "shifted" : ""
        }`}
      >
        <div className="container-fluid">
          {/* Sidebar toggle button */}
          {!isSidebarVisible && (
            <span
              className="navbar-toggler-icon me-2"
              role="button"
              aria-expanded={isSidebarVisible}
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            ></span>
          )}

          {/* Brand name */}
          <a className="navbar-brand me-auto">
            Matryx Medisys
            <span className="d-block fs-6 text-warning">
              Medical Excellence
            </span>
          </a>

          {/* Search form */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          {/* User action icons */}
          <div className="d-flex align-items-center ms-3">
            <Link
              to="mailto:aravindgowda43@gmail.com"
              className="text-white"
              aria-label="Email"
            >
              <i className="bi bi-envelope fs-4 mx-2"></i>
            </Link>
            <Link to="#" className="text-white" aria-label="Notifications">
              <i className="bi bi-bell fs-4 mx-2"></i>
            </Link>
            <Link to="#" className="text-white" aria-label="Profile">
              <i className="bi bi-person fs-4 mx-2"></i>
            </Link>
          </div>
        </div>
      </nav>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div
          className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}
          id="sidebar"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className="collapse-btn"
            id="collapse-btn"
            aria-label="Collapse Sidebar"
            onClick={toggleSidebar}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <br />
          <br />
          <br />

          <ul className="nav flex-column">
            {/* Navigation links */}
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/dashboard">
                <DashboardIcon />
                <span id="spaceBetweenIconHeading"> Dashboard </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/CaseTable">
                <AssignmentIcon />
                <span id="spaceBetweenIconHeading"> Case creation </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/hospitals">
                <LocalHospitalIcon />
                <span id="spaceBetweenIconHeading"> Hospitals </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/doctors">
                <PeopleAltIcon />
                <span id="spaceBetweenIconHeading"> Doctors</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/categorys">
                <CategoryIcon />
                <span id="spaceBetweenIconHeading"> Categorys </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/principles">
                <BusinessCenterIcon />
                <span id="spaceBetweenIconHeading"> Principles</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/product">
                <ShoppingCartIcon />
                <span id="spaceBetweenIconHeading"> Product </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/departments">
                <BusinessIcon />
                <span id="spaceBetweenIconHeading"> Departments </span>
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link className="nav-link text-dark" to="/salesemployee">
                <PersonIcon />
                <span id="spaceBetweenIconHeading"> Sales Employee </span>
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Main content area */}
        <main
          className={`main-content flex-grow-1 p-4 ${
            isSidebarVisible ? "" : "full-width"
          }`}
          id="main-content"
        >
          <Routes>
            {/* Define routes for the application */}

            {/* Route for CaseCreation */}
            <Route path="/CaseTable" element={<CaseTable />} />
            <Route path="/Case-Form" element={<CaseForm />} />
            <Route path="/CaseDetailsModal" element={<CaseDetailsModal/>} />

            {/* Route for Hospitals */}
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/hospitals/*" element={<HospitalsForm />} />
            <Route path="/Edithospits/:id" element={<Edithospits />} />

            {/* Route for Doctors */}
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/*" element={<DoctorsForm />} />
            <Route path="/EditDoctors/:id" element={<EditDoctors />} />

            {/* Route for Categorys */}
            <Route path="/categorys" element={<Categorys />} />

            {/* Route for Principles */}
            <Route path="/principles" element={<Principles />} />
            <Route path="/principles/*" element={<PrinciplesForm />} />

            {/* Route for Products */}
            <Route path="/product" element={<Product />} />
            <Route path="/product/*" element={<ProductForm />} />
            <Route path="/Editproduct/:id" element={<Editproduct />} />

            {/* Route for Departments */}
            <Route path="/departments/" element={<Departments />} />
            <Route path="/departments/*" element={<DepartmentsForm />} />
            {/* <Route path="/Editdepartment/:id" element={<Editdepartment />} /> */}

            {/* Route for Sales Employee */}
            {/* <Route path="/salesemployee" element={<SalesEmployee />} />
            <Route path="/salesemployee/*" element={<SalesEmployeeForm />} />
            <Route path="/EditSalesEmployee/:id" element={<EditSalesEmployee />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Sidenavbar


