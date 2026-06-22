/* Shared UI utilities — Arabic */

const CATEGORIES = [
  { id: 'product',  label: 'منتجات',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>' },
  { id: 'skill',    label: 'مهارات',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>' },
  { id: 'project',  label: 'مشاريع',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>' },
  { id: 'housing',  label: 'عقارات',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
  { id: 'vehicle',  label: 'مركبات',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>' },
  { id: 'service',  label: 'خدمات',    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>' },
  { id: 'job',      label: 'وظائف',    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>' },
  { id: 'other',    label: 'أخرى',     icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>' },
];

function getCategoryLabel(id) {
  const c = CATEGORIES.find(c => c.id === id);
  return c ? c.label : id;
}

function getCategoryIcon(id) {
  const c = CATEGORIES.find(c => c.id === id);
  return c ? c.icon : '';
}

/* Toast notifications */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position:fixed;top:20px;left:20px;z-index:9999;display:flex;flex-direction:column;gap:8px;';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  const colors = { success: '#10B981', error: '#EF4444', info: '#3B82F6' };
  toast.style.cssText = `background:#fff;border-right:4px solid ${colors[type] || colors.info};padding:14px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.12);font-size:14px;font-family:'Noto Kufi Arabic','Inter',sans-serif;color:#111827;min-width:260px;max-width:380px;animation:slideIn .3s ease;`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .3s'; setTimeout(() => toast.remove(), 300); }, 3500);
}

/* Navbar auth state */
function initNavbar() {
  const user = api.getUser();
  const guestEls = document.querySelectorAll('.nav-guest');
  const authEls = document.querySelectorAll('.nav-auth');
  const avatarEl = document.querySelector('.nav-avatar');
  const nameEl = document.querySelector('.nav-username');

  if (user && api.isLoggedIn()) {
    guestEls.forEach(el => el.style.display = 'none');
    authEls.forEach(el => el.style.display = '');
    if (avatarEl) avatarEl.textContent = user.name ? user.name.charAt(0).toUpperCase() : '?';
    if (nameEl) nameEl.textContent = user.name || '';
  } else {
    guestEls.forEach(el => el.style.display = '');
    authEls.forEach(el => el.style.display = 'none');
  }
}

/* Listing card HTML */
function renderListingCard(listing) {
  const img = listing.images && listing.images.length ? listing.images[0] : '';
  const priceText = listing.priceType === 'free' ? 'مجاني' : `${listing.price?.toLocaleString() || 0} د.إ${listing.priceType === 'hourly' ? '/ساعة' : ''}`;
  return `
    <a href="/listing.html?id=${listing._id}" class="listing-card" style="cursor:pointer;text-decoration:none;color:inherit;">
      <div class="listing-img">${img ? `<img src="${img}" alt="${listing.title}" loading="lazy"/>` : `<div class="listing-placeholder">${getCategoryIcon(listing.category)}</div>`}</div>
      <div class="listing-body">
        <span class="listing-category">${getCategoryLabel(listing.category)}</span>
        <h3 class="listing-title">${listing.title}</h3>
        <div class="listing-meta">
          <span class="listing-price">${priceText}</span>
          ${listing.location ? `<span class="listing-location"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> ${listing.location}</span>` : ''}
        </div>
      </div>
    </a>`;
}

/* Time ago — Arabic */
function timeAgo(date) {
  const s = Math.floor((Date.now() - new Date(date)) / 1000);
  if (s < 60) return 'الآن';
  if (s < 3600) return `منذ ${Math.floor(s / 60)} دقيقة`;
  if (s < 86400) return `منذ ${Math.floor(s / 3600)} ساعة`;
  if (s < 2592000) return `منذ ${Math.floor(s / 86400)} يوم`;
  return new Date(date).toLocaleDateString('ar');
}

document.addEventListener('DOMContentLoaded', initNavbar);
