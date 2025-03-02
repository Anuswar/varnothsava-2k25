// Function to highlight active section
function highlightActiveSection() {
  var scrollPos = $(document).scrollTop();
  $(".nav-link").each(function () {
    var section = $($(this).attr("href"));
    if (
      section.length &&
      section.position().top <= scrollPos + 100 &&
      section.position().top + section.height() > scrollPos
    ) {
      $(".nav-link").removeClass("active");
      $(this).addClass("active");
    }
  });
}

/*=============== PRELOADER ===============*/
$(window).on("load", function () {
  $("#splash-screen").fadeOut(500, function () {
    $("#main-content").fadeIn(500);
  });

  // Check and highlight active section on page load
  highlightActiveSection();
});

/*=============== HEADER ===============*/
$(document).ready(function () {
  $(window).on("scroll resize", function () {
    var scrollPos = $(document).scrollTop();

    // Navbar scroll effect
    if (scrollPos > 50) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }

    // Highlight active section in navbar
    highlightActiveSection();

    // Close navbar on scroll or resize
    $(".navbar-collapse").collapse("hide");
    $(".overlay").removeClass("show-overlay");
  });

  // Smooth scrolling for navbar links
  $(".nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 70,
        },
        800
      );
    }

    // Close navbar when a link is clicked
    $(".navbar-collapse").collapse("hide");
    $(".overlay").removeClass("show-overlay");
  });

  // Toggle overlay on navbar toggle
  $(".navbar-toggler").on("click", function () {
    $(".overlay").toggleClass("show-overlay");

    // Add background color if navbar is opened at top
    if ($(document).scrollTop() === 0) {
      $(".navbar").addClass("scrolled");
    }
  });

  // Close navbar when overlay is clicked
  $(".overlay").on("click", function () {
    $(".navbar-collapse").collapse("hide");
    $(".overlay").removeClass("show-overlay");
  });

  // Reset background when navbar collapses
  $(".navbar-collapse").on("hidden.bs.collapse", function () {
    if ($(document).scrollTop() === 0) {
      $(".navbar").removeClass("scrolled");
    }
  });
});

/*=============== EVENT ===============*/
$(document).ready(function () {
  let eventList = $("#eventList");
  let eventData = [];
  let filteredData = [];
  let selectedCategory = null;
  let itemsPerPage = 6;
  let currentIndex = 0;
  let fuse;

  // Toggle Search Bar Visibility using Bootstrap's d-none class
  $(".search-toggle").on("click", function () {
    $("#searchContainer").toggleClass("d-none");
    if (!$("#searchContainer").hasClass("d-none")) {
      $("#eventSearch").focus();
    }
  });

  // Fetch data from event.json
  $.getJSON("data/event.json", function (data) {
    eventData = data;
    filteredData = data;
    initFuse();
    loadMoreEvents();
  });

  // Load events in chunks
  function loadMoreEvents() {
    let loadMoreBtn = $("#loadMoreBtn");

    // If there are no more events to load, update button text and disable it
    if (currentIndex >= filteredData.length) {
      loadMoreBtn.text("Event End").prop("disabled", true);
      return;
    }

    let itemsToLoad = filteredData.slice(
      currentIndex,
      currentIndex + itemsPerPage
    );
    itemsToLoad.forEach((event) => {
      let eventCard = `
            <div class="col-lg-4 col-md-6 col-12 event-card">
                <div class="timeline-item">
                    <div class="timeline-date">${event.date}</div>
                    <div class="timeline-content">
                        <img src="${event.image}" class="img-fluid rounded mb-2" alt="${event.title}">
                        <h4 class="fw-bold text-${event.color}">${event.title}</h4>
                        <p class="text-muted mb-1"><i class="fas fa-clock"></i> ${event.time}</p>
                        <p class="text-muted mb-1"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        <span class="badge bg-${event.color}">${event.category}</span>
                        <button class="btn btn-outline-${event.color} read-more-btn" data-url="${event.page}">Read More</button>
                    </div>
                </div>
            </div>`;
      eventList.append(eventCard);
    });

    currentIndex += itemsPerPage;

    // If no more events, update button text and disable it
    if (currentIndex >= filteredData.length) {
      loadMoreBtn.text("Event End").prop("disabled", true);
    } else {
      loadMoreBtn.text("Load More").prop("disabled", false);
    }
  }

  // Load more on button click
  $("#loadMoreBtn").on("click", function () {
    loadMoreEvents();
  });

  // Infinite Scroll: load more when nearing page bottom.
  $(window).on("scroll", function () {
    if (
      $(window).scrollTop() + $(window).height() >=
      $(document).height() - 100
    ) {
      loadMoreEvents();
    }
  });

  // Redirect on "Read More" button click
  $(document).on("click", ".read-more-btn", function () {
    let eventPage = $(this).data("url");
    window.location.href = eventPage;
  });

  // Initialize Fuse.js for fuzzy search.
  function initFuse() {
    fuse = new Fuse(eventData, {
      keys: ["title", "category", "location", "date"],
      threshold: 0.3,
    });
  }

  // Apply search and category filters.
  window.applyFilters = function () {
    let searchTerm = $("#eventSearch").val().trim();
    let searchResults = searchTerm
      ? fuse.search(searchTerm).map((item) => item.item)
      : eventData;

    if (selectedCategory) {
      filteredData = searchResults.filter(
        (event) =>
          event.category === selectedCategory ||
          event.date.includes(selectedCategory)
      );
    } else {
      filteredData = searchResults;
    }

    // Reset event list and index.
    currentIndex = 0;
    eventList.empty();
    loadMoreEvents();

    // Final check: if all filtered events are loaded, hide the button.
    if (currentIndex >= filteredData.length) {
      $("#loadMoreBtn").hide();
    } else {
      $("#loadMoreBtn").show();
    }
  };

  // Handle filter button clicks.
  $(".filter-btn").on("click", function () {
    selectedCategory = $(this).data("filter");
    applyFilters();
  });

  // Example for clearing filters (ensure an element with id "clearFilters" exists)
  $("#clearFilters").on("click", function () {
    selectedCategory = null;
    $("#eventSearch").val("");
    applyFilters();
  });
});

/*=============== GALLARY ===============*/
$(document).ready(function () {
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
