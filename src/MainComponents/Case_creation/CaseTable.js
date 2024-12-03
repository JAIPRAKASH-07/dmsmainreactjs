import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CaseCreation.css"; // Make sure to include the CSS file for styling
import CaseDetailsModal from "./CaseDetailsModal";
 
const CaseTable = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState({
    patientName: "",
    doctorName: "",
    hospitalName: "",
    categoryName: "",
    subCategoryName: "",
    invoiceNumber: "",
    dcNumber: "",
  });
  const [currentPage, setCurrentPage] = useState(1);  
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  const [isModalOpen, setModalOpen] = useState(false);


  if(selectedHospital){
    console.log(selectedHospital);
    
  }

   

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://77.37.45.2:8091/api/v1/surgeryfilling/fetchallsurgeryfillings"
      );
      //console.log(response.data); // Check data structure in console
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

const Navigate = useNavigate()


  const goToCaseForm = () => {
    Navigate("/case-form");
  };

   

  
    if (selectedHospital && isEditing) {
      console.log(selectedHospital);
      navigate("/case-form", { state: selectedHospital });
    }

   
    
  

  const handleSearch = (e, field) => {
    setSearchTerm({
      ...searchTerm,
      [field]: e.target.value,
    });
  };

  const filteredHospitals = hospitals.filter((hospital) => {
    const isSearchMatch =
      (hospital.patientName &&
        hospital.patientName
          .toLowerCase()
          .includes(searchTerm.patientName.toLowerCase())) ||
      (hospital.surgeryDoctor?.name &&
        hospital.surgeryDoctor.name
          .toLowerCase()
          .includes(searchTerm.doctorName.toLowerCase())) ||
      (hospital.surgeryHospital?.name &&
        hospital.surgeryHospital.name
          .toLowerCase()
          .includes(searchTerm.hospitalName.toLowerCase())) ||
      (hospital.category?.name &&
        hospital.category.name
          .toLowerCase()
          .includes(searchTerm.categoryName.toLowerCase())) ||
      (hospital.subCategory?.name &&
        hospital.subCategory.name
          .toLowerCase()
          .includes(searchTerm.subCategoryName.toLowerCase())) ||
      (hospital.invoiceNumber &&
        hospital.invoiceNumber
          .toLowerCase()
          .includes(searchTerm.invoiceNumber.toLowerCase())) ||
      (hospital.dcNumber &&
        hospital.dcNumber
          .toLowerCase()
          .includes(searchTerm.dcNumber.toLowerCase()));

    const isDateInRange =
      (!fromDate || new Date(hospital.surgeryDate) >= new Date(fromDate)) &&
      (!toDate || new Date(hospital.surgeryDate) <= new Date(toDate));

    return isSearchMatch && isDateInRange;
  });

  const totalItems = filteredHospitals.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const paginatedHospitals = filteredHospitals.slice(
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
          <div id="dateFilters">
            {/* <label>
              From Date:
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </label> */}
            {/* <label>
              To Date:
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </label> */}
          </div>

          <div id="pageHeading">
            <h1>Cases List</h1>
          </div>

          <div id="buttons">
            <button
              id="addh"
              onClick={goToCaseForm}
              className="btn btn-primary me-md-2"
            >
              Add Cases
            </button>
            <button type="button" className="btn btn-success">
              Export to Excel
            </button>
          </div>
        </div>

        <br />
        <table
          className="table-change"
          id="hospital-table"
        >
          <thead style={{ backgroundColor: "#007bff", color: "white" }}>
            <tr id="tableHeading">
              <th>S.No</th>
              <th>Surgery Date</th>
              <th>Hospital Name</th>
              <th>Doctor Name</th>
              <th>Patient Name</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>DP Value</th>
              <th>Selling Price</th>
              <th>Actions</th>
            </tr>
            <tr>
              <th></th>
              <th>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  onChange={(e) => handleSearch(e, "patientName")}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  onChange={(e) => handleSearch(e, "hospitalName")}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  onChange={(e) => handleSearch(e, "doctorName")}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  onChange={(e) => handleSearch(e, "patientName")}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  onChange={(e) => handleSearch(e, "categoryName")}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  onChange={(e) => handleSearch(e, "subCategoryName")}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  onChange={(e) => handleSearch(e, "invoiceNumber")}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  onChange={(e) => handleSearch(e, "dcNumber")}
                />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedHospitals.map((hospital, index) => (
              <tr key={hospital.id}  onDoubleClick={() => {
                setSelectedHospital(hospital);
                setModalOpen(true);
              }}
>
                <td className="text-center">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="text-center">{hospital.surgeryDate || "N/A"}</td>
                <td className="text-center">
                  {hospital.surgeryHospital?.name || "N/A"}
                </td>
                <td className="text-center">
                  {hospital.surgeryDoctor?.name || "N/A"}
                </td>
                <td className="text-center">{hospital.patientName || "N/A"}</td>
                <td className="text-center">
                  {hospital.category?.name || "N/A"}
                </td>
                <td className="text-center">
                  {hospital.subCategory?.name || "N/A"}
                </td>
                <td className="text-center">
                  {hospital.surgeryProductsUsed?.[0]?.dpvalue || "N/A"}
                </td>
                <td className="text-center">
                  {hospital.surgeryProductsUsed?.[0]?.sellingPrice || "N/A"}
                </td>
                <div className>
                <td className="text-center">
                  <i
                    className="fas fa-edit icon edit"
                    title="Edit"
                    onClick={() => {
                      setIsEditing(true);
                      setSelectedHospital(hospital); // This will set the selected hospital
                      //goToEditForm(); // This will navigate to /case-form with the hospital data
                    }}
                  ></i>
                  <span className="vertical-divider"></span>
                  <i
                    className="fas fa-trash-alt icon delete"
                    title="Delete"
                  ></i>
                </td>
                </div>
              </tr>
            ))}
          </tbody>
        </table>



        <CaseDetailsModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} data={selectedHospital} />

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

export default CaseTable;
