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

/* Profile dropdown */
function initProfileDropdown() {
  const style = document.createElement('style');
  style.textContent = `
    .profile-trigger{display:flex;align-items:center;gap:8px;cursor:pointer;padding:4px;border-radius:24px;transition:.15s;position:relative;}
    .profile-trigger:hover{background:#f0f0f0;}
    .profile-avatar{width:36px;height:36px;border-radius:50%;background:#13C1AC;color:#fff;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
    .profile-name{font-size:13px;font-weight:600;color:#263238;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .profile-chevron{width:16px;height:16px;color:#78909C;transition:.2s;}
    .profile-trigger.open .profile-chevron{transform:rotate(180deg);}
    .profile-menu{position:absolute;top:50px;left:0;background:#fff;border:1px solid #E8ECED;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.12);min-width:240px;display:none;overflow:hidden;z-index:999;}
    .profile-trigger.open .profile-menu{display:block;}
    .pm-header{padding:16px;border-bottom:1px solid #E8ECED;display:flex;align-items:center;gap:12px;}
    .pm-avatar{width:44px;height:44px;border-radius:50%;background:#13C1AC;color:#fff;font-size:18px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
    .pm-info{min-width:0;}
    .pm-name{font-size:14px;font-weight:700;color:#263238;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .pm-email{font-size:11px;color:#78909C;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .pm-section{padding:6px 0;}
    .pm-section+.pm-section{border-top:1px solid #E8ECED;}
    .pm-item{display:flex;align-items:center;gap:10px;padding:10px 16px;font-size:13px;font-weight:500;color:#607D8B;cursor:pointer;transition:.1s;text-decoration:none;}
    .pm-item:hover{background:#F5F5F5;color:#263238;}
    .pm-item svg{width:18px;height:18px;flex-shrink:0;}
    .pm-item.danger{color:#E53935;}
    .pm-item.danger:hover{background:#FFF5F5;}
  `;
  document.head.appendChild(style);
}

/* Navbar auth state */
function initNavbar() {
  const user = api.getUser();
  const guestEls = document.querySelectorAll('.nav-guest');
  const authEls = document.querySelectorAll('.nav-auth');

  if (user && api.isLoggedIn()) {
    guestEls.forEach(el => el.style.display = 'none');
    authEls.forEach(el => el.style.display = '');

    // Remove old avatar/dropdown if exists
    document.querySelectorAll('.topbar-avatar,.profile-trigger').forEach(el => {
      if (!el.classList.contains('profile-trigger')) el.style.display = 'none';
    });

    // Inject profile dropdown into topbar-actions or nav-right
    const container = document.querySelector('.topbar-actions') || document.querySelector('.nav-right');
    if (container && !container.querySelector('.profile-trigger')) {
      const trigger = document.createElement('div');
      trigger.className = 'profile-trigger';
      trigger.innerHTML = `
        <div class="profile-avatar">${user.name ? user.name.charAt(0).toUpperCase() : '?'}</div>
        <span class="profile-name">${user.name || ''}</span>
        <svg class="profile-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        <div class="profile-menu">
          <div class="pm-header">
            <div class="pm-avatar">${user.name ? user.name.charAt(0).toUpperCase() : '?'}</div>
            <div class="pm-info">
              <div class="pm-name">${user.name || 'مستخدم'}</div>
              <div class="pm-email">${user.email || ''}</div>
            </div>
          </div>
          <div class="pm-section">
            <a href="profile.html" class="pm-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              الملف الشخصي
            </a>
            <a href="dashboard.html" class="pm-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              لوحة التحكم
            </a>
          </div>
          <div class="pm-section">
            <a href="create-listing.html" class="pm-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              أضف إعلان جديد
            </a>
            <a href="dashboard.html" class="pm-item" onclick="setTimeout(()=>document.querySelector('[onclick*=listings]')?.click(),500)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
              إعلاناتي
            </a>
            <a href="dashboard.html" class="pm-item" onclick="setTimeout(()=>document.querySelector('[onclick*=saved]')?.click(),500)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
              المحفوظات
            </a>
            <a href="dashboard.html" class="pm-item" onclick="setTimeout(()=>document.querySelector('[onclick*=messages]')?.click(),500)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              الرسائل
            </a>
          </div>
          <div class="pm-section">
            <a href="dashboard.html" class="pm-item" onclick="setTimeout(()=>document.querySelector('[onclick*=settings]')?.click(),500)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9c.18-.63-.005-1.317-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06c.503.325 1.19.51 1.82.33A1.65 1.65 0 0010 3.09V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51c.63.18 1.317.005 1.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06c-.325.503-.51 1.19-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
              الإعدادات
            </a>
            <a href="#" class="pm-item danger" onclick="api.logout();return false;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              تسجيل الخروج
            </a>
          </div>
        </div>
      `;
      trigger.addEventListener('click', (e) => {
        if (e.target.closest('.pm-item')) return;
        trigger.classList.toggle('open');
      });
      container.appendChild(trigger);
    }
  } else {
    guestEls.forEach(el => el.style.display = '');
    authEls.forEach(el => el.style.display = 'none');
  }

  // Close on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.profile-trigger')) {
      document.querySelectorAll('.profile-trigger').forEach(t => t.classList.remove('open'));
    }
  });
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

/* ─── Sign In Modal ─── */
function initAuthModal() {
  const style = document.createElement('style');
  style.textContent = `
    .auth-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9000;display:none;align-items:center;justify-content:center;padding:16px;}
    .auth-overlay.open{display:flex;}
    .auth-modal{background:#fff;border-radius:16px;width:100%;max-width:400px;padding:32px;box-shadow:0 20px 60px rgba(0,0,0,.2);position:relative;animation:authIn .25s ease;}
    @keyframes authIn{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
    .auth-close{position:absolute;top:12px;left:12px;width:32px;height:32px;border-radius:50%;border:none;background:#F3F4F6;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.15s;color:#607D8B;}
    .auth-close:hover{background:#E8ECED;}
    .auth-tabs{display:flex;border-bottom:1px solid #E8ECED;margin-bottom:24px;}
    .auth-tab{flex:1;text-align:center;padding:10px;font-size:14px;font-weight:600;color:#B0BEC5;cursor:pointer;border-bottom:2px solid transparent;transition:.15s;font-family:'Noto Kufi Arabic',sans-serif;background:none;border-top:none;border-right:none;border-left:none;}
    .auth-tab.active{color:#13C1AC;border-bottom-color:#13C1AC;}
    .auth-title{font-size:20px;font-weight:800;color:#263238;margin-bottom:4px;}
    .auth-sub{font-size:13px;color:#78909C;margin-bottom:20px;}
    .auth-field{margin-bottom:14px;}
    .auth-field label{display:block;font-size:12px;font-weight:600;color:#607D8B;margin-bottom:5px;}
    .auth-field input{width:100%;padding:10px 14px;border:1.5px solid #E8ECED;border-radius:10px;font-size:14px;font-family:'Noto Kufi Arabic','Inter',sans-serif;color:#263238;outline:none;transition:.15s;background:#FAFAFA;}
    .auth-field input:focus{border-color:#13C1AC;box-shadow:0 0 0 3px #E6FAF7;background:#fff;}
    .auth-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
    .auth-btn{width:100%;padding:12px;border:none;border-radius:10px;background:#13C1AC;color:#fff;font-size:14px;font-weight:700;font-family:'Noto Kufi Arabic',sans-serif;cursor:pointer;transition:.15s;margin-top:6px;}
    .auth-btn:hover{background:#0EA899;}
    .auth-btn:disabled{opacity:.6;cursor:not-allowed;}
    .auth-error{color:#E53935;font-size:12px;margin-top:6px;display:none;}
    .auth-footer{text-align:center;font-size:12px;color:#B0BEC5;margin-top:16px;}
    .auth-footer a{color:#13C1AC;font-weight:600;cursor:pointer;}
    @media(max-width:480px){.auth-modal{padding:24px 20px;}}
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.className = 'auth-overlay';
  overlay.id = 'auth-modal';
  overlay.innerHTML = `
    <div class="auth-modal">
      <button class="auth-close" onclick="closeAuth()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="auth-tabs">
        <button class="auth-tab active" data-t="login" onclick="switchAuthTab('login')">تسجيل الدخول</button>
        <button class="auth-tab" data-t="register" onclick="switchAuthTab('register')">حساب جديد</button>
      </div>
      <div id="auth-login">
        <div class="auth-title">أهلاً بعودتك</div>
        <div class="auth-sub">سجّل الدخول إلى حسابك</div>
        <form onsubmit="handleAuthLogin(event)">
          <div class="auth-field">
            <label>البريد الإلكتروني</label>
            <input type="email" id="al-email" placeholder="example@email.com" required/>
          </div>
          <div class="auth-field">
            <label>كلمة المرور</label>
            <input type="password" id="al-pass" placeholder="كلمة المرور" required minlength="6"/>
          </div>
          <div class="auth-error" id="al-err"></div>
          <button type="submit" class="auth-btn" id="al-btn">تسجيل الدخول</button>
        </form>
        <div class="auth-footer">ليس لديك حساب؟ <a onclick="switchAuthTab('register')">أنشئ واحداً</a></div>
      </div>
      <div id="auth-register" style="display:none;">
        <div class="auth-title">أنشئ حسابك</div>
        <div class="auth-sub">انضم إلى ماركت هب مجاناً</div>
        <form onsubmit="handleAuthRegister(event)">
          <div class="auth-field">
            <label>الاسم الكامل</label>
            <input type="text" id="ar-name" placeholder="اسمك" required/>
          </div>
          <div class="auth-field">
            <label>البريد الإلكتروني</label>
            <input type="email" id="ar-email" placeholder="example@email.com" required/>
          </div>
          <div class="auth-row">
            <div class="auth-field">
              <label>كلمة المرور</label>
              <input type="password" id="ar-pass" placeholder="٦ أحرف +" required minlength="6"/>
            </div>
            <div class="auth-field">
              <label>الموقع</label>
              <input type="text" id="ar-loc" placeholder="المدينة"/>
            </div>
          </div>
          <div class="auth-error" id="ar-err"></div>
          <button type="submit" class="auth-btn" id="ar-btn">إنشاء الحساب</button>
        </form>
        <div class="auth-footer">لديك حساب؟ <a onclick="switchAuthTab('login')">سجّل الدخول</a></div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeAuth(); });
}

function openAuth(tab) {
  const m = document.getElementById('auth-modal');
  m.classList.add('open');
  if (tab) switchAuthTab(tab);
}
function closeAuth() { document.getElementById('auth-modal').classList.remove('open'); }
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.t === tab));
  document.getElementById('auth-login').style.display = tab === 'login' ? '' : 'none';
  document.getElementById('auth-register').style.display = tab === 'register' ? '' : 'none';
}

async function handleAuthLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('al-btn');
  const err = document.getElementById('al-err');
  btn.disabled = true; btn.textContent = 'جاري الدخول...'; err.style.display = 'none';
  try {
    const data = await api.login({ email: document.getElementById('al-email').value, password: document.getElementById('al-pass').value });
    api.setToken(data.token); api.setUser(data.user);
    closeAuth(); showToast('أهلاً بعودتك، ' + data.user.name + '!');
    setTimeout(() => location.reload(), 400);
  } catch (error) {
    err.textContent = error.error || 'فشل تسجيل الدخول'; err.style.display = 'block';
    btn.disabled = false; btn.textContent = 'تسجيل الدخول';
  }
}

async function handleAuthRegister(e) {
  e.preventDefault();
  const btn = document.getElementById('ar-btn');
  const err = document.getElementById('ar-err');
  btn.disabled = true; btn.textContent = 'جاري الإنشاء...'; err.style.display = 'none';
  try {
    const data = await api.register({ name: document.getElementById('ar-name').value, email: document.getElementById('ar-email').value, password: document.getElementById('ar-pass').value, location: document.getElementById('ar-loc').value });
    api.setToken(data.token); api.setUser(data.user);
    closeAuth(); showToast('مرحباً بك في ماركت هب!');
    setTimeout(() => location.reload(), 400);
  } catch (error) {
    err.textContent = error.error || error.errors?.[0]?.msg || 'فشل إنشاء الحساب'; err.style.display = 'block';
    btn.disabled = false; btn.textContent = 'إنشاء الحساب';
  }
}

document.addEventListener('DOMContentLoaded', () => { initProfileDropdown(); initNavbar(); initAuthModal(); });
