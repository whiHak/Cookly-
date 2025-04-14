import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const tx_ref = getQuery(event).tx_ref as string;

  if (!tx_ref) return { success: false, error: "Missing tx_ref" };

  try {
    const response = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
      headers: {
        Authorization: `Bearer CHASECK_TEST-cVsqhBskqjVspLKE7zIKzxZS7ExsYEW6`,
        "Content-Type": "application/json"
      },
    });

    const data = await response.json();
    console.log("Chapa verification response:", data);

    return { 
      success: data?.data?.status === 'success', 
      data,
      verified: data?.status !== 'failed'
    };
  } catch (e) {
    console.error("Chapa payment check failed:", e);
    return { success: false, error: "Failed to verify payment" };
  }
}); 