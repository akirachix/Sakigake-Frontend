import { PostClassData } from "@/app/utilities/utils";
import { BASE_URL } from "@/config";

export async function POST(classData: PostClassData) {
  try {
    if (!BASE_URL) {
      return new Response("BASE url not found", {
        status: 404,
        statusText: "failed",
      });
    }

    const response = await fetch('https://sakigake-backend-ecc1b0d1bf4d.herokuapp.com/grades/add_class/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: 200,
      statusText: "success",
    });
  } catch (error: any) {
            return new Response(error.message, {
              status: 500,
              statusText: "Failed",
            });
  }
}