const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export async function createShape(payload) {
  const response = await fetch(`${API_BASE_URL}/api/shapes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export async function getShapes() {
  const response = await fetch(`${API_BASE_URL}/api/shapes`);
  return parseResponse(response);
}

export async function deleteShape(id) {
  const response = await fetch(`${API_BASE_URL}/api/shapes/${id}`, {
    method: "DELETE",
  });

  return parseResponse(response);
}
