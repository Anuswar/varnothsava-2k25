window.onload = function () {
    // Initialize ScrollReveal
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "50px",
      duration: 1000,
      delay: 200,
      easing: "ease-in-out",
    });
  
    // Event Banner
    sr.reveal(".event-banner", { origin: "top", delay: 300 });
  
    // Event Title and Register Button
    sr.reveal(".text-center h1", { origin: "top", delay: 400 });
    sr.reveal(".text-center p", { origin: "bottom", delay: 500 });
    sr.reveal(".register-btn", { origin: "bottom", delay: 600 });
  
    // Event Details (Right Side)
    sr.reveal(".col-lg-4 .content-box", { origin: "right", delay: 700 });
  
    // About the Event (Left Side)
    sr.reveal(".col-lg-8 .content-box", { origin: "left", delay: 800 });
  
    // Rules, Rounds, and Coordinators
    sr.reveal(".content-box h3", { origin: "top", delay: 900, interval: 100 });
    sr.reveal(".content-box ul", { origin: "bottom", delay: 1000, interval: 150 });
    sr.reveal(".row .col-md-6 ul", { origin: "left", delay: 1100, interval: 200 });
  
    // Similar Events Section
    sr.reveal(".section-title.text-primary", { origin: "top", delay: 1200 });
    sr.reveal("#technical-events", { origin: "bottom", delay: 1300 });
    sr.reveal("#Cultural-Event", { origin: "bottom", delay: 1300 });
  
    // Individual Event Cards (if dynamically loaded, ensure ScrollReveal runs after elements are appended)
    document.querySelectorAll("#technical-events .event-card").forEach((card, index) => {
      sr.reveal(card, { origin: "bottom", delay: 1400 + index * 200 });
    });
    document.querySelectorAll("#Cultural-Event .event-card").forEach((card, index) => {
        sr.reveal(card, { origin: "bottom", delay: 1400 + index * 200 });
      });
  };
  