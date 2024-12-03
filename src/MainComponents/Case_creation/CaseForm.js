import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Table,
  CloseButton,
} from "react-bootstrap";
import "./CaseForm.css";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";

function CaseForm() {


  const location = useLocation();
  const hospitalData = location.state;
  //console.log(hospitalData);

const Navigate = useNavigate();



  //verified states
  const [doctors, setDoctors] = useState([]); // Initialize as empty array
  const [hospitals, setHospitals] = useState([]);
  const [selectedDoctorID, setSelectedDoctorID] = useState(null);
  const [surgeryHospitalId, setSurgeryHospitalId] = useState(null);

  const [surgeryDate, setSurgeryDate] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategoryID, setSelectedSubCategoryID] = useState(null);

  // State variables to store selected values and data fetched from the APIs
  const [principles, setPrinciples] = useState([]);
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedPrinciple, setSelectedPrinciple] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  //const [loadingPrinciples, setLoadingPrinciples] = useState(true); // To handle loading state for principles







  const [employees, setEmployees] = useState([]);

  const [selectedPayment, setSelectedPayment] = useState(""); // State for payment type

  const [salesPersonId, setSalesPersonId] = useState(0);

  const [deliveryTeamIds, setDeliveryTeamIds] = useState([]);
  const [collectedByIds, setCollectedByIds] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [ipNumber, setIpNumber] = useState("");
  const [dcNumber, setDcNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  // const [invoiceStatus, setInvoiceStatus] = useState("");
  const [invoiceSubmittedDate, setInvoiceSubmittedDate] = useState("");
  const [cashCollectedDate, setCashCollectedDate] = useState("");
  const [bdCharges, setBdCharges] = useState(0);
  const [bdPaidDate, setBdPaidDate] = useState("");
  const [bdPaidBy, setBdPaidBy] = useState("");
  const [cashAmount, setCashAmount] = useState(0);
  const [cashStatus, setCashStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [selectedPrincipleName ,setSelectedPrincipleName ] = useState("")
  const[invoiceStatus, setInvoiceStatus] = useState("");





 // Populate the form with existing data when the page loads
 useEffect(() => {
  if (hospitalData) {
    // Use optional chaining to avoid accessing properties on null/undefined
    setSelectedDoctorID(hospitalData.surgeryDoctor?.id);
    setSurgeryHospitalId(hospitalData.surgeryHospital?.id);
    setSurgeryDate(hospitalData.surgeryDate);
    setSelectedCategoryID(hospitalData.category?.id);
    setSelectedSubCategoryID(hospitalData.subCategory?.id);
    setSalesPersonId(hospitalData.salesPerson?.id);
    setPatientName(hospitalData.patientName);
    setIpNumber(hospitalData.ipNumber);
    setDcNumber(hospitalData.dcNumber);
    setInvoiceDate(hospitalData.invoiceDate);
    setInvoiceNumber(hospitalData.invoiceNumber);
    setInvoiceAmount(hospitalData.invoiceAmount);

    
    setInvoiceStatus(hospitalData.invoiceStatus);
    setInvoiceSubmittedDate(hospitalData.invoiceSubmittedDate);
    setCashCollectedDate(hospitalData.cashCollectedDate);
    setBdCharges(hospitalData.bdCharges);
    setBdPaidDate(hospitalData.bdPaidDate);
    setBdPaidBy(hospitalData.bdPaidBy);
    setCashAmount(hospitalData.cashAmount);
    setCashStatus(hospitalData.cashStatus);
    setRemarks(hospitalData.remarks);
    setSelectedPayment(hospitalData.caseType)

    const principleIds = hospitalData.surgeryProductsUsed.map(product => {
      return product.product?.principle?.id || null; // Map to principle id or null
    });

    // Optionally, set the first principleId or handle differently if needed
    setSelectedPrinciple(principleIds[0]); // Or you can handle multiple principles if needed



    const productIds = hospitalData.surgeryProductsUsed.map(product => {
      return product.product?.id || null; // Map to principle id or null
    });

    setSelectedProduct(productIds)


    const principleName = hospitalData.surgeryProductsUsed.map(product => {
      return product.product?.principle?.name || null; // Map to principle id or null
    });

    setSelectedPrincipleName(principleName)

const deliveryIds = hospitalData.collectedByTeam.map((deliveryId)=>{
  return deliveryId?.id
})


    setDeliveryTeamIds(deliveryIds)

    const collectedIds = hospitalData.deliveryTeam.map((collectedId)=>{
      return collectedId?.id
    })
    
    
    setCollectedByIds(collectedIds) 
    
    const updatedProductList = hospitalData.surgeryProductsUsed?.map(product => ({
      productId: product.product?.id,
      principleId: product.product?.principle?.id,
      dpvalue: product.dpvalue,
      quantity: product.quantity,
      sellingPrice: product.sellingPrice,
      profit: product.profit,
      productCode: product.product?.productCode,
      batchCode: product.product?.batchCode,
      mrp: product.product?.mrp,
      expiryDate: product.product?.expiryDate,
      productName: product.product?.name,
    })) || []; // Default to empty array if no products are present

    setProductList(updatedProductList);
  }
}, [hospitalData]);























  // Fetch data from APIs when the component mounts
  useEffect(() => {
    // Fetch doctors for the doctor dropdown
    axios
      .get(
        "http://77.37.45.2:8091/api/v1/doctorregistration/fetchalldoctorregistrations"
      )
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));

    // Fetch categories for the category dropdown
    axios
      .get("http://77.37.45.2:8091/api/v1/category/fetchallcategories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch principles for the principle dropdown
    axios
      .get("http://77.37.45.2:8091/api/v1/principle/fetchallprinciples")
      .then((response) => setPrinciples(response.data))
      .catch((error) => console.error("Error fetching principles:", error));

    // Fetch employees for the employee dropdowns
    axios
      .get(
        "http://77.37.45.2:8091/api/v1/internalemployee/fetchallinternalemployees"
      )
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);
         



  // Update product list based on selected principle
  useEffect(() => {
    const selectedPrincipleData = principles.find(
      (principle) => principle.id === parseInt(selectedPrinciple) // Ensure type consistency
    );
    setProducts(selectedPrincipleData ? selectedPrincipleData.products : []);
  }, [selectedPrinciple, principles]);




  // Handle adding product to the list
  const handleAddProduct = () => {
    if (selectedPrinciple && selectedProduct) {
      const selectedPrincipleData = principles.find(
        (principle) => principle.id === parseInt(selectedPrinciple)
      );
      const productDetails = products.find(
        (product) => product.id === parseInt(selectedProduct)
      );

      if (selectedPrincipleData && productDetails) {
        const profit = calculateProfit(
          productDetails.mrp,
          productDetails.dpvalue
        );

        setProductList((prevList) => [
          ...prevList,
          {
            dpvalue: productDetails.dpvalue || 0,
            quantity: 1,
            sellingPrice: "",
            product: productDetails,
            profit: profit, // Set profit here
            productId: productDetails.id,
            principleName: productDetails.name,
            productName: productDetails.name,
            principleId: selectedPrinciple,
            productCode: productDetails.productCode,
            batchCode: productDetails.batchCode,
            mrp: productDetails.mrp,
            expiryDate: productDetails.expiryDate,
          },
        ]);
      }
    }
  };

  // Handle deleting product from the list
  const handleDeleteProduct = (index) => {
    const updatedList = [...productList];
    updatedList.splice(index, 1);
    setProductList(updatedList);
  };

  // Function to calculate profit
  const calculateProfit = (sellingPrice, mrp) => {
    // Assuming profit is the difference between selling price and MRP
    return parseFloat(sellingPrice) - parseFloat(mrp);
  };

  // Handle quantity change in the table
  const handleQuantityChange = (index, newQuantity) => {
    const updatedProductList = [...productList];
    updatedProductList[index].quantity = newQuantity;
    setProductList(updatedProductList);
  };
  // Handle price change in the table
  const handlePriceChange = (index, newPrice) => {
    const updatedProductList = [...productList];
    updatedProductList[index].sellingPrice = newPrice;

    // Recalculate profit when price changes
    const product = updatedProductList[index];
    const profit = calculateProfit(newPrice, product.mrp);
    updatedProductList[index].profit = profit; // Update profit

    setProductList(updatedProductList);
  };

  // Calculate totals for the footer
  const calculateFooterData = () => {
    let totalQuantity = 0;
    let totalSellingPrice = 0;
    let totalMRP = 0;
    let totalProfit = 0;
    let totalProducts = productList.length;

    productList.forEach((item) => {
      totalQuantity += parseInt(item.quantity || 0, 10);
      totalSellingPrice +=
        parseFloat(item.sellingPrice || 0) * parseInt(item.quantity || 0, 10);
      totalMRP += parseFloat(item.mrp || 0) * parseInt(item.quantity || 0, 10);
      totalProfit +=
        parseFloat(item.profit || 0) * parseInt(item.quantity || 0, 10); // Summing profit
    });

    return {
      totalQuantity,
      totalSellingPrice,
      totalMRP,
      totalProfit, // Include total profit
      totalProducts,
    };
  };

  const {
    totalQuantity,
    totalSellingPrice,
    totalMRP,
    totalProfit,
    totalProducts,
  } = calculateFooterData();

 
  // Fetch hospitals based on the selected doctor
  useEffect(() => {
    if (selectedDoctorID && doctors.length) {
      const selectedDoctorData = doctors.find(
        (doc) => doc.id === parseInt(selectedDoctorID)
      );
      if (selectedDoctorData && selectedDoctorData.hospitalRegistrations) {
        setHospitals(selectedDoctorData.hospitalRegistrations);
      } else {
        setHospitals([]);
      }
    }
  }, [selectedDoctorID, doctors]);

  // Update subcategories based on selected category
  useEffect(() => {
    if (selectedCategoryID) {
      const selectedCategory = categories.find(
        (category) => category.id === parseInt(selectedCategoryID) // Ensure type match
      );
      setSubCategories(selectedCategory ? selectedCategory.subCategories : []);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategoryID, categories]);

  const handleSubmit = () => {
    const caseData1 = productList.map((item) => ({
      productId: item.productId,
      principleId: item.principleId,
      dpvalue: item.dpvalue,
      quantity: item.quantity,
      sellingPrice: item.sellingPrice,
      profit: item.profit,
    }));
    const caseData = {
      categoryId: selectedCategoryID,
      subCategoryId: selectedSubCategoryID,
      surgeryHospitalId: surgeryHospitalId,
      surgeryDoctorId: selectedDoctorID,
      salesPersonId: salesPersonId,
      surgeryDate: surgeryDate,
      caseType: selectedPayment,
      surgeryProductsUsed: caseData1,
      deliveryTeamIds: deliveryTeamIds,
      collectedByIds: collectedByIds,
      patientName: patientName,
      ipNumber: ipNumber,
      dcNumber: dcNumber,
      invoiceDate: invoiceDate,
      invoiceNumber: invoiceNumber,
      invoiceAmount: invoiceAmount,
      invoiceStatus: invoiceStatus,
      invoiceSubmittedDate: invoiceSubmittedDate,
      cashCollectedDate: cashCollectedDate,
      bdCharges: bdCharges,
      bdPaidDate: bdPaidDate,
      bdPaidBy: bdPaidBy,
      cashAmount: cashAmount,
      cashStatus: cashStatus,
      remarks: remarks,
    };

    // Send `caseData` to your API or handle it as needed.
    console.log("Case data submitted:", JSON.stringify(caseData, null, 2));
  };

  return (
    <div>
      <Container className="caseForm-Container">
        <div className="addCaseHeaderClass">
          <h3 className="addnewcaseHeader">Add New case</h3>
          <div id="closeModalBtnPrin">
            {" "}
            <CloseButton   />
          </div>
        </div>
        <hr />

        <Form>
          <Row className="mb-3">
            {/* Doctor Dropdown */}
            <Form.Group as={Col}>
              <Form.Label>Doctor Name:</Form.Label>
              <Form.Select
                value={selectedDoctorID} // State value
                onChange={(e) => setSelectedDoctorID(e.target.value)} // Update state on change
              >
                <option>Choose...</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Hospital Dropdown */}
            {/* Hospital Dropdown */}
            <Form.Group as={Col}>
              <Form.Label>Hospital Name:</Form.Label>
              <Form.Select
                value={surgeryHospitalId} // State value
                onChange={(e) => setSurgeryHospitalId(e.target.value)} // Update state on change
              >
                <option value="">Choose...</option>
                {hospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Surgery Date Picker */}
            <Form.Group as={Col}>
              <Form.Label>Date of Surgery</Form.Label>
              <Form.Control
                type="date"
                value={surgeryDate} // State value
                onChange={(e) => setSurgeryDate(e.target.value)} // Update state on change
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            {/* Category Dropdown */}
            <Form.Group as={Col}>
              <Form.Label>Category:</Form.Label>
              <Form.Select
                value={selectedCategoryID || ""}
                onChange={(e) => setSelectedCategoryID(e.target.value)}
              >
                <option>Choose...</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Subcategory Dropdown */}
            <Form.Group as={Col}>
              <Form.Label>Subcategory:</Form.Label>
              <Form.Select
                value={selectedSubCategoryID || ""}
                onChange={(e) => setSelectedSubCategoryID(e.target.value)}
                disabled={!subCategories.length}
              >
                <option value="">Select Subcategory...</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Payment Dropdown */}
            <Form.Group as={Col}>
              <Form.Label>Payment:</Form.Label>
              <Form.Select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
              >
                <option>Choose...</option>
                <option value="Invoice">Invoice</option>
                <option value="Cash">Cash</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            {/* Principle Dropdown */}
            <Form.Group as={Col}>
              <Form.Label>Principle Name:</Form.Label>
              <Form.Select
                value={selectedPrinciple}
                onChange={(e) => setSelectedPrinciple(e.target.value)} // Update selected principle
              >
                <option value="">Choose...</option>
                {principles.map((principle) => (
                  <option key={principle.id} value={principle.id}>
                    {principle.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Product Dropdown */}
            <Form.Group as={Col}>
              <Form.Label>Products:</Form.Label>
              <Form.Select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)} // Update selected product
                disabled={products.length === 0} // Disable if no products are available
              >
                <option value="">Choose...</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          {/* Button to add a product (for multi-product selection, logic would need to be added) */}
          <Button
            id="addProductBtnId"
            className="mb-3"
            onClick={handleAddProduct}
            variant="primary"
          >
            Add Product
          </Button>

          {/* showProductTable */}

          {productList.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Principle Name</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>DP Value</th>
                  <th>Selling Price</th>
                  <th>MRP</th>
                  <th>Expiry Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((item, index) => (
                  <tr key={index}>
                    <td>{selectedPrincipleName}</td>
                    <td>{item.productName}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                      />
                    </td>
                    <td>{item.dpvalue}</td>
                    <td>
                      <input
                        type="number"
                        value={item.sellingPrice || ""}
                        onChange={(e) =>
                          handlePriceChange(index, e.target.value)
                        }
                      />
                    </td>
                    <td>{item.mrp}</td>
                    <td>{item.expiryDate}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteProduct(index)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <strong>Totals:</strong>
                  </td>
                  <td>{totalProducts}</td> {/* Total number of products */}
                  <td>{totalQuantity}</td> {/* Total quantity */}
                  <td></td> {/* DP Value is left empty */}
                  <td>{totalSellingPrice.toFixed(2)}</td>{" "}
                  {/* Total selling price */}
                  <td>{totalMRP.toFixed(2)}</td> {/* Total MRP */}
                  <td></td>
                  <td></td>
                </tr>
              </tfoot>
            </Table>
          )}

          {/* Patient Name and IP No  */}

          <Row className="mb-3">
            {/* Patient Name */}
            <Form.Group as={Col}>
              <Form.Label>Patient Name:</Form.Label>
              <Form.Control
                type="text"
                value={patientName} // State value
                onChange={(e) => setPatientName(e.target.value)} // Update state on change
              />
            </Form.Group>

            {/* IP No */}
            <Form.Group as={Col}>
              <Form.Label>IP No:</Form.Label>
              <Form.Control
                type="text  "
                value={ipNumber}
                onChange={(e) => setIpNumber(e.target.value)}
              />
            </Form.Group>
          </Row>

          {/* if payment type is invoice  */}
          {selectedPayment === "Invoice" && (
            <div>
              <Row className="mb-3">
                {/* Invoice No */}
                <Form.Group as={Col}>
                  <Form.Label> Invoice Number:</Form.Label>
                  <Form.Control
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)} // Update state
                  />
                </Form.Group>

                {/*  DC No */}
                <Form.Group as={Col}>
                  <Form.Label> DC No:</Form.Label>
                  <Form.Control
                    type="text"
                    value={dcNumber}
                    onChange={(e) => setDcNumber(e.target.value)} // Update state for DC No
                  />
                </Form.Group>

                {/*  Invoice Amount*/}
                <Form.Group as={Col}>
                  <Form.Label>Invoice Amount: </Form.Label>
                  <Form.Control
                    type="number"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(e.target.value)} // Update state for invoice amount
                  />
                </Form.Group>
              </Row>

              {/* Invoice date and invoice status  */}
              <Row className="mb-3">
                {/* invoice date  */}
                <Form.Group as={Col}>
                  <Form.Label> Invoice Date :</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="dd/mm/yyyy"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </Form.Group>

             



                {/* invoice status */}
                <Form.Group as={Col}>
                  <Form.Label> Invoice Status:</Form.Label>
                  <Form.Select
                    value={invoiceStatus}
                    onChange={(e) => setInvoiceStatus(e.target.value)}
                  >
                    <option>Choose... </option>
                    <option value="Pending">Pending </option>
                    <option value="Submited"> Submitted </option>
                  </Form.Select>
                </Form.Group>
              </Row>

              {/* if invoice Status is Submitted  */}
              {invoiceStatus === "Submited" && (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label> Invoice Submitted Date:</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="dd/mm/yyyy"
                      value={invoiceSubmittedDate}
                      onChange={(e) => setInvoiceSubmittedDate(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>BD Charges</Form.Label>
                    <Form.Control
                      type="number"
                      value={bdCharges}
                      onChange={(e) => setBdCharges(Number(e.target.value))}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>BD-Paid Date:</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="dd/mm/yyyy"
                      value={bdPaidDate}
                      onChange={(e) => setBdPaidDate(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>BD-Paid By:</Form.Label>
                    <Form.Control
                      value={bdPaidBy}
                      onChange={(e) => setBdPaidBy(e.target.value)}
                    />
                  </Form.Group>
                </Row>
              )}
            </div>
          )}

          {/* if payment type selected is cash  */}

          {selectedPayment === "Cash" && (
            <div>
              <Row className="mb-3">
                {/*  DC No */}
                <Form.Group as={Col}>
                  <Form.Label>DC No:</Form.Label>
                  <Form.Control
                    type="text"
                    value={dcNumber}
                    onChange={(e) => setDcNumber(e.target.value)} // Update state for DC No
                  />
                </Form.Group>

                {/*  Cash Amount */}
                <Form.Group as={Col}>
                  <Form.Label>Cash Amount:</Form.Label>
                  <Form.Control
                    type="number"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                  />
                </Form.Group>

                {/*   Cash Status */}
                <Form.Group as={Col}>
                  <Form.Label> Cash Status</Form.Label>
                  <Form.Select
                    value={cashStatus}
                    onChange={(e) => setCashStatus(e.target.value)}
                  >
                    <option>Choose...</option>
                    <option>Pending</option>
                    <option value="Collected">Collected</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Remarks:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={remarks} // Bind the value of the textarea to the remarks state
                    onChange={(e) => setRemarks(e.target.value)} // Update state on change
                  />
                </Form.Group>
              </Row>
              <br />

              {cashStatus === "Collected" && (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Cash Collected Date:</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="dd/mm/yyyy"
                      value={cashCollectedDate} // Bind the value to state
                      onChange={(e) => setCashCollectedDate(e.target.value)} // Update state
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>BD-Charges:</Form.Label>
                    <Form.Control
                      type="number"
                      value={bdCharges} // Bind the value to state
                      onChange={(e) => setBdCharges(Number(e.target.value))} // Update state (convert to number)
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>BD-Paid Date:</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="dd/mm/yyyy"
                      value={bdPaidDate} // Bind the value to state
                      onChange={(e) => setBdPaidDate(e.target.value)} // Update state
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>BD-Paid By:</Form.Label>
                    <Form.Control
                      value={bdPaidBy} // Bind the value to state
                      onChange={(e) => setBdPaidBy(e.target.value)} // Update state
                    />
                  </Form.Group>
                </Row>
              )}
            </div>
          )}

          {/* delivered by and collected by  */}
          <Row className="mb-3">
            {/* Delivered By  */}
            <Form.Group as={Col}>
              <Form.Label>Delivered By:</Form.Label>
              <Form.Select
                value={deliveryTeamIds}
                onChange={(e) => setDeliveryTeamIds(e.target.value)}
              >
                <option>Choose...</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Collected By */}
            <Form.Group as={Col}>
              <Form.Label>Collected By:</Form.Label>
              <Form.Select
                value={collectedByIds} // Bind to the collectedByIds state
                onChange={(e) => setCollectedByIds(e.target.value)} // Update state when selection changes
              >
                <option>Choose...</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          {/* Submit Button */}
          <div id="CaseFormSubmitBtnDiv">
            <Button
              variant="primary"
              id="CaseFormSubmitBtn"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default CaseForm;
