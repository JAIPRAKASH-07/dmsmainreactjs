import { useState, useEffect,useLocation } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Editproduct() {
    // const[productdata,setproductdata]= useState([]);
    // const[Mapproduct,setMapproduct]= useState([]);

    // const location= useLocation;
    const { id } = useParams();
    const [EditformData, setEditformData] = useState({
        Principle: '',
        productName: '',
        productCode: '',
        batchNumber: '',
        dp: '',
        mrp: '',
        expiryDate: '',
        quantity: '',
      });

      useEffect(() => {
        const fetchallproducts = async () => {
            try {
                const response = await axios.get(
                    ` http://77.37.45.2:8091/api/v1/salesperson/fetchsalesperson/${id}`
                );
                console.log(response.data);
                setEditformData(response.data)
                // setproductdata(response.data);
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
            <>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Supplier/Principle:</label>
                <select name="supplierPrinciple" value={EditformData.
principle
} onChange={handleChange}>
                  <option value="">Choose...</option>
                  {/* Add options for suppliers/principals */}
                  <option value="BIORAD MEDISYS PVT LTD">BIORAD MEDISYS PVT LTD</option>
                  {/* Add other options as needed */}
                </select>
              </div>
        
              <div>
                <label>Product Name:</label>
                <input type="text" name="productName" value={EditformData.name} onChange={handleChange} placeholder='product.name' />
        
                <label>Product Code:</label>
                <input type="text" name="productCode"  value={EditformData.productCode} onChange={handleChange} placeholder="Product Code" />
              </div>
        
              <div>
                <label>Batch Number:</label>
                <input type="text" name="batchNumber" value={EditformData.
batchCode} onChange={handleChange} placeholder="Batch Number" />
        
                <label>DP:</label>
                <input type="text" name="dp" value={EditformData.dpvalue} onChange={handleChange} placeholder="DP" />
        
                <label>MRP:</label>
                <input type="text" name="mrp" value={EditformData.mrp} onChange={handleChange} placeholder="MRP" />
              </div>
        
              <div>
                <label>Expiry Date:</label>
                <input type="date" name="expiryDate" value={EditformData.expiryDate} onChange={handleChange} />
        
                <label>Quantity:</label>
                <input type="number" name="quantity" value={EditformData.quantity} onChange={handleChange} placeholder="Quantity" />
              </div>
        
              <button type="submit">Update</button>
            </form>
            </>
          );
      };


export default Editproduct;


 