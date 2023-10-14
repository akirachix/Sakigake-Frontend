import { BASE_URL } from "@/config";

export async function POST(request: Request) {
  try {
    if (!BASE_URL) {
      return new Response("Base url not found", {
        status: 404,
        statusText: "Failed",
      });
    }

    const response = await request.json();

    const result = await fetch(`${BASE_URL}account/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    });

    if (result.ok) {
      const data = await result.json();
      console.log(data);
    
      return new Response(JSON.stringify(data), {
        status: 200,
        statusText: "Success",
      });
    } else {
      const errorData = await result.json();

      return new Response(JSON.stringify(errorData), {
        status: result.status,
        statusText: "Failed",
      });
    }
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
      statusText: "Failed",
    });
  }
}
