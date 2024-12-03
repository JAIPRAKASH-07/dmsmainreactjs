import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Editdepartment from "./editdepartment";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("./DepartmentsForm");
  };

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://77.37.45.2:8091/api/v1/department/fetchalldepartments"
      );
      setDepartments(response.data.reverse());
      setError("");
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleClose = () => {
    setIsEditing(false);
  };

  const filteredDepartments = departments.filter((department) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      (department.name && department.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (department.email && department.email.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (department.phone && department.phone.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (department.state?.name && department.state.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (department.city?.name && department.city.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (department.pincode && department.pincode.toString().includes(lowerCaseSearchTerm))
    );
  });

  const totalItems = filteredDepartments.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const displayStart = (currentPage - 1) * rowsPerPage + 1;
  const displayEnd = Math.min(currentPage * rowsPerPage, totalItems);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
            <h1>Departments List</h1>
          </div>

          <div id="buttons">
            <button
              id="addh"
              onClick={handleNavigate}
              className="btn btn-primary me-md-2"
            >
              Add Department
            </button>
            <button type="button" className="btn btn-success">
              Export to Excel
            </button>
          </div>
        </div>

        <br />

        <table className="table table-striped table-bordered" id="departments-table">
          <thead>
            <tr id="tableHeading">
             
              <th>Sl.No</th>
              <th>Department</th>
              <th>Employee</th>
              <th>Employee Phone</th>
              <th>Targets</th>
             <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDepartments.map((department, index) => (
              <tr key={department.id}>
                <td className="text-center">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="text-center">{department.name}</td>
                <td className="text-center">{department.email}</td>
                <td className="text-center">{department.committedCases}</td>
                <td className="text-center">{department.phoneNumber}</td>
               
                <td className="text-center">
                  <i
                    className="fas fa-edit icon edit"
                    title="Edit"
                    onClick={() => {
                      setIsEditing(true);
                      setSelectedDepartment(department);
                      navigate(`/Editdepartment/${department.id}`, { state: departments });
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
                setCurrentPage(1);
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

export default Departments;
