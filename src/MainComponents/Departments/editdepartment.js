
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useParams } from 'react-router-dom';

function Editdepartment() {
    const [departmentname, setDepartmentName] = useState("");
    const { id } = useParams();
    const { state: departments } = useLocation();

    const [employeedata, setEmployeedata] = useState([]);
    const [Employee, setEmployee] = useState({
        Employeename: "",
        EmployeePhone: "",
        selectDepartment: "",
        Target: "",
    });

 
    // // Fetch employees when component mounts
    useEffect(() => {
        const fetchemployees = async () => {
            try {
                const response = await axios.get(
                    `http://77.37.45.2:8091/api/v1/internalemployee/fetchinternalemployee/${id}`

                );
                setEmployeedata(response.data);
                console.log(response.data);
                
            } catch (err) {
                console.error("Error fetching employee data:", err);
            }
        };
        fetchemployees();
    }, []); 
  
    if (!departments) {
        return <div>Error: No data found. Please go back and try again.</div>;
    }

    // Filter the department based on the id from the URL
    const department = departments.find((dept) => dept.id === parseInt(id));
    if (!department) {
        return <div>No department found with ID: {id}</div>;
    }


    // Handler for department selection
    const handleDepartmentChange = (e) => {
        setDepartmentName(e.target.value);
        console.log("Selected Department:", e.target.value);
    };

    // Handler for employee input fields
    const handleEmployeeChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Update department data
    const handleClick = (e) => {
        e.preventDefault(); // Prevent page reload
        axios
            .put("https://jsonplaceholder.typicode.com/users", { departmentname })
            .then((response) => console.log("Department Updated:", response.data))
            .catch((error) => console.error("Error updating department:", error));
    };

    // Update employee data
    const handleClickAll = (e) => {
        e.preventDefault(); // Prevent page reload
        axios
            .put("https://jsonplaceholder.typicode.com/users", Employee)
            .then((response) => console.log("Employee Updated:", response.data))
            .catch((error) => console.error("Error updating employee:", error));
    };

    return (
        <>
            <Form>
                
                {/* Employee Name Input */}
                <Form.Group className="mb-3" controlId="formBasicEmployeeName">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control
                        type="text"
                        id="Employeename"
                        name="Employeename"
                        value={Employee.name ||''}
                        onChange={handleEmployeeChange}
                        placeholder="Employee name"
                    />
                </Form.Group>

                {/* Employee Phone Input */}
                <Form.Group className="mb-3" controlId="formBasicEmployeePhone">
                    <Form.Label>Employee Phone</Form.Label>
                    <Form.Control
                        type="number"
                        id="EmployeePhone"
                        name="EmployeePhone"
                        value={Employee.phone ||''}
                        onChange={handleEmployeeChange}
                        placeholder="Employee phone"
                    />
                </Form.Group>

                {/* Select Department Dropdown */}
                <Form.Label>Select Department</Form.Label>
                <Form.Select
                    value={Employee.selectDepartment ||''}
                    onChange={(e) =>
                        setEmployee((prev) => ({
                            ...prev,
                            selectDepartment: e.target.value,
                        }))
                    }
                >
                    <option value="">Select</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                </Form.Select>

                {/* Employee Target Input */}
                <Form.Group className="mb-3" controlId="formBasicTarget">
                    <Form.Label>Target</Form.Label>
                    <Form.Control
                        type="text"
                        id="Target"
                        name="Target"
                        value={Employee.Target||''}
                        onChange={handleEmployeeChange}
                        placeholder="Target"
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleClickAll}>
                    Update Employee
                </Button>
            </Form>
        </>
    );
}

export default Editdepartment;
