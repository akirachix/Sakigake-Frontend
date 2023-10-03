import { BASE_URL } from "@/config";
export async function POST(request: Request) {
  try {
    if (!BASE_URL) {
      return new Response("Base url not found", {
        status: 404,
        statusText: "Failed",
      });
    }
    const requestData = await request.json();
    const result = await fetch('https://sakigake-backend-ecc1b0d1bf4d.herokuapp.com/account/schools/1/parents/register/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    const responseBody = await result.json();
    return new Response(JSON.stringify(responseBody), {
      status: result.ok ? 201 : result.status,
      statusText: result.ok ? "Success" : "Failed",
    });
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
      statusText: "Failed",
    });
  }
}