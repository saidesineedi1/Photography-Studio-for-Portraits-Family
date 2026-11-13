document.addEventListener("DOMContentLoaded", function () {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }

    const collectionData = {
        portrait: {
            title: "The Signature Portrait Collection",
            category: "Fine-Art Portraiture & Personal Branding",
            price: "₹9,999",
            summary: "A private studio experience tailored to showcase your authentic character, quiet confidence, and personal aesthetic through masterful studio lighting and thoughtful direction.",
            features: [
                "2 Hours of dedicated studio and natural light coverage",
                "50 Hand-Retouched master high-resolution JPEG files",
                "Up to 3 Wardrobe changes with personal styling prep guide",
                "Private password-protected digital proofing & download suite",
                "Full personal print release with zero watermark restrictions",
                "Set of 5 complimentary 5x7 archival fine-art proof prints",
                "Turnaround: 7–10 business days with progress tracking"
            ],
            targetUrl: "contact.html?package=portrait"
        },
        family: {
            title: "The Family Legacy Collection",
            category: "Generational Kinship & Milestone Celebration",
            price: "₹29,999",
            summary: "Our signature family experience celebrates genuine embraces, unscripted laughter, and generational connection in a relaxed, comfortable environment where children feel free to be themselves.",
            features: [
                "4 to 6 Hours of comprehensive coverage in studio or scenic outdoor sanctuary",
                "Includes up to 6 family members (grandparents & extended family welcome)",
                "250 Hand-Retouched master high-resolution digital files",
                "10x10 Handcrafted Japanese linen flush-mount album (20 archival pages)",
                "Private online cloud gallery with 1-Year cloud storage & mobile app",
                "Complimentary prep guide covering clothing harmony & toddler pacing",
                "Turnaround: 10–14 business days with custom preview highlights"
            ],
            targetUrl: "contact.html?package=family"
        },
        maternity: {
            title: "The Ethereal Maternity Collection",
            category: "Motherhood & New Beginnings",
            price: "₹29,999",
            summary: "Designed to honor the quiet beauty, strength, and anticipation of motherhood. Includes full access to our curated client wardrobe of couture gowns, silk fabrics, and artistic lighting.",
            features: [
                "3 Hours relaxed, unhurried private studio session",
                "Full access to luxury designer gowns, silk fabrics & couture draping",
                "100 Hand-Retouched fine-art master photographs",
                "Partner & sibling inclusion warmly welcomed at no extra charge",
                "Private digital proofing suite with full resolution downloads",
                "Handcrafted keepsake archival print box with 10 matted fine-art prints",
                "Turnaround: 7–12 business days with priority rush options available"
            ],
            targetUrl: "contact.html?package=maternity"
        }
    };

    const modal = document.getElementById("collectionModal");
    const backdrop = document.getElementById("collectionModalBackdrop");
    const closeBtn = document.getElementById("modalCloseBtn");
    const dynamicContent = document.getElementById("modalDynamicContent");

    function openCollectionModal(key) {
        const data = collectionData[key];
        if (!data || !dynamicContent || !modal || !backdrop) return;

        let featuresHtml = data.features.map(f => `<li><i data-lucide="check-circle"></i> <span>${f}</span></li>`).join("");

        dynamicContent.innerHTML = `
            <span class="sub-title" style="margin-bottom:10px;"><i data-lucide="sparkles"></i> ${data.category}</span>
            <h3 id="modalTitle">${data.title}</h3>
            <div class="modal-price">${data.price}</div>
            <p>${data.summary}</p>
            <h4 style="font-family:'Cinzel',serif; color:#FFFFFF; margin-bottom:12px; font-size:16px;">What's Included in This Collection:</h4>
            <ul class="modal-feature-list">
                ${featuresHtml}
            </ul>
            <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:20px;">
                <a href="${data.targetUrl}" class="btn"><i data-lucide="calendar"></i> Reserve This Collection</a>
                <button type="button" class="btn-outline modal-dismiss-btn" style="margin-left:0;">Close</button>
            </div>
        `;

        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }

        modal.classList.add("active");
        backdrop.classList.add("active");
        document.body.style.overflow = "hidden";

        const dismissBtn = dynamicContent.querySelector(".modal-dismiss-btn");
        if (dismissBtn) {
            dismissBtn.addEventListener("click", closeCollectionModal);
        }
    }

    function closeCollectionModal() {
        if (!modal || !backdrop) return;
        modal.classList.remove("active");
        backdrop.classList.remove("active");
        document.body.style.overflow = "";
    }

    const detailButtons = document.querySelectorAll(".view-details-btn");
    detailButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const key = this.getAttribute("data-target");
            openCollectionModal(key);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", closeCollectionModal);
    }

    if (backdrop) {
        backdrop.addEventListener("click", closeCollectionModal);
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeCollectionModal();
        }
    });

    const revealTargets = document.querySelectorAll(
        ".collection-item, .timeline-step-card, .tangible-card, .pkg-cta-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        revealTargets.forEach((el) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(25px)";
            el.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
            observer.observe(el);
        });
    }

});

