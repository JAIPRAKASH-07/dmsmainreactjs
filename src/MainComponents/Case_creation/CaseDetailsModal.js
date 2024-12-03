import React from "react";
import "./caseModal.css";

const CaseDetailsModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null; // Do not render if the modal is closed or no data is passed

  const {
    surgeryHospital,
    surgeryDoctor,
    surgeryDate,
    category,
    subCategory,
    caseType,
    surgeryProductsUsed,
    patientName,
    ipNumber,
    dcNumber,
    deliveryTeam,
    collectedByTeam,
    invoiceDate,
    invoiceNumber,
    invoiceAmount,
    invoiceStatus,
    bdCharges,
    bdPaidDate,
    bdPaidBy,
  } = data;

  // Calculating totals
  const totalProducts = surgeryProductsUsed.length;
  const totalQuantity = surgeryProductsUsed.reduce((sum, product) => sum + product.quantity, 0);
  const totalSellingPrice = surgeryProductsUsed.reduce((sum, product) => sum + product.sellingPrice, 0);
  const totalMRP = surgeryProductsUsed.reduce((sum, product) => sum + product.product.mrp, 0);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Case Details</h2>

        {/* Case Details Section */}
        <div className="section">
          <div>
            <strong>Hospital Name:</strong> {surgeryHospital?.name || "N/A"}
          </div>
          <div>
            <strong>Doctor Name:</strong> {surgeryDoctor?.name || "N/A"}
          </div>
          <div>
            <strong>Surgery Date:</strong> {surgeryDate || "N/A"}
          </div>
          <div>
            <strong>Category:</strong> {category?.name || "N/A"}
          </div>
          <div>
            <strong>Subcategory:</strong> {subCategory?.name || "N/A"}
          </div>
          <div>
            <strong>Payment Type:</strong> {caseType || "N/A"}
          </div>
        </div>

        {/* Surgery Products Section */}
        <h3>Surgery Products</h3>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Batch Code</th>
              <th>Principle Name</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>DP Value</th>
              <th>Selling Price</th>
              <th>MRP</th>
            </tr>
          </thead>
          <tbody>
            {surgeryProductsUsed?.map((product, index) => (
              <tr key={index}>
                <td>{product?.product?.name || "N/A"}</td>
                <td>{product?.product?.batchCode || "N/A"}</td>
                <td>{product?.product?.principle?.name || "N/A"}</td>
                <td>{product?.quantity || "N/A"}</td>
                <td>{product?.product?.expiryDate || "N/A"}</td>
                <td>{product?.dpvalue || "N/A"}</td>
                <td>{product?.sellingPrice || "N/A"}</td>
                <td>{product?.product?.mrp || "N/A"}</td>
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
        </table>

        {/* Patient Details */}
        <h3>Patient Details</h3>
        <div className="section">
          <div>
            <strong>Patient Name:</strong> {patientName || "N/A"}
          </div>
          <div>
            <strong>IP Number:</strong> {ipNumber || "N/A"}
          </div>
          <div>
            <strong>DC Number:</strong> {dcNumber || "N/A"}
          </div>
        </div>

        {/* Delivery Team Section */}
        <h3>Delivery Team</h3>
        <div className="section">
          {deliveryTeam?.map((member, index) => (
            <div key={index}>
              <div>
                <strong>Name:</strong> {member?.name || "N/A"}
              </div>
              <div>
                <strong>Phone:</strong> {member?.phonenumber || "N/A"}
              </div>
            </div>
          ))}
        </div>

        {/* Collected By Section */}
        <h3>Collected By</h3>
        <div className="section">
          {collectedByTeam?.map((member, index) => (
            <div key={index}>
              <div>
                <strong>Name:</strong> {member?.name || "N/A"}
              </div>
              <div>
                <strong>Phone:</strong> {member?.phonenumber || "N/A"}
              </div>
            </div>
          ))}
        </div>

        {/* Payment Details */}
        <h3>Payment Details</h3>
        <div className="section">
          <div>
            <strong>Invoice Date:</strong> {invoiceDate || "N/A"}
          </div>
          <div>
            <strong>Invoice Number:</strong> {invoiceNumber || "N/A"}
          </div>
          <div>
            <strong>Invoice Amount:</strong> {invoiceAmount || "N/A"}
          </div>
          <div>
            <strong>Invoice Status:</strong> {invoiceStatus || "N/A"}
          </div>
          <div>
            <strong>BD Charges:</strong> {bdCharges || "N/A"}
          </div>
          <div>
            <strong>BD Paid Date:</strong> {bdPaidDate || "N/A"}
          </div>
          <div>
            <strong>BD Paid By:</strong> {bdPaidBy || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsModal;
