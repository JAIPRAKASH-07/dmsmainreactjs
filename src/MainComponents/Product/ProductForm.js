import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

function ProductForm() {
  const [formData, setFormData] = useState({
    supplierPrinciple: "",
    productName: "",
    productCode: "",
    batchNumber: "",
    dp: "",
    mrp: "",
    expiryDate: "",
    quantity: "",
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
    console.log(formData);
  };

  return (
    <Container>
      <h3 className="text-center my-4">Product Form</h3>
      <Form onSubmit={handleSubmit}>
        {/* Supplier/Principle */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formSupplierPrinciple">
            <Form.Label>Supplier/Principle</Form.Label>
            <Form.Select
              name="supplierPrinciple"
              value={formData.supplierPrinciple}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="BIORAD MEDISYS PVT LTD">BIORAD MEDISYS PVT LTD</option>
              {/* Add other options as needed */}
            </Form.Select>
          </Form.Group>
        </Row>

        {/* Product Name and Product Code */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Product Name"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formProductCode">
            <Form.Label>Product Code</Form.Label>
            <Form.Control
              type="text"
              name="productCode"
              value={formData.productCode}
              onChange={handleChange}
              placeholder="Product Code"
            />
          </Form.Group>
        </Row>

        {/* Batch Number, DP, and MRP */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formBatchNumber">
            <Form.Label>Batch Number</Form.Label>
            <Form.Control
              type="text"
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleChange}
              placeholder="Batch Number"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formDP">
            <Form.Label>DP</Form.Label>
            <Form.Control
              type="text"
              name="dp"
              value={formData.dp}
              onChange={handleChange}
              placeholder="DP"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formMRP">
            <Form.Label>MRP</Form.Label>
            <Form.Control
              type="text"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              placeholder="MRP"
            />
          </Form.Group>
        </Row>

        {/* Expiry Date and Quantity */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formExpiryDate">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
            />
          </Form.Group>
        </Row>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ProductForm;
