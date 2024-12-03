import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

function Edithospits(hospital) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [EditformData, setEditformData] = useState({
    name: hospital.name || "",
    email: hospital.email || "",
    phone: hospital.phone || "",
    address: hospital.address || "",
    location: hospital.location || "",
    pincode: hospital.pincode || "",
    stateId: hospital.state?.id || "",
    cityId: hospital.city?.id || "",
  });
// state and city
const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(hospital.state?.id || "");
  const [selectedCity, setSelectedCity] = useState(hospital.city?.id || "");
useEffect(() => {
  axios
    .get("http://77.37.45.2:1000/api/v1/state/fetchallstate")
    .then((response) => setStates(response.data))
    .catch((error) => console.error("Error fetching states:", error));
}, []);

useEffect(() => {
  if (selectedState) {
    fetchCities(selectedState);
  }
}, [selectedState]);

const fetchCities = (stateId) => {
  axios
    .get("http://77.37.45.2:1000/api/v1/city/fetchallcity")
    .then((response) => {
      const filteredCities = response.data.filter(
        (city) => city.stateValueId === Number(stateId)
      );
      setCities(filteredCities);
    })
    .catch((error) => console.error("Error fetching cities:", error));
};

const handleStateChange = (e) => {
  const stateId = e.target.value;
  setSelectedState(stateId);
  setEditformData((prev) => ({ ...prev, stateId, cityId: "" }));
  setCities([]);
  fetchCities(stateId);
  // validateField("stateId", stateId);
};

const handleCityChange = (e) => {
  const cityId = e.target.value;
  setSelectedCity(cityId);
  setEditformData((prev) => ({ ...prev, cityId }));
  //validateField("cityId", cityId);
};


// .......................

  // Fetch hospital data on component mount
  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await axios.get(
          `http://77.37.45.2:8091/api/v1/hospitalregistration/fetchhospitalregistration/${id}`
        );

        console.log(response.data);
        console.log(EditformData);
        
        setEditformData(response.data);
      } catch (err) {
        console.error("Error fetching hospital data:", err);
      }
    };
    fetchHospitalData();
  }, [id]);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditformData({
      ...EditformData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(EditformData);
    // Example: Navigate after successful submission
    // navigate('/hospitals');
  };

  return (
    <Container>
      <h3 className="text-center my-4">Edit Hospital Details</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formHospitalName">
            <Form.Label>Hospital Name</Form.Label>
            <Form.Control
              type="text"
              name="hospitalName"
              value={EditformData.name??'N/A'}
              onChange={handleChange}
              placeholder="Ex: Apollo Hospital"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formHospitalEmail">
            <Form.Label>Hospital Email</Form.Label>
            <Form.Control
              type="email"
              name="hospitalEmail"
              value={EditformData.email??'N/A'}
              onChange={handleChange}
              placeholder="Ex: apollohospital@gmail.com"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formHospitalPhone">
            <Form.Label>Hospital Phone</Form.Label>
            <Form.Control
              type="tel"
              name="hospitalPhone"
              value={EditformData.phone}
              onChange={handleChange}
              placeholder="Ex: +91 XXXXXXXXXX"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            value={EditformData.address}
            onChange={handleChange}
            rows={3}
            placeholder="Ex: 154, Bannerghatta Rd, Krishnaraju Layout, Amalodbhavi Nagar"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={EditformData.location}
              onChange={handleChange}
              placeholder="Ex: Bannerghatta"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formState">
            <Form.Label>State</Form.Label>
            <Form.Select
              name="state"
              value={EditformData.stateId || 'N/A'}
              onChange={handleStateChange }
            >
              <option value="">Choose...</option>
              <option value="Karnataka">Karnataka</option>
              {/* Add other states */}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Select
              name="city"
              value={EditformData.cityId ||'N/A'}
              onChange={ handleCityChange}
            >
              <option value="">Choose...</option>
              <option value="Bengaluru">Bengaluru</option>
              {/* Add other cities */}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              name="pincode"
              value={EditformData.pincode}
              onChange={handleChange}
              placeholder="Ex: 560055"
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Edithospits;
