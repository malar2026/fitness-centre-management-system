import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UIElements.css";
export default function Payments() {

  const [payments, setPayments] = useState([]);
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [memberId, setMemberId] = useState("");
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadMembers();
    loadPayments();
  }, []);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/payments");
      setPayments(res.data);
    } catch (err) {
      setError("Failed to load payments");
    }
    setLoading(false);
  };

  const loadMembers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/members");
      setMembers(res.data);
    } catch (err) {
      setError("Failed to load members");
    }
  };

  const validateForm = () => {

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid payment amount");
      return false;
    }

    if (!paymentDate) {
      setError("Please select payment date");
      return false;
    }

    if (!transactionStatus) {
      setError("Please select transaction status");
      return false;
    }

    if (!memberId) {
      setError("Please select a member");
      return false;
    }

    return true;
  };

  const savePayment = async () => {

    setError("");
    setMessage("");

    if (!validateForm()) return;

    const paymentData = {
      amount: Number(amount),
      paymentDate,
      transactionStatus,
      memberId: Number(memberId)
    };

    setLoading(true);

    try {
      await axios.post("http://localhost:8080/api/payments", paymentData);

      setMessage("✅ Payment saved successfully");

      loadPayments();

      setAmount("");
      setPaymentDate("");
      setTransactionStatus("");
      setMemberId("");

    } catch (err) {
       setError(err.response?.data?.message || err.message || "❌ Failed to save payment");
  	console.error(err);
    
    }

    setLoading(false);
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);

  const getStatusStyle = (status) => {
    switch (status) {
      case "DONE":
        return { color: "green", fontWeight: "bold" };
      case "PENDING":
        return { color: "orange", fontWeight: "bold" };
      default:
        return { color: "red", fontWeight: "bold" };
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>

      <h2>💳 Payments</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

<div style={{ display: "flex", gap: "40px", marginBottom: "20px" }}>
      <div  style={{ flex: 1 }}>
	<div>
        <label>Payment Amount (₹)</label><br />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <label>Payment Date</label><br />
        <input
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
        />
      </div>
 </div>

 <div style={{ flex: 1 }}>
      <div>
        <label>Transaction Status</label><br />
        <select
	 
          value={transactionStatus}
          onChange={(e) => setTransactionStatus(e.target.value)}
	  className="status-select"
        >
          <option value="">Select status</option>
          <option value="DONE">DONE</option>
          <option value="PENDING">PENDING</option>
        </select>
      </div>

      <div>
        <label>Member</label><br />
        <select
	  className="status-select"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        >
          <option value="">Select Member</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>
</div>
</div>

      <br />

      <button onClick={savePayment} disabled={loading}>
        {loading ? "Processing..." : "Save Payment"}
      </button>

      <hr />

      <h3>Payment List</h3>

      {loading ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (
        <p>📭 No payments recorded yet</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Member</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{formatCurrency(p.amount)}</td>
                <td>{p.paymentDate}</td>
                <td style={getStatusStyle(p.transactionStatus)}>
                  {p.transactionStatus}
                </td>
                <td>{p.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
