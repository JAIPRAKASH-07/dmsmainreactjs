import React, { useState } from 'react';
import { Form, Button, FormGroup, FormControl, FormLabel, Row, Col } from 'react-bootstrap';

function DoctorsForm() {
  const [formData, setFormData] = useState({
    doctorName: '',
    hospital: '',
    committedCases: '',
    remarks: '',
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
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <FormLabel>Doctor Name:</FormLabel>
            <FormControl
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Ex: Dr.SaiPavan"
            />
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <FormLabel>Select Hospital:</FormLabel>
            <FormControl
              as="select"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="Apollo Hospital">Apollo Hospital</option>
              {/* Add other hospitals as needed */}
            </FormControl>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <FormLabel>Committed Cases:</FormLabel>
            <FormControl
              type="text"
              name="committedCases"
              value={formData.committedCases}
              onChange={handleChange}
              placeholder="Ex: Committed cases by doctor"
            />
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <FormLabel>Remarks:</FormLabel>
            <FormControl
              as="textarea"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Ex: Remarks"
            />
          </FormGroup>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default DoctorsForm;
