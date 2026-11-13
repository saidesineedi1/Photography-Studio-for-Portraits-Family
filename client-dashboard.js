const INITIAL_PROOF_PHOTOS = [
    { id: 'fam-001', ref: 'PIX-FAM-001', category: 'family', title: 'Golden Hour Embrace', src: './assets/dash-gallery-cover-family.jpg', gallery: 'autumn-family', favorited: true },
    { id: 'fam-002', ref: 'PIX-FAM-002', category: 'family', title: 'Joyful Laughter in the Sun', src: './assets/pkg-collection-family.jpg', gallery: 'autumn-family', favorited: true },
    { id: 'fam-003', ref: 'PIX-FAM-003', category: 'family', title: 'Generational Legacy', src: './assets/sd-family-1.jpg', gallery: 'autumn-family', favorited: true },
    { id: 'fam-004', ref: 'PIX-FAM-004', category: 'family', title: 'Father & Daughter Sunlight', src: './assets/sd-family-2.jpg', gallery: 'autumn-family', favorited: false },
    { id: 'mat-001', ref: 'PIX-MAT-001', category: 'maternity', title: 'Ethereal Silk Drapery', src: './assets/maternity-beach-sunset.jpg', gallery: 'maternity-legacy', favorited: true },
    { id: 'mat-002', ref: 'PIX-MAT-002', category: 'maternity', title: 'Serene Radiance', src: './assets/sd-maternity-hero.jpg', gallery: 'maternity-legacy', favorited: false },
    { id: 'por-001', ref: 'PIX-POR-001', category: 'portrait', title: 'Velvet Noir Fine-Art', src: './assets/sd-portrait-overview.jpg', gallery: 'studio-portrait', favorited: true },
    { id: 'por-002', ref: 'PIX-POR-002', category: 'portrait', title: 'Editorial Chic Shadow', src: './assets/sd-portrait-1.jpg', gallery: 'studio-portrait', favorited: false },
    { id: 'por-003', ref: 'PIX-POR-003', category: 'portrait', title: 'Intimate Light Vignette', src: './assets/sd-portrait-4.jpg', gallery: 'studio-portrait', favorited: true },
    { id: 'fam-005', ref: 'PIX-FAM-005', category: 'family', title: 'Atelier Garden Whispers', src: './assets/sd-family-3.jpg', gallery: 'autumn-family', favorited: false },
    { id: 'wed-001', ref: 'PIX-MAT-003', category: 'maternity', title: 'Motherhood & Partner Embrace', src: './assets/maternity-cornwall.jpg', gallery: 'maternity-legacy', favorited: true },
    { id: 'stu-001', ref: 'PIX-STU-001', category: 'portrait', title: 'Sculpted Chiaroscuro', src: './assets/sd-portrait-2.jpg', gallery: 'studio-portrait', favorited: false }
];
let proofPhotos = [];
let printCart = [];
let currentLightboxIndex = 0;
function initData() {
    try {
        const storedPhotos = localStorage.getItem('pixora_client_photos_v2');
        if (storedPhotos) {
            proofPhotos = JSON.parse(storedPhotos);
        } else {
            proofPhotos = [...INITIAL_PROOF_PHOTOS];
            savePhotos();
        }
        const storedCart = localStorage.getItem('pixora_print_cart_v2');
        if (storedCart) {
            printCart = JSON.parse(storedCart);
        }
    } catch (e) {
        proofPhotos = [...INITIAL_PROOF_PHOTOS];
    }
}
function savePhotos() {
    try {
        localStorage.setItem('pixora_client_photos_v2', JSON.stringify(proofPhotos));
    } catch (e) { }
}
function saveCart() {
    try {
        localStorage.setItem('pixora_print_cart_v2', JSON.stringify(printCart));
    } catch (e) { }
}
function showToast(message, icon = 'check-circle') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<i data-lucide="${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}
function switchTab(tabId) {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.dashboard-view').forEach(view => {
        view.classList.toggle('active', view.id === tabId);
    });
    const titleMap = {
        'tab-overview': 'Overview & Summary',
        'tab-bookings': 'My Photography Sessions',
        'tab-galleries': 'Private Photo Galleries',
        'tab-favorites': 'Curated Favorites',
        'tab-orders': 'Print Products & Keepsakes',
        'tab-profile': 'Client Profile & Settings',
        'tab-support': 'Studio Support & Concierge'
    };
    const headerTitle = document.getElementById('headerViewTitle');
    if (headerTitle && titleMap[tabId]) {
        headerTitle.textContent = titleMap[tabId];
    }
    closeMobileSidebar();
    if (tabId === 'tab-favorites') renderFavoritesGrid();
    if (tabId === 'tab-galleries') renderGalleryGrid('all');
    if (tabId === 'tab-orders') renderCartDisplay();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function openMobileSidebar() {
    const sidebar = document.getElementById('dashboardSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.add('mobile-open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeMobileSidebar() {
    const sidebar = document.getElementById('dashboardSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
}
function toggleFavorite(photoId, e) {
    if (e) e.stopPropagation();
    const photo = proofPhotos.find(p => p.id === photoId);
    if (!photo) return;
    photo.favorited = !photo.favorited;
    savePhotos();
    updateFavoritesCount();
    if (photo.favorited) {
        showToast(`Saved ${photo.ref} to Your Favorites!`, 'heart');
    } else {
        showToast(`Removed ${photo.ref} from Favorites`, 'heart-off');
    }
    const activeView = document.querySelector('.dashboard-view.active');
    if (activeView && activeView.id === 'tab-favorites') {
        renderFavoritesGrid();
    } else {
        renderGalleryGrid();
    }
}
function updateFavoritesCount() {
    const favCount = proofPhotos.filter(p => p.favorited).length;
    const badges = document.querySelectorAll('.favorites-badge-count, #kpiFavoritesCount, #headerFavCount');
    badges.forEach(b => b.textContent = favCount);
    const statsElem = document.getElementById('proofFavStats');
    if (statsElem) statsElem.textContent = favCount;
}
function renderGalleryGrid(filter = 'all') {
    const container = document.getElementById('proofPhotoGrid');
    if (!container) return;
    let items = proofPhotos;
    if (filter === 'favorites') {
        items = proofPhotos.filter(p => p.favorited);
    } else if (filter !== 'all') {
        items = proofPhotos.filter(p => p.category === filter || p.gallery === filter);
    }
    if (items.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i data-lucide="image-off" style="width: 40px; height: 40px; margin-bottom: 10px; color: var(--gold);"></i>
                <p>No photographs found matching this selection.</p>
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
    }
    container.innerHTML = items.map((photo, idx) => `
        <div class="proof-photo-card" data-id="${photo.id}">
            <div class="proof-img-container" onclick="openLightbox('${photo.id}')">
                <img src="${photo.src}" alt="${photo.title}" class="proof-img" loading="lazy">
                <button class="btn-fav-toggle ${photo.favorited ? 'favorited' : ''}" 
                        onclick="toggleFavorite('${photo.id}', event)" 
                        title="${photo.favorited ? 'Remove Favorite' : 'Save as Favorite'}">
                    <i data-lucide="heart" ${photo.favorited ? 'style="fill: currentColor;"' : ''}></i>
                </button>
            </div>
            <div class="proof-card-footer">
                <span class="proof-ref-tag">${photo.ref}</span>
                <span style="font-size: 11px; text-transform: capitalize;">${photo.category}</span>
            </div>
        </div>
    `).join('');
    if (window.lucide) window.lucide.createIcons();
    updateFavoritesCount();
}
function renderFavoritesGrid() {
    const container = document.getElementById('favoritesPhotoGrid');
    const emptyBox = document.getElementById('emptyFavoritesNotice');
    if (!container) return;
    const favorites = proofPhotos.filter(p => p.favorited);
    if (favorites.length === 0) {
        if (emptyBox) emptyBox.style.display = 'block';
        container.innerHTML = '';
        return;
    }
    if (emptyBox) emptyBox.style.display = 'none';
    container.innerHTML = favorites.map(photo => `
        <div class="proof-photo-card" data-id="${photo.id}">
            <div class="proof-img-container" onclick="openLightbox('${photo.id}')">
                <img src="${photo.src}" alt="${photo.title}" class="proof-img" loading="lazy">
                <button class="btn-fav-toggle favorited" onclick="toggleFavorite('${photo.id}', event)" title="Remove Favorite">
                    <i data-lucide="heart" style="fill: currentColor;"></i>
                </button>
            </div>
            <div class="proof-card-footer">
                <span class="proof-ref-tag">${photo.ref}</span>
                <button class="btn-gold" style="padding: 5px 12px; font-size: 11px;" onclick="quickAddPrintOrder('${photo.id}', event)">
                    <i data-lucide="shopping-bag" style="width: 13px; height: 13px;"></i> Order Print
                </button>
            </div>
        </div>
    `).join('');
    if (window.lucide) window.lucide.createIcons();
    updateFavoritesCount();
}
function openLightbox(photoId) {
    const modal = document.getElementById('lightboxModal');
    if (!modal) return;
    currentLightboxIndex = proofPhotos.findIndex(p => p.id === photoId);
    if (currentLightboxIndex === -1) currentLightboxIndex = 0;
    updateLightboxContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}
function nextLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % proofPhotos.length;
    updateLightboxContent();
}
function prevLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + proofPhotos.length) % proofPhotos.length;
    updateLightboxContent();
}
function updateLightboxContent() {
    const photo = proofPhotos[currentLightboxIndex];
    if (!photo) return;
    const img = document.getElementById('lightboxImg');
    const title = document.getElementById('lightboxTitle');
    const counter = document.getElementById('lightboxCounter');
    const favBtn = document.getElementById('lightboxFavBtn');
    if (img) img.src = photo.src;
    if (title) title.textContent = `${photo.ref} • ${photo.title}`;
    if (counter) counter.textContent = `Photo ${currentLightboxIndex + 1} of ${proofPhotos.length}`;
    if (favBtn) {
        favBtn.className = `btn-gold ${photo.favorited ? 'active' : ''}`;
        favBtn.innerHTML = `<i data-lucide="heart" ${photo.favorited ? 'style="fill: currentColor;"' : ''}></i> ${photo.favorited ? 'Favorited' : 'Save Favorite'}`;
        favBtn.onclick = () => {
            toggleFavorite(photo.id);
            updateLightboxContent();
        };
    }
    if (window.lucide) window.lucide.createIcons();
}
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightboxModal');
    if (modal && modal.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightboxImage();
        if (e.key === 'ArrowLeft') prevLightboxImage();
    }
});
let bookingStep = 1;
let currentBookingDraft = {
    type: 'Family Photography',
    package: 'The Signature Heirloom Collection ($1,450)',
    date: 'Saturday, Dec 19, 2026',
    time: '10:00 AM',
    location: 'Pixora Studio Atelier, Jubilee Hills',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    phone: '+91 98765 43210',
    notes: ''
};
function openBookingModal() {
    bookingStep = 1;
    showBookingStep(1);
    const modal = document.getElementById('bookingModal');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}
function showBookingStep(step) {
    bookingStep = step;
    document.querySelectorAll('.booking-step-panel').forEach(p => p.style.display = 'none');
    const activePanel = document.getElementById(`bookingStep${step}`);
    if (activePanel) activePanel.style.display = 'block';
    document.querySelectorAll('.wizard-step-indicator').forEach((ind, idx) => {
        ind.classList.toggle('active', idx + 1 === step);
        ind.classList.toggle('completed', idx + 1 < step);
    });
    if (step === 5) {
        const summaryBox = document.getElementById('bookingReviewSummary');
        if (summaryBox) {
            summaryBox.innerHTML = `
                <div style="background: var(--bg-card-inner); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-gold);">
                    <h4 style="font-family: 'Cinzel', serif; color: var(--gold); margin-bottom: 12px; font-size: 16px;">Booking Summary</h4>
                    <p style="font-size: 13px; margin-bottom: 6px;"><strong>Session Type:</strong> ${currentBookingDraft.type}</p>
                    <p style="font-size: 13px; margin-bottom: 6px;"><strong>Package:</strong> ${currentBookingDraft.package}</p>
                    <p style="font-size: 13px; margin-bottom: 6px;"><strong>Date & Time:</strong> ${currentBookingDraft.date} at ${currentBookingDraft.time}</p>
                    <p style="font-size: 13px; margin-bottom: 6px;"><strong>Studio Location:</strong> ${currentBookingDraft.location}</p>
                    <p style="font-size: 13px; margin-bottom: 6px;"><strong>Client:</strong> ${currentBookingDraft.name} (${currentBookingDraft.phone})</p>
                </div>
            `;
        }
    }
}
function nextBookingStep() {
    if (bookingStep === 1) {
        const selectedType = document.querySelector('input[name="bookingType"]:checked');
        if (selectedType) currentBookingDraft.type = selectedType.value;
    } else if (bookingStep === 2) {
        const selectedPkg = document.querySelector('input[name="bookingPackage"]:checked');
        if (selectedPkg) currentBookingDraft.package = selectedPkg.value;
    } else if (bookingStep === 3) {
        const dateInput = document.getElementById('bookingDateSelect');
        const timeInput = document.getElementById('bookingTimeSelect');
        if (dateInput && dateInput.value) currentBookingDraft.date = dateInput.value;
        if (timeInput && timeInput.value) currentBookingDraft.time = timeInput.value;
    } else if (bookingStep === 4) {
        const nameInput = document.getElementById('bookingClientName');
        const emailInput = document.getElementById('bookingClientEmail');
        const phoneInput = document.getElementById('bookingClientPhone');
        const notesInput = document.getElementById('bookingClientNotes');
        if (nameInput) currentBookingDraft.name = nameInput.value;
        if (emailInput) currentBookingDraft.email = emailInput.value;
        if (phoneInput) currentBookingDraft.phone = phoneInput.value;
        if (notesInput) currentBookingDraft.notes = notesInput.value;
    }
    if (bookingStep < 5) {
        showBookingStep(bookingStep + 1);
    }
}
function prevBookingStep() {
    if (bookingStep > 1) {
        showBookingStep(bookingStep - 1);
    }
}
function confirmNewBooking() {
    const newRef = `#PIX-BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBookingCard = `
        <div class="booking-item-card">
            <div class="booking-col-main">
                <span class="booking-ref-badge">${newRef} • ${currentBookingDraft.type}</span>
                <h3>${currentBookingDraft.package.split('(')[0]}</h3>
                <span class="status-badge pending"><i data-lucide="clock"></i> Studio Reviewing</span>
            </div>
            <div class="booking-col-meta">
                <div><i data-lucide="calendar"></i> <span>${currentBookingDraft.date}</span></div>
                <div><i data-lucide="clock"></i> <span>${currentBookingDraft.time}</span></div>
                <div><i data-lucide="map-pin"></i> <span>${currentBookingDraft.location}</span></div>
            </div>
            <div class="booking-col-actions">
                <button class="btn-gold" style="padding: 7px 16px; font-size: 12px;" onclick="showToast('Session details sent to your email!')">
                    <i data-lucide="info"></i> Session Details
                </button>
            </div>
        </div>
    `;
    const list = document.getElementById('activeBookingsList');
    if (list) {
        list.insertAdjacentHTML('afterbegin', newBookingCard);
        if (window.lucide) window.lucide.createIcons();
    }
    closeBookingModal();
    showToast(`Session Booking Request ${newRef} Submitted Successfully!`, 'calendar-check');
}
function quickAddPrintOrder(photoId, e) {
    if (e) e.stopPropagation();
    const photo = proofPhotos.find(p => p.id === photoId);
    if (!photo) return;
    printCart.push({
        id: 'cart-' + Date.now(),
        photoId: photo.id,
        photoRef: photo.ref,
        photoSrc: photo.src,
        product: 'Museum Fine Art Cotton Rag Print',
        size: '11x14 Archival',
        price: 75,
        qty: 1
    });
    saveCart();
    showToast(`Added ${photo.ref} (11x14 Print) to your Keepsake Cart!`, 'shopping-bag');
    updateCartCount();
    switchTab('tab-orders');
}
function addProductToCart(productName, price, sizeSelectId) {
    const sizeElem = document.getElementById(sizeSelectId);
    const size = sizeElem ? sizeElem.value : 'Standard Size';
    const fav = proofPhotos.find(p => p.favorited) || proofPhotos[0];
    printCart.push({
        id: 'cart-' + Date.now(),
        photoId: fav.id,
        photoRef: fav.ref,
        photoSrc: fav.src,
        product: productName,
        size: size,
        price: price,
        qty: 1
    });
    saveCart();
    showToast(`Added ${productName} (${size}) to Cart!`, 'shopping-bag');
    updateCartCount();
    renderCartDisplay();
}
function removeCartItem(cartId) {
    printCart = printCart.filter(item => item.id !== cartId);
    saveCart();
    updateCartCount();
    renderCartDisplay();
    showToast('Removed item from cart', 'trash-2');
}
function updateCartCount() {
    const badge = document.getElementById('cartItemsCountBadge');
    if (badge) badge.textContent = printCart.length;
}
function renderCartDisplay() {
    const cartItemsList = document.getElementById('printCartItemsList');
    const totalElem = document.getElementById('printCartTotalAmount');
    if (!cartItemsList) return;
    if (printCart.length === 0) {
        cartItemsList.innerHTML = `
            <div style="text-align: center; padding: 30px; color: var(--text-muted);">
                <i data-lucide="shopping-bag" style="width: 36px; height: 36px; margin-bottom: 8px; color: var(--gold);"></i>
                <p>Your keepsake cart is currently empty.</p>
                <p style="font-size: 11.5px; margin-top: 4px;">Select any photo from your galleries or favorites to order prints.</p>
            </div>
        `;
        if (totalElem) totalElem.textContent = '$0.00';
        if (window.lucide) window.lucide.createIcons();
        return;
    }
    let sum = 0;
    cartItemsList.innerHTML = printCart.map(item => {
        sum += (item.price * item.qty);
        return `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border-subtle);">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${item.photoSrc}" style="width: 50px; height: 50px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--border-gold);">
                    <div>
                        <strong style="font-size: 13.5px; color: var(--text-primary); display: block;">${item.product}</strong>
                        <span style="font-size: 11.5px; color: var(--text-muted);">${item.photoRef} • ${item.size}</span>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 14px;">
                    <span style="font-weight: 700; color: var(--text-gold); font-size: 14px;">$${item.price}</span>
                    <button onclick="removeCartItem('${item.id}')" style="background: transparent; border: none; color: #EF4444; cursor: pointer;">
                        <i data-lucide="x" style="width: 16px; height: 16px;"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    if (totalElem) totalElem.textContent = `$${sum.toFixed(2)}`;
    if (window.lucide) window.lucide.createIcons();
}
function submitPrintOrder() {
    if (printCart.length === 0) {
        showToast('Please add at least one print product to order', 'alert-circle');
        return;
    }
    const orderRef = `#PIX-PR-${Math.floor(1000 + Math.random() * 9000)}`;
    const tableBody = document.getElementById('ordersTableBody');
    if (tableBody) {
        const firstItem = printCart[0];
        const newRow = `
            <tr>
                <td><strong>${orderRef}</strong></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${firstItem.photoSrc}" style="width: 36px; height: 36px; border-radius: 4px; object-fit: cover;">
                        <span>${firstItem.product} (${printCart.length} item${printCart.length > 1 ? 's' : ''})</span>
                    </div>
                </td>
                <td>Just now</td>
                <td><span class="status-badge pending"><i data-lucide="clock"></i> In Production</span></td>
                <td>$${printCart.reduce((acc, i) => acc + i.price, 0)}</td>
                <td>
                    <button class="btn-outline-gold" style="padding: 4px 10px; font-size: 11px;" onclick="showToast('Tracking details will be emailed once dispatched!')">
                        Track Order
                    </button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('afterbegin', newRow);
    }
    printCart = [];
    saveCart();
    renderCartDisplay();
    updateCartCount();
    showToast(`Print Order ${orderRef} Placed Successfully! Sent to Master Lab.`, 'package-check');
}
function saveProfileChanges(e) {
    if (e) e.preventDefault();
    const firstName = document.getElementById('profileFirstName')?.value || 'Eleanor';
    const lastName = document.getElementById('profileLastName')?.value || 'Vance';
    const headerName = document.querySelector('.header-user-name');
    if (headerName) headerName.textContent = `${firstName} ${lastName}`;
    const welcomeHeader = document.querySelector('.header-welcome-text h1');
    if (welcomeHeader) welcomeHeader.textContent = `Welcome back, ${firstName}`;
    showToast('Profile and Delivery Settings Saved Successfully!', 'check-circle');
}
function toggleFaqItem(element) {
    const parent = element.closest('.faq-item');
    if (!parent) return;
    parent.classList.toggle('active');
}
function submitSupportTicket(e) {
    if (e) e.preventDefault();
    const msg = document.getElementById('supportMsgInput');
    if (msg) msg.value = '';
    showToast('Concierge message dispatched! We will reply within 2 hours.', 'send');
}
function toggleDropdown(panelId) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    const isShowing = panel.classList.contains('active');
    document.querySelectorAll('.user-dropdown-panel, .notifications-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.header-user-menu').forEach(m => m.classList.remove('active'));
    if (!isShowing) {
        panel.classList.add('active');
        const parentMenu = panel.closest('.header-user-menu');
        if (parentMenu) parentMenu.classList.add('active');
    }
}
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-user-menu, .header-notif-menu')) {
        document.querySelectorAll('.user-dropdown-panel, .notifications-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.header-user-menu').forEach(m => m.classList.remove('active'));
    }
});
document.addEventListener('DOMContentLoaded', () => {
    initData();
    renderGalleryGrid();
    renderFavoritesGrid();
    renderCartDisplay();
    updateFavoritesCount();
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
