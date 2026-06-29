/* ============================================================
   Northcast — interactions
   Nav scroll state, mobile menu, FAQ accordion, scroll reveal,
   compass-funnel intro. Reduced-motion safe.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav scroll state ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 12) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  function closeMenu() {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- FAQ accordion (one open at a time) ---------- */
  var faqButtons = Array.prototype.slice.call(document.querySelectorAll(".faq-q"));
  faqButtons.forEach(function (btn) {
    var item = btn.closest(".faq-item");
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      // close all
      faqButtons.forEach(function (b) {
        var it = b.closest(".faq-item");
        var p = document.getElementById(b.getAttribute("aria-controls"));
        it.classList.remove("open");
        b.setAttribute("aria-expanded", "false");
        p.style.maxHeight = null;
      });
      // open this one if it was closed
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
  // Recalculate open panel height on resize
  window.addEventListener("resize", function () {
    var openItem = document.querySelector(".faq-item.open");
    if (openItem) {
      var p = openItem.querySelector(".faq-a");
      p.style.maxHeight = p.scrollHeight + "px";
    }
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Compass-funnel intro ---------- */
  var compassSvg = document.getElementById("compassSvg");
  var compassStage = document.getElementById("compassStage");
  if (compassSvg && compassStage) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      compassSvg.classList.add("in");
      compassStage.classList.add("in");
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            compassSvg.classList.add("in");
            compassStage.classList.add("in");
            cio.disconnect();
          }
        });
      }, { threshold: 0.25 });
      cio.observe(compassStage);
    }
  }

  /* ---------- Smooth anchor offset for sticky nav ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
      // move focus for a11y after scroll
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
})();
