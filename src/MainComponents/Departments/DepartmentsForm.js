import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function DepartmentForm() {
  const [departmentname, setdepartmentname] = useState(""); // Default value set
  const [Employee, setEmployee] = useState({
    Employeename: "",
    EmployeePhone: "",
    selectDepartment: [],
    Target: "",
  });

  // Handler for department selection
  const Handlechaged = (e) => {
    setdepartmentname(e.target.value); // Update department name
    console.log("Selected Department:", e.target.value);
  };

  // Generic handler for Employee input fields
  const Handlechanged = (en) => {
    const { name, value } = en.target; // Get field name and value
    setEmployee((prevState) => ({
      ...prevState, // Keep previous fields intact
      [name]: value, // Update the specific field
    }));
  };

  const HandleClick = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        { departmentname }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting department:", error);
    }
  };

  const HandleClickAll = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        Employee
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting employee:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="departmentName">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department name"
                value={departmentname}
                onChange={Handlechaged}
              />
            </Form.Group>
          </Col>
          <Col className="d-flex align-items-end">
            <Button variant="primary" onClick={HandleClick} type="button">
              Add Department
            </Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="employeeName">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter employee name"
                name="Employeename"
                value={Employee.Employeename}
                onChange={Handlechanged}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="employeePhone">
              <Form.Label>Employee Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter employee phone"
                name="EmployeePhone"
                value={Employee.EmployeePhone}
                onChange={Handlechanged}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="selectDepartment">
              <Form.Label>Select Department</Form.Label>
              <Form.Control
                as="select"
                multiple
                value={Employee.selectDepartment}
                onChange={(e) => {
                  const options = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setEmployee((prev) => ({
                    ...prev,
                    selectDepartment: options,
                  }));
                }}
              >
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="target">
              <Form.Label>Target</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter target"
                name="Target"
                value={Employee.Target}
                onChange={Handlechanged}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center">
            <Button variant="success" onClick={HandleClickAll} type="button">
              Submit Employee 
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default DepartmentForm;
