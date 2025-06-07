// lib/paypal.ts (server-side only)

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!;
const PAYPAL_API = process.env.NODE_ENV === "production" 
  ? "https://api.paypal.com"
  : "https://api.sandbox.paypal.com";

async function getAccessToken() {
  const basicAuth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch PayPal access token");
  }

  const data = await res.json();
  return data.access_token as string;
}

export { getAccessToken, PAYPAL_API };
