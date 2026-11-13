
const SERVICES_DATA = {
    portrait: {
        title: "Portrait Photography",
        subtitle: "Fine Art Studio & Character Portraits",
        pill: "Fine Art Studio & Editorial",
        description: "Sculpted studio lighting, editorial styling, and authentic human expression. From intimate individual portraits to creative personal branding, each session reveals your true character with museum-grade craftsmanship.",
        heroImg: "./assets/sd-portrait-hero.jpg",
        overviewImg: "./assets/sd-portrait-overview.jpg",
        statValue: "1200+",
        statLabel: "Portraits Crafted",
        duration: "2–4 Hours",
        outfits: "Up to 4 Outfits",
        delivery: "5–7 Days",
        checks: [
            "Private Studio & Controlled Lighting",
            "Professional Posing Guidance",
            "Wardrobe Styling & Moodboards",
            "High-Resolution Master Retouching",
            "Private Online Proofing Suite",
            "Print Rights & Web Licensing"
        ],
        works: [
            { img: "./assets/sd-portrait-1.jpg", tag: "Studio Portrait", title: "The Classic Character", tall: true },
            { img: "./assets/sd-portrait-2.jpg", tag: "Editorial Look", title: "Natural Radiance", tall: false },
            { img: "./assets/sd-portrait-3.jpg", tag: "Dramatic Light", title: "Sculpted Shadows", tall: false },
            { img: "./assets/sd-portrait-4.jpg", tag: "Fine Art", title: "Modern Elegance", tall: false }
        ]
    },
    family: {
        title: "Family Photography",
        subtitle: "Generational Heirlooms & Spontaneous Joy",
        pill: "Generational Legacy & Milestones",
        description: "Unposed laughter, gentle connections, and generational milestones. We create a relaxed studio sanctuary where children and families interact naturally and joyfully, preserving love for generations to come.",
        heroImg: "./assets/home-gallery-family-candid.jpg",
        overviewImg: "./assets/hero-family-banner.jpg",
        statValue: "850+",
        statLabel: "Families Celebrated",
        duration: "2–3 Hours",
        outfits: "2–3 Outfit Changes",
        delivery: "7–10 Days",
        checks: [
            "Multi-Generational Group Arrangements",
            "Child & Newborn-Friendly Sanctuary",
            "Spontaneous Candid Moments",
            "Full Family & Individual Breakouts",
            "Handcrafted Archival Album Options",
            "Private Proofing Digital Gallery"
        ],
        works: [
            { img: "./assets/sd-family-1.jpg", tag: "Family Legacy", title: "Generational Bonds", tall: true },
            { img: "./assets/sd-family-2.jpg", tag: "Celebration", title: "Ties of Love", tall: false },
            { img: "./assets/sd-family-3.jpg", tag: "Portraits", title: "Pure Joy", tall: false },
            { img: "./assets/sd-family-4.jpg", tag: "Outdoor Session", title: "Golden Hour Glow", tall: false }
        ]
    },
    maternity: {
        title: "Maternity Photography",
        subtitle: "Ethereal Motherhood & New Beginnings",
        pill: "Motherhood & Intimate Grace",
        description: "Honoring the quiet beauty and anticipation of new life. Includes luxury wardrobe styling, couture fabrics, artistic lighting tailored to illuminate motherhood, and intimate partner inclusion.",
        heroImg: "./assets/sd-maternity-hero.jpg",
        overviewImg: "./assets/srv-card-maternity.jpg",
        statValue: "600+",
        statLabel: "Mothers Honored",
        duration: "2–3 Hours",
        outfits: "3 Couture Looks",
        delivery: "5–7 Days",
        checks: [
            "Complimentary Couture Gown Closet",
            "Gentle Posing for Expecting Mothers",
            "Partner & Sibling Inclusion",
            "Sculptural Backlighting Techniques",
            "Hair & Makeup Coordination",
            "Fine Art Gallery Presentation"
        ],
        works: [
            { img: "./assets/maternity-cornwall.jpg", tag: "Maternity Art", title: "The Miracle of Life", tall: true },
            { img: "./assets/sd-maternity-2.jpg", tag: "Couples Embrace", title: "Awaiting Our Baby", tall: false },
            { img: "./assets/maternity-bump-studio.jpg", tag: "Couture Styling", title: "Radiant Grace", tall: false },
            { img: "./assets/maternity-jayd.jpg", tag: "Studio Portrait", title: "Serene Strength", tall: false }
        ]
    },
    wedding: {
        title: "Wedding & Pre-Wedding",
        subtitle: "Cinematic Romances & Grand Memories",
        pill: "Grand Weddings & Pre-Weddings",
        description: "Full-spectrum cinematic wedding coverage capturing authentic emotions, timeless candids, drone perspectives, and heirloom albums that let you relive your celebration for decades.",
        heroImg: "./assets/sd-wedding-hero.jpg",
        overviewImg: "./assets/home2-collection-wedding.jpg",
        statValue: "500+",
        statLabel: "Weddings Preserved",
        duration: "Full Day / Multi-Day",
        outfits: "Unlimited Outfits",
        delivery: "14–21 Days",
        checks: [
            "Two Master Photographers & Assistants",
            "Drone Aerial Footage & Angles",
            "Full Day Unobtrusive Candid Coverage",
            "Same-Week Teaser Highlights",
            "Italian Leather Bound Albums",
            "Full Resolution Archival Downloads"
        ],
        works: [
            { img: "./assets/sd-wedding-1.jpg", tag: "Royal Wedding", title: "The Sacred Vows", tall: true },
            { img: "./assets/sd-wedding-2.jpg", tag: "Pre-Wedding", title: "Whispered Promises", tall: false },
            { img: "./assets/sd-wedding-3.jpg", tag: "Destination", title: "Love in Twilight", tall: false },
            { img: "./assets/sd-wedding-4.jpg", tag: "Outdoor Magic", title: "Sunset Romance", tall: false }
        ]
    }
};

function renderService(serviceKey) {
    const data = SERVICES_DATA[serviceKey] || SERVICES_DATA.portrait;

    const heroTitle = document.getElementById("sdHeroTitle");
    const heroSubtitle = document.getElementById("sdHeroSubtitle");
    const heroPill = document.getElementById("sdHeroPill");
    const heroImg = document.getElementById("sdHeroImg");
    const heroBreadcrumb = document.getElementById("sdHeroBreadcrumb");
    const durationChip = document.getElementById("sdDurationChip");
    const outfitsChip = document.getElementById("sdOutfitsChip");
    const deliveryChip = document.getElementById("sdDeliveryChip");
    const ratingStatVal = document.getElementById("sdRatingStatVal");
    const ratingStatLbl = document.getElementById("sdRatingStatLbl");

    if (heroTitle) heroTitle.innerHTML = data.title;
    if (heroSubtitle) heroSubtitle.textContent = data.description;
    if (heroPill) heroPill.innerHTML = `<i data-lucide="sparkles"></i> ${data.pill}`;
    if (heroImg) heroImg.src = data.heroImg;
    if (heroBreadcrumb) heroBreadcrumb.textContent = data.title;
    if (durationChip) durationChip.textContent = data.duration;
    if (outfitsChip) outfitsChip.textContent = data.outfits;
    if (deliveryChip) deliveryChip.textContent = data.delivery;
    if (ratingStatVal) ratingStatVal.textContent = data.statValue;
    if (ratingStatLbl) ratingStatLbl.textContent = data.statLabel;

    const overviewTitle = document.getElementById("sdOverviewTitle");
    const overviewImg = document.getElementById("sdOverviewImg");
    const checksContainer = document.getElementById("sdChecksContainer");

    if (overviewTitle) overviewTitle.innerHTML = `The Art Behind Our <span class="highlight">${data.title}</span>`;
    if (overviewImg) overviewImg.src = data.overviewImg;

    if (checksContainer) {
        checksContainer.innerHTML = data.checks.map(check => `
            <div class="sd-check-item">
                <i data-lucide="check-circle-2"></i>
                <span>${check}</span>
            </div>
        `).join("");
    }

    const worksContainer = document.getElementById("sdWorksContainer");
    if (worksContainer) {
        worksContainer.innerHTML = data.works.map(item => `
            <div class="sd-work-card ${item.tall ? 'tall' : ''}">
                <img src="${item.img}" alt="${item.title}">
                <div class="sd-work-meta">
                    <span>${item.tag}</span>
                    <h4>${item.title}</h4>
                </div>
            </div>
        `).join("");
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }

    document.querySelectorAll(".sd-tab-btn").forEach(btn => {
        if (btn.getAttribute("data-service") === serviceKey) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get("service") || "portrait";
    renderService(serviceParam);

    document.querySelectorAll(".sd-tab-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const serviceKey = this.getAttribute("data-service");
            if (serviceKey) {
                history.pushState(null, "", `?service=${serviceKey}`);
                renderService(serviceKey);
            }
        });
    });
});

