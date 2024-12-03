import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";



const Doctors = () => {
  const [doctorss, setdoctorss] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");



  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [isEditing, setIsEditing] = useState(false);
  const [selecteddoctors, setSelecteddoctors] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("./DoctorsForm");
  };


  const fetchdoctorss = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://77.37.45.2:8091/api/v1/doctorregistration/fetchalldoctorregistrations"
      );
      setdoctorss(response.data.reverse());
      setError("");
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdoctorss();
  }, []);


  const handleClose = (shouldRefetch = false) => {
    setIsEditing(false);

  };




  const filtereddoctorss = doctorss.filter((doctors) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      (doctors.name &&
        doctors.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (doctors.email &&
        doctors.email.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (doctors.phone &&
        doctors.phone.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (doctors.address &&
        doctors.address.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (doctors.location &&
        doctors.location.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (doctors.state &&
        doctors.state.name &&
        doctors.state.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (doctors.city &&
        doctors.city.name &&
        doctors.city.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (doctors.pincode &&
        doctors.pincode.toString().includes(lowerCaseSearchTerm)) // Assuming pincode is a number
    );
  });

  // Pagination Logic
  const totalItems = filtereddoctorss.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const paginateddoctorss = filtereddoctorss.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const displayStart = (currentPage - 1) * rowsPerPage + 1;
  const displayEnd = Math.min(currentPage * rowsPerPage, totalItems);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="tableid" style={{ display: "block" }}>
      <div className="table-container">


        <div id="mainBar">
          <div id="searchBar">
            <input
              type="text"
              id="searchBarInput"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              placeholder="Search..."
            />
          </div>

          <div id="pageHeading">
            <h1>Doctors List </h1>
          </div>

          <div id="buttons">
            <button
              id="addh"
              onClick={handleNavigate}
              className="btn btn-primary me-md-2"
            >
              Add Doctors
            </button>
            <button type="button" className="btn btn-success">
              Export to Excel
            </button>
          </div>
        </div>

        <br />
        {/* Table for displaying doctors data */}
        <table
          className="table table-striped table-bordered"
          id="doctors-table"
        >
          <thead>
            <tr id="tableHeading">
              <th>Sl.No</th>
              <th>Doctors Name</th>
              <th>Email</th>
              <th>Committed case</th>
              <th>Phone</th>
              <th>Selected-Hospital</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>
            {paginateddoctorss.map((doctor, index) => (
              <tr key={doctor.id}>
                <td className="text-center">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="text-center">{doctor.name}</td>
                <td className="text-center">{doctor.email}</td>
                <td className="text-center">{doctor.committedCases}</td>
                <td className="text-center">{doctor.phoneNumber}</td>

                <td style={{ display: "block" }}>
                  {doctor.hospitalRegistrations.length > 0 ? doctor.hospitalRegistrations.map((hospital) => ` ${hospital.name} - ${hospital.location}`).join(', ') : 'N/A'}
                </td>

                <td className="text-center">
                  <i
                    className="fas fa-edit icon edit"
                    title="Edit"
                    onClick={() => {
                      setIsEditing(true);
                      setSelecteddoctors(doctor);
                      navigate(`/EditDoctors/${doctor.id}`)
                      console.log(doctor);
                    }}
                  ></i>
                  <span className="vertical-divider"></span>
                  <i className="fas fa-trash-alt icon delete" title="Delete"></i>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
        <div className="pagination-controls">
          <div className="rows-per-page">
            Rows per page:
            <select
              style={{ border: "0px" }}
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page on rows-per-page change
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={totalItems}>All</option>
            </select>
          </div>

          <div className="pagination-info">
            {displayStart}-{displayEnd} of {totalItems}
          </div>

          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
