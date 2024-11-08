import axios from "axios";
import crypto from "crypto";

export const payWithEsewa = async (req, res) => {
  const { payload } = req.body;

  try {
    const response = await fetch(
      "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const result = await response.json();
    return res.json(result);
  } catch (error) {
    console.error("Error forwarding request to eSewa:", error);
    return res.status(500).json({ error: "Payment request failed" });
  }
};

export const callKhalti = async (formData, req, res) => {
  try {
    const headers = {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };
    console.log(headers);
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      formData,
      {
        headers,
      }
    );
    console.log(response.data);
    console.log(response.data.payment_url);
    res.json({
      message: "khalti success",
      payment_method: "khalti",
      data: response.data,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err?.message });
  }
};

export const handleKhaltiCallback = async (req, res, next) => {
  try {
    const { txnId, pidx, amount, purchase_order_id, transaction_id, message } =
      req.query;
    if (message) {
      return res
        .status(400)
        .json({ error: message || "Error Processing Khalti" });
    }

    const headers = {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      { headers }
    );

    console.log(response.data);
    if (response.data.status !== "Completed") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    console.log(purchase_order_id, pidx);
    req.transaction_uuid = purchase_order_id;
    req.transaction_code = pidx;
    // next();
    return res.redirect("http://localhost:5173");
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err?.message || "Error Processing Khalti" });
  }
};

export const createSignature = (message) => {
  const secret = "8gBm/:&EnhH.1/q"; //different in production
  // Create an HMAC-SHA256 hash
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);

  // Get the digest in base64 format
  const hashInBase64 = hmac.digest("base64");
  return hashInBase64;
};

export const handleEsewaSuccess = async (req, res, next) => {
  try {
    const { data } = req.query;
    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf-8")
    );
    console.log(decodedData);

    if (decodedData.status !== "COMPLETE") {
      return res.status(400).json({ messgae: "errror" });
    }
    const message = decodedData.signed_field_names
      .split(",")
      .map((field) => `${field}=${decodedData[field] || ""}`)
      .join(",");
    console.log(message);
    const signature = createSignature(message);

    if (signature !== decodedData.signature) {
      res.json({ message: "integrity error" });
    }

    req.transaction_uuid = decodedData.transaction_uuid;
    req.transaction_code = decodedData.transaction_code;
    // next();
    res.redirect("http://localhost:5173");
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err?.message || "No bookings found" });
  }
};
