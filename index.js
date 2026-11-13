

(function () {
    try {
        const isLight = localStorage.getItem("theme") === "light";
        if (isLight) {
            document.body.classList.add("light-mode");
        }
        if (localStorage.getItem("direction") === "rtl") {
            document.body.classList.add("rtl");
            document.documentElement.dir = "rtl";
        } else {
            document.documentElement.dir = "ltr";
        }
    } catch (e) {
        console.error("Storage error:", e);
    }
})();

function refreshLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

function updateThemeUI(isLight) {
    const themeBtn = document.getElementById("themeBtn");
    const mobileThemeBtn = document.getElementById("mobileThemeBtn");
    const mobileThemeText = document.getElementById("mobileThemeText");

    if (themeBtn) {
        themeBtn.innerHTML = isLight ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
        themeBtn.setAttribute("aria-label", isLight ? "Switch to Dark Mode" : "Switch to Light Mode");
    }

    if (mobileThemeBtn) {
        const iconHtml = isLight ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
        const label = isLight ? 'Light Mode' : 'Dark Mode';
        mobileThemeBtn.innerHTML = `${iconHtml} <span id="mobileThemeText">${label}</span>`;
        mobileThemeBtn.setAttribute("aria-label", isLight ? "Switch to Dark Mode" : "Switch to Light Mode");
    } else if (mobileThemeText) {
        mobileThemeText.textContent = isLight ? 'Light Mode' : 'Dark Mode';
    }

    refreshLucideIcons();
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    try {
        localStorage.setItem("theme", isLight ? "light" : "dark");
    } catch (e) { }
    updateThemeUI(isLight);
}

function updateRtlUI(isRtl) {
    const rtlBtn = document.getElementById("rtlBtn");
    const mobileRtlBtn = document.getElementById("mobileRtlBtn");
    const mobileRtlText = document.getElementById("mobileRtlText");

    const text = isRtl ? "LTR" : "RTL";

    if (rtlBtn) {
        rtlBtn.textContent = text;
        rtlBtn.setAttribute("aria-label", isRtl ? "Switch to Left to Right" : "Switch to Right to Left");
    }

    if (mobileRtlBtn) {
        mobileRtlBtn.innerHTML = `<i data-lucide="languages"></i> <span id="mobileRtlText">${text}</span>`;
        mobileRtlBtn.setAttribute("aria-label", isRtl ? "Switch to Left to Right" : "Switch to Right to Left");
    } else if (mobileRtlText) {
        mobileRtlText.textContent = text;
    }

    refreshLucideIcons();
}

function toggleDirection() {
    document.body.classList.toggle("rtl");
    const isRtl = document.body.classList.contains("rtl");

    if (isRtl) {
        document.documentElement.dir = "rtl";
        try { localStorage.setItem("direction", "rtl"); } catch (e) { }
    } else {
        document.documentElement.dir = "ltr";
        try { localStorage.setItem("direction", "ltr"); } catch (e) { }
    }

    updateRtlUI(isRtl);
}

function openMobileNav() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const overlay = document.getElementById("mobileNavOverlay");
    const backdrop = document.getElementById("mobileNavBackdrop");
    document.body.classList.add("nav-open");
    if (overlay) overlay.classList.add("active");
    if (backdrop) backdrop.classList.add("active");
    if (hamburgerBtn) hamburgerBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
}

function closeMobileNav() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const overlay = document.getElementById("mobileNavOverlay");
    const backdrop = document.getElementById("mobileNavBackdrop");
    document.body.classList.remove("nav-open");
    if (overlay) overlay.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
    if (hamburgerBtn) hamburgerBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
}

function toggleMobileNav() {
    const isOpen = document.body.classList.contains("nav-open");
    isOpen ? closeMobileNav() : openMobileNav();
}

document.addEventListener("click", function (e) {

    if (e.target.closest("#hamburgerBtn, .hamburger-btn")) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileNav();
        return;
    }

    if (e.target.closest("#mobileCloseBtn, .mobile-close-btn")) {
        e.preventDefault();
        closeMobileNav();
        return;
    }

    if (e.target.id === "mobileNavBackdrop" || e.target.classList.contains("mobile-nav-backdrop")) {
        closeMobileNav();
        return;
    }

    if (e.target.closest(".mobile-nav-link, .mobile-login-btn")) {
        closeMobileNav();
        return;
    }

    if (e.target.closest("#themeBtn")) {
        e.preventDefault();
        toggleTheme();
        return;
    }

    if (e.target.closest("#mobileThemeBtn")) {
        e.preventDefault();
        toggleTheme();
        return;
    }

    if (e.target.closest("#rtlBtn")) {
        e.preventDefault();
        toggleDirection();
        return;
    }

    if (e.target.closest("#mobileRtlBtn")) {
        e.preventDefault();
        toggleDirection();
        return;
    }

    const faqQuestion = e.target.closest(".faq-question");
    if (faqQuestion) {
        const item = faqQuestion.closest(".faq-item");
        if (item) {
            const container = item.closest(".srv-faq-container, .faq-container") || document;
            const isOpen = item.classList.contains("active");

            container.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));

            if (!isOpen) {
                item.classList.add("active");
            }
        }
    }
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        closeMobileNav();
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 992 && document.body.classList.contains("nav-open")) {
        closeMobileNav();
    }
});

function updateActiveNavLinks() {
    try {
        const path = window.location.pathname;
        let page = path.split("/").pop().toLowerCase();

        if (!page || page === "" || page === "/") {
            page = "index.html";
        }

        page = page.split("?")[0].split("#")[0];

        const targetPage = (page === "service-details.html") ? "services.html" : page;

        const desktopLinks = document.querySelectorAll("nav ul > li > a, .dropdown-menu li a");
        const mobileLinks = document.querySelectorAll(".mobile-nav-link");

        const isMatch = (href) => {
            if (!href) return false;
            const linkPage = href.split("/").pop().toLowerCase().split("?")[0].split("#")[0];
            return linkPage === targetPage;
        };

        desktopLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (isMatch(href)) {
                link.classList.add("nav-active");
                const parentDropdown = link.closest(".dropdown");
                if (parentDropdown) {
                    const dropdownBtn = parentDropdown.querySelector(".dropdown-btn");
                    if (dropdownBtn) dropdownBtn.classList.add("nav-active");
                }
            } else if (!link.closest(".dropdown") || (targetPage !== "index.html" && targetPage !== "home2.html")) {
                link.classList.remove("nav-active");
            }
        });

        if (targetPage === "index.html" || targetPage === "home2.html") {
            const homeDropdownBtn = document.querySelector(".dropdown-btn");
            if (homeDropdownBtn) homeDropdownBtn.classList.add("nav-active");
        }

        mobileLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (isMatch(href)) {
                link.classList.add("nav-active");
            } else {
                link.classList.remove("nav-active");
            }
        });
    } catch (e) {
        console.error("Error updating active nav link:", e);
    }
}

function initApp() {
    const isLight = localStorage.getItem("theme") === "light";
    updateThemeUI(isLight);

    const isRtl = localStorage.getItem("direction") === "rtl";
    updateRtlUI(isRtl);

    updateActiveNavLinks();

    refreshLucideIcons();

    setTimeout(() => {
        document.body.classList.add("theme-initialized");
    }, 100);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}