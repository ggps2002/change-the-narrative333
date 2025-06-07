// app/api/capture-order/route.ts
import { NextResponse } from "next/server";
import { getAccessToken, PAYPAL_API } from "@/lib/paypal";

export async function POST(request: Request) {
  try {
    const { orderID } = await request.json();

    if (!orderID) {
      return NextResponse.json({ error: "Missing orderID" }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const captureResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!captureResponse.ok) {
      const error = await captureResponse.json();
      return NextResponse.json({ error }, { status: 500 });
    }

    const captureData = await captureResponse.json();

    // Optionally store captureData details (e.g. transaction id, status) in DB here.

    return NextResponse.json({ success: true, captureData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
