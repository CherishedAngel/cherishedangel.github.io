(function () {
  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("#mobile-menu");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (toggle && mobileMenu) {
    function setMenu(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute(
        "aria-label",
        open ? "Close navigation menu" : "Open navigation menu"
      );
      mobileMenu.hidden = !open;
    }

    toggle.addEventListener("click", function () {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      setMenu(!expanded);
    });

    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        toggle.getAttribute("aria-expanded") === "true"
      ) {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (
        !mobileMenu.hidden &&
        !mobileMenu.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        setMenu(false);
      }
    });
  }

  // Project filters
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      document
        .querySelectorAll("[data-filter]")
        .forEach((item) => item.classList.remove("active"));

      button.classList.add("active");

      document
        .querySelectorAll("[data-project-grid] .project-card")
        .forEach((card) => {
          card.hidden =
            filter !== "all" && card.dataset.category !== filter;
        });
    });
  });

  // Reveal animations
  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add("is-visible"));
  }

  // Footer particles
  document.addEventListener("DOMContentLoaded", function () {
    const particleContainer = document.getElementById("footer-particles");

    if (!particleContainer) {
      return;
    }

    if (typeof particlesJS === "undefined") {
      console.warn("Particles.js has not loaded.");
      return;
    }

    particlesJS("footer-particles", {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 800
          }
        },

        color: {
          value: "#ffffff"
        },

        shape: {
          type: "star",
          stroke: {
            width: 0,
            color: "#000000"
          },
          polygon: {
            nb_sides: 5
          }
        },

        opacity: {
          value: 0.8,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.15,
            sync: false
          }
        },

        size: {
          value: 2.5,
          random: true,
          anim: {
            enable: false,
            speed: 4,
            size_min: 0.3,
            sync: false
          }
        },

        line_linked: {
          enable: false
        },

        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false
          }
        }
      },

      interactivity: {
        detect_on: "canvas",

        events: {
          onhover: {
            enable: true,
            mode: "bubble"
          },

          onclick: {
            enable: true,
            mode: "repulse"
          },

          resize: true
        },

        modes: {
          bubble: {
            distance: 150,
            size: 4,
            duration: 2,
            opacity: 1,
            speed: 3
          },

          repulse: {
            distance: 100,
            duration: 0.4
          }
        }
      },

      retina_detect: true
    });
  });
})();