import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Principles = () => {
  const [principles, setprinciples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
 
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("./PrinciplesForm");
  };


  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page


  const [isEditing, setIsEditing] = useState(false);
  const [selectedprinciple, setSelectedprinciple] = useState(null);
   

  const fetchprinciples = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://77.37.45.2:8091/api/v1/principle/fetchallprinciples"
      );
      setprinciples(response.data.reverse());
      setError("");
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchprinciples();
  }, []);


  const handleClose = (shouldRefetch = false) => {
    setIsEditing(false);
     
  };

 

  const filteredprinciples = principles.filter((principle) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      (principle.name &&
        principle.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
     
      (principle.pincode &&
        principle.pincode.toString().includes(lowerCaseSearchTerm)) // Assuming pincode is a number
    );
  });

  // Pagination Logic
  const totalItems = filteredprinciples.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const paginatedprinciples = filteredprinciples.slice(
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
            <h1> Principles Table </h1>
          </div>

          <div id="buttons">
            <button
              id="addh"
              onClick={handleNavigate}
              className="btn btn-primary me-md-2"
            >
              Add  Principles
            </button>
             
          </div>
        </div>

        <br />
        {/* Table for displaying principle data */}
        <table
          className="table table-striped table-bordered"
          id="principle-table"
        >
          <thead>
            <tr id="tableHeading">
              <th>Sl.No</th>
              <th>Principles Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedprinciples.map((principle, index) => (
              <tr key={principle.id}>

                <td class="text-center">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>

                <td class="text-center">{principle.name}</td>

                
                <td>
                  {/* Edit icon */}
                  <i
                    className="fas fa-edit icon edit"
                    title="Edit"
                    onClick={() => {
                      setIsEditing(true);
                      navigate(`/EditPrinciples/${principle.id}`)
                      setSelectedprinciple(principle);
                      console.log(principle);
                      // Set the selected principle data
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

export default Principles;

