const API_BASE = '/api';

const api = {
  getToken() { return localStorage.getItem('token'); },
  setToken(t) { localStorage.setItem('token', t); },
  removeToken() { localStorage.removeItem('token'); },

  getUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  },
  setUser(u) { localStorage.setItem('user', JSON.stringify(u)); },
  removeUser() { localStorage.removeItem('user'); },

  isLoggedIn() { return !!this.getToken(); },

  logout() {
    this.removeToken();
    this.removeUser();
    window.location.href = '/signin.html';
  },

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = { ...(options.headers || {}) };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw { status: res.status, ...data };
    return data;
  },

  // Auth
  register(body) { return this.request('/auth/register', { method: 'POST', body: JSON.stringify(body) }); },
  login(body) { return this.request('/auth/login', { method: 'POST', body: JSON.stringify(body) }); },
  getMe() { return this.request('/auth/me'); },
  updateMe(body) { return this.request('/auth/me', { method: 'PATCH', body: JSON.stringify(body) }); },

  // Listings
  getListings(params = {}) {
    const q = new URLSearchParams(params).toString();
    return this.request(`/listings${q ? '?' + q : ''}`);
  },
  getListing(id) { return this.request(`/listings/${id}`); },
  createListing(formData) {
    const token = this.getToken();
    return fetch(`${API_BASE}/listings`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData,
    }).then(async r => { const d = await r.json(); if (!r.ok) throw d; return d; });
  },
  updateListing(id, formData) {
    const token = this.getToken();
    return fetch(`${API_BASE}/listings/${id}`, {
      method: 'PATCH',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData,
    }).then(async r => { const d = await r.json(); if (!r.ok) throw d; return d; });
  },
  deleteListing(id) { return this.request(`/listings/${id}`, { method: 'DELETE' }); },
  saveListing(id) { return this.request(`/listings/${id}/save`, { method: 'POST' }); },

  // Messages
  getConversations() { return this.request('/messages'); },
  getMessages(userId) { return this.request(`/messages/${userId}`); },
  sendMessage(body) { return this.request('/messages', { method: 'POST', body: JSON.stringify(body) }); },
};
