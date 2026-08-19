const API_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }

  return data;
}

export function createContact(payload) {
  return request("/contacts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function login(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return request("/auth/logout", { method: "POST" });
}

export function getCurrentUser() {
  return request("/auth/me").then((data) => data.user);
}

export function getContacts() {
  return request("/contacts").then((data) => data.contacts);
}

export function updateContactStatus(id, status) {
  return request(`/contacts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  }).then((data) => data.contact);
}

export function deleteContact(id) {
  return request(`/contacts/${id}`, { method: "DELETE" });
}

export function getAdmins() {
  return request("/auth/admins").then((data) => data.admins);
}

export function createAdmin(payload) {
  return request("/auth/admins", {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((data) => data.admin);
}

export function changePassword(email, newPassword) {
  return request("/auth/password", {
    method: "PATCH",
    body: JSON.stringify({ email, newPassword }),
  });
}
