// services/api.js
// EVERY network call to the backend goes through this file.
// Components never call fetch() directly — they call these functions.
// This means if your API changes later, you edit ONE file, not every page.

// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "https://expense-lending-app.onrender.com/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  // 204 No Content has no body to parse
  if (res.status === 204) return null;
  return res.json();
}

// --- Expenses ---
export const getExpenses = () => request("/expenses");
export const createExpense = (data) =>
  request("/expenses", { method: "POST", body: JSON.stringify(data) });
export const updateExpense = (id, data) =>
  request(`/expenses/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteExpense = (id) =>
  request(`/expenses/${id}`, { method: "DELETE" });

// --- Lendings ---
export const getLendings = () => request("/lendings");
export const createLending = (data) =>
  request("/lendings", { method: "POST", body: JSON.stringify(data) });
export const updateLendingStatus = (id, status) =>
  request(`/lendings/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
export const deleteLending = (id) =>
  request(`/lendings/${id}`, { method: "DELETE" });
