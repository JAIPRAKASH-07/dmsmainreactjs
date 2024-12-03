import React, { useEffect, useState } from "react";
import axios from "axios";
 
import { useNavigate } from "react-router-dom";
 
 

const Product = () => {
  const [Product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
 


  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);  

  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("./ProductForm");
  };


  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://77.37.45.2:8091/api/v1/product/fetchallproducts"
      );
      setProduct(response.data.reverse());
      setError("");
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);


  const handleClose = (shouldRefetch = false) => {
    setIsEditing(false);
     
  };


   

  const filteredProduct = Product.filter((Product) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      (Product.name &&
        Product.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (Product.productCode &&
        Product.productCode.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (Product.batchCode &&
        Product.batchCode.toString().includes(lowerCaseSearchTerm)) ||
       (Product.dpvalue &&
       Product.dpvalue.toString().includes(lowerCaseSearchTerm)) ||
      (Product.quantity &&
        Product.quantity.toString().includes(lowerCaseSearchTerm)) // Assuming pincode is a number
    );
  });

  // Pagination Logic
  const totalItems = filteredProduct.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const paginatedProduct = filteredProduct.slice(
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
            <h1>Products List </h1>
          </div>

          <div id="buttons">
            <button
              id="addh"
              onClick={handleNavigate}
              className="btn btn-primary me-md-2"
            >
              Add Product
            </button>
            <button type="button" className="btn btn-success">
              Export to Excel
            </button>
          </div>
        </div>

        <br />
        {/* Table for displaying Product data */}
        <table
          className="table table-striped table-bordered"
          id="Product-table"
        >
          <thead>
            <tr id="tableHeading">
              <th>Sl.No</th>
              <th>Principle </th>
              <th>Product Name</th>
              <th>Product Code</th>
              <th>Batch Number</th>
              <th>DP Value</th>
              <th>MRP</th>
              <th>Expiry Date</th>
              <th> Quantity</th>
              <th>Actions</th>
            </tr>
            
          </thead>
          <tbody>
            {paginatedProduct.map((Product, index) => (
              <tr key={Product.id}>
                <td class="text-center">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td class="text-center">{Product.principle?.name || "N/A"}</td>
                <td class="text-center">{Product.name}</td>
                <td class="text-center">{Product.batchCode}</td>
                <td class="text-center">{Product.dpvalue}</td>
                <td class="text-center">{Product.expiryDate}</td>
                <td class="text-center">{Product.mrp}</td>
                <td class="text-center">{Product?.quantity|| "N/A"}</td>
                
                <td>
                  {/* Edit icon */}
                  <i
                    className="fas fa-edit icon edit"
                    title="Edit"
                    onClick={() => {
                      setIsEditing(true);
                      setSelectedProduct(Product);
                      navigate(`/Editproduct/${Product.id}`)
                      console.log(Product);
                      // Set the selected Product data
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

export default Product;
