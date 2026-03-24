(function () {
  "use strict";

  /**
   * Social / profile anchors: only navigate when PORTFOLIO_SOCIAL_LINKS[key] is set.
   * Empty = decorative only (no URL, click does nothing — safe to publish or fork).
   */
  function applySocialLinks() {
    var custom = window.PORTFOLIO_SOCIAL_LINKS || {};
    document.querySelectorAll("a[data-social]").forEach(function (a) {
      var key = a.getAttribute("data-social");
      if (!key) {
        return;
      }
      var raw = custom[key];
      var url = raw != null && String(raw).trim() !== "" ? String(raw).trim() : "";

      if (url.indexOf("http") === 0) {
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
        a.removeAttribute("aria-disabled");
        a.removeAttribute("title");
        a.classList.remove("social-link--placeholder");
      } else if (url.indexOf("mailto:") === 0 || url.indexOf("tel:") === 0) {
        a.setAttribute("href", url);
        a.removeAttribute("target");
        a.removeAttribute("rel");
        a.removeAttribute("aria-disabled");
        a.removeAttribute("title");
        a.classList.remove("social-link--placeholder");
      } else {
        a.setAttribute("href", "#");
        a.removeAttribute("target");
        a.removeAttribute("rel");
        a.setAttribute("aria-disabled", "true");
        a.setAttribute(
          "title",
          "Placeholder: add your URL in site-config.js (key: " + key + ")"
        );
        a.classList.add("social-link--placeholder");
        a.addEventListener("click", function (e) {
          e.preventDefault();
        });
      }
    });
  }

  applySocialLinks();

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      var icon = navToggle.querySelector("i");
      if (icon) {
        icon.className = open ? "ph ph-x" : "ph ph-list";
      }
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
        var ic = navToggle.querySelector("i");
        if (ic) {
          ic.className = "ph ph-list";
        }
      });
    });
  }

  var backTop = document.getElementById("back-top");
  if (backTop) {
    function onScroll() {
      if (window.scrollY > 400) {
        backTop.classList.add("visible");
      } else {
        backTop.classList.remove("visible");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    var revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) {
        return;
      }
      faqItems.forEach(function (other) {
        if (other !== item && other.open) {
          other.open = false;
        }
      });
    });
  });
})();
