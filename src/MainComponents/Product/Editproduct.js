import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

function Editproduct() {
  const { id } = useParams();

  const [EditformData, setEditformData] = useState({
    principle: "",
    productName: "",
    productCode: "",
    batchNumber: "",
    dp: "",
    mrp: "",
    expiryDate: "",
    quantity: "",
  });

  useEffect(() => {
    const fetchallproducts = async () => {
      try {
        const response = await axios.get(
          `http://77.37.45.2:8091/api/v1/product/fetchproduct/${id}`
        );
        console.log(response.data);
        setEditformData(response.data);
      } catch (err) {
        console.error("Error fetching product data:", err);
      }
    };
    fetchallproducts();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditformData({
      ...EditformData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(EditformData);
  };

  return (
    <Container>
      <h3 className="text-center my-4">Edit Product</h3>
      <Form onSubmit={handleSubmit}>
        {/* Supplier/Principle */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formSupplierPrinciple">
            <Form.Label>Supplier/Principle</Form.Label>
            <Form.Select
              name="principle"
              value={EditformData.principle}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="BIORAD MEDISYS PVT LTD">BIORAD MEDISYS PVT LTD</option>
              {/* Add more options as required */}
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
              value={EditformData.name}
              onChange={handleChange}
              placeholder="Product Name"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formProductCode">
            <Form.Label>Product Code</Form.Label>
            <Form.Control
              type="text"
              name="productCode"
              value={EditformData.productCode}
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
              value={EditformData.batchCode}
              onChange={handleChange}
              placeholder="Batch Number"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formDP">
            <Form.Label>DP</Form.Label>
            <Form.Control
              type="text"
              name="dp"
              value={EditformData.dpvalue}
              onChange={handleChange}
              placeholder="DP"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formMRP">
            <Form.Label>MRP</Form.Label>
            <Form.Control
              type="text"
              name="mrp"
              value={EditformData.mrp}
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
              value={EditformData.expiryDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={EditformData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
            />
          </Form.Group>
        </Row>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
}

export default Editproduct;
