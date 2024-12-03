import React, { useEffect, useState } from "react";
import axios from "axios";
 
import { useNavigate } from "react-router-dom";
 
 

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
 


  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);  

  const [isEditing, setIsEditing] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("./hospitalsForm");
  };


  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        " http://77.37.45.2:8091/api/v1/hospitalregistration/fetchallhospitalregistrations"
      );
      setHospitals(response.data.reverse());
      setError("");
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);


  const handleClose = (shouldRefetch = false) => {
    setIsEditing(false);
     
  };


   

  const filteredHospitals = hospitals.filter((hospital) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      (hospital.name &&
        hospital.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (hospital.email &&
        hospital.email.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (hospital.phone &&
        hospital.phone.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (hospital.address &&
        hospital.address.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (hospital.location &&
        hospital.location.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (hospital.state &&
        hospital.state.name &&
        hospital.state.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (hospital.city &&
        hospital.city.name &&
        hospital.city.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (hospital.pincode &&
        hospital.pincode.toString().includes(lowerCaseSearchTerm)) // Assuming pincode is a number
    );
  });

  // Pagination Logic
  const totalItems = filteredHospitals.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const paginatedHospitals = filteredHospitals.slice(
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
            <h1>Hospital List </h1>
          </div>

          <div id="buttons">
            <button
              id="addh"
              onClick={handleNavigate}
              className="btn btn-primary me-md-2"
            >
              Add Hospital
            </button>
            <button type="button" className="btn btn-success">
              Export to Excel
            </button>
          </div>
        </div>

        <br />
        {/* Table for displaying hospital data */}
        <table
          className="table table-striped table-bordered"
          id="hospital-table"
        >
          <thead>
            <tr id="tableHeading">
              
              <th>Sl.No</th>
              <th>Hospital Name</th>
              <th>Address </th>
              <th>location </th>
              <th>District</th>
              <th>State</th>
              <th>Pin-code</th>
              <th>Actions</th>
            </tr>
            
          </thead>
          <tbody>
            {paginatedHospitals.map((hospital, index) => (
              <tr key={hospital.id}>
                <td class="text-center">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td class="text-center">{hospital.name}</td>
                <td class="text-center">{hospital.address}</td>
                <td class="text-center">{hospital.location}</td>
               
                <td class="text-center">{hospital.pincode}</td>
                <td class="text-center">
                  {hospital.state ? hospital.state.name : "N/A"}
                </td>
                <td class="text-center">
                  {hospital.city ? hospital.city.name : "N/A"}
                </td>
             
                <td>
                  {/* Edit icon */}
                  <i
                    className="fas fa-edit icon edit"
                    title="Edit"
                    onClick={() => {
                      setIsEditing(true);
                      navigate(`/Edithospits/${hospital.id}`)
                      setSelectedHospital(hospital);
                      console.log(hospital);
                      // Set the selected hospital data
                    }}
                  ></i>

                   

                  {/* Vertical Divider */}
                  <span className="vertical-divider"></span>

                  {/* Delete icon */}
                  <i
                    className="fas fa-trash-alt icon delete"
                    title="Delete"
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
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

export default Hospitals;
