import Router from "express";
import fetch from "node-fetch"; // Use `node-fetch` if needed
const router = Router();

router.post("/generate-payment-link", async (req, res) => {
    try {
        const response = await fetch("https://sandbox.cashfree.com/pg/links", {
            method: "POST",
            headers: {
                "x-client-id": process.env.CASHFREE_APP_ID,
                "x-client-secret": process.env.CASHFREE_SECRET_KEY,
                "x-api-version": "2025-01-01",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
        });

        const result = await response.json();
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error generating payment link" });
    }
});

export default router;
