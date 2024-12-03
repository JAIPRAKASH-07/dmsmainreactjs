import { useState, useEffect, useLocation } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import Hospitals from "./Hospitals";
import React from "react";
  

function Edithospits() {
    

     const location= useLocation;
    const { id } = useParams();
    const [EditformData, setEditformData] = useState([]);

    useEffect(() => {
        const fetchallproducts = async () => {
            try {
                const response = await axios.get(
                    `   http://77.37.45.2:8091/api/v1/principle/fetchprinciple/${id}`
                );
                console.log(response.data);
                setEditformData(response.data)
               
               
            } catch (err) {
                console.error("Error fetching employee data:", err);
            }
        };
        fetchallproducts();
    }, []); // Empty depen


    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditformData({
            ...EditformData,
            [name]: value,
        });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here, e.g., send data to server
        console.log(EditformData);
    }
    // alert(id)
    return (
        <div>
     
        </div>
    );
};


export default Edithospits;



