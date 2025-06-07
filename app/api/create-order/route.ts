// app/api/create-order/route.ts

import { NextResponse } from "next/server";
import { getAccessToken, PAYPAL_API } from "@/lib/paypal";

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    if (!amount || Number(amount) < 5) {
      return NextResponse.json({ error: "Minimum donation is $5" }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount.toFixed(2),
            },
            description: "Donation",
          },
        ],
        application_context: {
          return_url: "http://localhost:3000/donate/success", // change to your live URL
          cancel_url: "http://localhost:3000/donate/cancel",
        },
      }),
    });

    if (!orderRes.ok) {
      const error = await orderRes.json();
      return NextResponse.json({ error }, { status: 500 });
    }

    const orderData = await orderRes.json();

    // Find approval URL
    const approvalLink = orderData.links.find((link: any) => link.rel === "approve")?.href;

    if (!approvalLink) {
      return NextResponse.json({ error: "Approval URL not found" }, { status: 500 });
    }

    return NextResponse.json({ approvalUrl: approvalLink });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
