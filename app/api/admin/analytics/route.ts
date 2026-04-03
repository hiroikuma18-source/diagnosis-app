import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export async function GET() {
  try {
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const propertyId = process.env.GA4_PROPERTY_ID;

    if (!serviceAccountJson || !propertyId) {
      return NextResponse.json({ error: "env not set" }, { status: 500 });
    }

    const decoded = Buffer.from(serviceAccountJson, "base64").toString("utf-8");
    const credentials = JSON.parse(decoded);
    const client = new BetaAnalyticsDataClient({ credentials });

    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [
        { name: "screenPageViews" },
        { name: "totalUsers" },
      ],
      dimensions: [{ name: "pagePath" }],
    });

    const rows = (response.rows ?? []).map((row) => ({
      path: row.dimensionValues?.[0]?.value ?? "",
      pv: Number(row.metricValues?.[0]?.value ?? 0),
      uu: Number(row.metricValues?.[1]?.value ?? 0),
    }));

    return NextResponse.json({ rows });
  } catch (e: any) {
    console.error("GA4 error:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
