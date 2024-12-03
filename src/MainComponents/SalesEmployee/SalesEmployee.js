import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SalesEmployee = () => {
  const [SalesEmployees, setSalesEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
 
  const navigate = useNavigate(); 

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page


  const [isEditing, setIsEditing] = useState(false);
  const [selectedSalesEmployee, setSelectedSalesEmployee] = useState(null);
   
  const handleNavigate = () => {
    navigate("./SalesEmployeeForm");
  };
  const fetchSalesEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://77.37.45.2:8091/api/v1/internalemployee/fetchallinternalemployees"
      );
      setSalesEmployees(response.data.reverse());
      setError("");
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesEmployees();
  }, []);


  const handleClose = (shouldRefetch = false) => {
    setIsEditing(false);
     
  };

 

  const filteredSalesEmployees = SalesEmployees.filter((SalesEmployee) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      (SalesEmployee.name &&
        SalesEmployee.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (SalesEmployee.email &&
        SalesEmployee.email.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (SalesEmployee.pincode &&
        SalesEmployee.pincode.toString().includes(lowerCaseSearchTerm)) // Assuming pincode is a number
    );
  });

  // Pagination Logic
  const totalItems = filteredSalesEmployees.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const paginatedSalesEmployees = filteredSalesEmployees.slice(
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
            <h1>Employee Table </h1>
          </div>

          <div id="buttons">
            <button
              id="addh"
              onClick={handleNavigate}
              className="btn btn-primary me-md-2"
            >
              Add Employee
            </button>
            <button type="button" className="btn btn-success">
              Export to Excel
            </button>
          </div>
        </div>

        <br />
        {/* Table for displaying SalesEmployee data */}
        <table
          className="table table-striped table-bordered"
          id="SalesEmployee-table"
        >
          <thead>
            <tr id="tableHeading">

              <th>Sl.No</th>
              <th>SalesEmployee</th>
              <th>email</th>
              <th>Phone</th>
              <th> address</th>
              <th>Actions</th>
            </tr>

        </thead>
        <tbody>
  {paginatedSalesEmployees.map((SalesEmployee, index) => (
    <tr key={SalesEmployee.id}>
      <td className="text-center">
        {(currentPage - 1) * rowsPerPage + index + 1}
      </td>
      <td className="text-center">{SalesEmployee.name || "N/A"}</td>
      <td className="text-center">{SalesEmployee.targets || "N/A"}</td>
      <td className="text-center">{SalesEmployee.phonenumber || "N/A"}</td>
      <td className="text-center">
        {typeof SalesEmployee.department === "object" && SalesEmployee.department
          ? SalesEmployee.department.name || "N/A"
          : SalesEmployee.department || "N/A"}
      </td>
      <td>
        {/* Edit icon */}
        <i
          className="fas fa-edit icon edit"
          title="Edit"
          onClick={() => {
            setIsEditing(true);
            navigate(`/EditSalesEmployee/${SalesEmployee.id}`)
            setSelectedSalesEmployee(SalesEmployee);
            console.log(SalesEmployee);
          }}
        ></i>
        <span className="vertical-divider"></span>
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

export default SalesEmployee;



