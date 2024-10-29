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