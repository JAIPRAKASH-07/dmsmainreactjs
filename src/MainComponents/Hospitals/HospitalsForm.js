// import React, { useState } from 'react';

// function HospitalsForm() {
//   const [formData, setFormData] = useState({
//     hospitalName: '',
//     hospitalEmail: '',
//     hospitalPhone: '',
//     address: '',
//     location: '',
//     state: '',
//     city: '',
//     pincode: '',
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission here, e.g., send data to server
//     console.log(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Hospital Name:</label>
//         <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} placeholder="Ex: Apollo Hospital" />
//       </div>

//       <div>
//         <label>Hospital Email:</label>
//         <input type="email" name="hospitalEmail" value={formData.hospitalEmail} onChange={handleChange} placeholder="Ex: apollohospital@gmail.com" />

//         <label>Hospital Phone:</label>
//         <input type="tel" name="hospitalPhone" value={formData.hospitalPhone} onChange={handleChange} placeholder="Ex: +91 XXXXXXXXXX" />
//       </div>

//       <div>
//         <label>Address:</label>
//         <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Ex: 154, Bannerghatta Rd, Krishnaraju Layout, Amalodbhavi Nagar" />
//       </div>

//       <div>
//         <label>Location:</label>
//         <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Ex: Bannerghatta" />
//       </div>

//       <div>
//         <label>State:</label>
//         <select name="state" value={formData.state} onChange={handleChange}>
//           <option value="">Choose...</option>
//           {/* Add options for states */}
//           <option value="Karnataka">Karnataka</option>
//           {/* Add other states as needed */}
//         </select>

//         <label>City:</label>
//         <select name="city" value={formData.city} onChange={handleChange}>
//           <option value="">Choose...</option>
//           {/* Add options for cities */}
//           <option value="Bengaluru">Bengaluru</option>
//           {/* Add other cities as needed */}
//         </select>

//         <label>Pincode:</label>
//         <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Ex: 560055" />
//       </div>

//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default HospitalsForm;


import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function HospitalsForm() {
  const [formData, setFormData] = useState({
    hospitalName: '',
    hospitalEmail: '',
    hospitalPhone: '',
    address: '',
    location: '',
    state: '',
    city: '',
    pincode: '',
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
    <Container className="mt-5">
      <h2 className="text-center mb-4">Hospital Registration Form</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="hospitalName">
              <Form.Label>Hospital Name:</Form.Label>
              <Form.Control
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                placeholder="Ex: Apollo Hospital"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="hospitalEmail">
              <Form.Label>Hospital Email:</Form.Label>
              <Form.Control
                type="email"
                name="hospitalEmail"
                value={formData.hospitalEmail}
                onChange={handleChange}
                placeholder="Ex: apollohospital@gmail.com"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="hospitalPhone">
              <Form.Label>Hospital Phone:</Form.Label>
              <Form.Control
                type="tel"
                name="hospitalPhone"
                value={formData.hospitalPhone}
                onChange={handleChange}
                placeholder="Ex: +91 XXXXXXXXXX"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="location">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ex: Bannerghatta"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="address">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ex: 154, Bannerghatta Rd, Krishnaraju Layout, Amalodbhavi Nagar"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="state">
              <Form.Label>State:</Form.Label>
              <Form.Select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Choose...</option>
                <option value="Karnataka">Karnataka</option>
                {/* Add other states as needed */}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="city">
              <Form.Label>City:</Form.Label>
              <Form.Select
                name="city"
                value={formData.city}
                onChange={handleChange}
              >
                <option value="">Choose...</option>
                <option value="Bengaluru">Bengaluru</option>
                {/* Add other cities as needed */}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="pincode">
              <Form.Label>Pincode:</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Ex: 560055"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default HospitalsForm;
