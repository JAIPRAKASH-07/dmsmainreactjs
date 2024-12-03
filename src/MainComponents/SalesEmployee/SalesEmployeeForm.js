import React, { useState } from 'react';


function SalesEmployeeForm() {
  const [formData, setFormData] = useState({
    supplierPrinciple: '',
    productName: '',
    productCode: '',
    batchNumber: '',
    dp: '',
    mrp: '',
    expiryDate: '',
    quantity: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to server
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Supplier/Principle:</label>
        <select name="supplierPrinciple" value={formData.supplierPrinciple} onChange={handleChange}>
          <option value="">Choose...</option>
          {/* Add options for suppliers/principals */}
          <option value="BIORAD MEDISYS PVT LTD">BIORAD MEDISYS PVT LTD</option>
          {/* Add other options as needed */}
        </select>
      </div>

      <div>
        <label>Product Name:</label>
        <input type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="Product Name" />

        <label>Product Code:</label>
        <input type="text" name="productCode" value={formData.productCode} onChange={handleChange} placeholder="Product Code" />
      </div>

      <div>
        <label>Batch Number:</label>
        <input type="text" name="batchNumber" value={formData.batchNumber} onChange={handleChange} placeholder="Batch Number" />

        <label>DP:</label>
        <input type="text" name="dp" value={formData.dp} onChange={handleChange} placeholder="DP" />

        <label>MRP:</label>
        <input type="text" name="mrp" value={formData.mrp} onChange={handleChange} placeholder="MRP" />
      </div>

      <div>
        <label>Expiry Date:</label>
        <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />

        <label>Quantity:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default SalesEmployeeForm;