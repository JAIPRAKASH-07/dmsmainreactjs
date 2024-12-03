import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // For navigate
import { Form, Col, Row, Button } from "react-bootstrap"; // For Form, Col, Row, Button

function Edithospits() {
    const { id } = useParams();
    const [EditformData, setEditformData] = useState({
      doctorName: '',
      hospital: '',
      committedCases: '',
      remarks: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://77.37.45.2:8091/api/v1/doctorregistration/fetchdoctorregistration/${id}`
                );
                console.log(response.data);
                setEditformData(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
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
        // Handle form submission here, e.g., send data to the server
        console.log(EditformData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="doctorName">
                        <Form.Label>Doctor Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="doctorName"
                            value={EditformData.name}
                            onChange={handleChange}
                            placeholder="Ex: Dr.SaiPavan"
                        />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group controlId="hospital">
                        <Form.Label>Select Hospital:</Form.Label>
                        <Form.Control
                            as="select"
                            name="hospital"
                            value={EditformData.hospitalRegistrations.name}
                            onChange={handleChange}
                        >
                            <option value="">Select...</option>
                            <option value="Apollo Hospital">Apollo Hospital</option>
                            {/* Add more hospital options as needed */}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group controlId="committedCases">
                        <Form.Label>Committed Cases:</Form.Label>
                        <Form.Control
                            type="text"
                            name="committedCases"
                            value={EditformData.committedCases}
                            onChange={handleChange}
                            placeholder="Ex: Committed cases by doctor"
                        />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group controlId="remarks">
                        <Form.Label>Remarks:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="remarks"
                            value={EditformData.remarks}
                            onChange={handleChange}
                            placeholder="Ex: Remarks"
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default Edithospits;
