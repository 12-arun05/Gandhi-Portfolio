// Define showProjects globally so it's not redefined on every DOMContentLoaded event
function showProjects($cards, scrollIndex, cardsPerPage) {
  $cards.each(function(i) {
    $(this).css('display', (i >= scrollIndex && i < scrollIndex + cardsPerPage) ? 'block' : 'none');
  });
}

$(document).ready(function () {
  // Smooth scroll
  $(".nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      const hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 70,
        },
        800
      );
    }
  });
  
  
  // Add highlight style for header click feedback
  $("<style>h2.clicked-highlight { background-color: #ffe082; transition: background 0.3s; }</style>").appendTo("head");

  // Handle active link on scroll
  $(window).on("scroll", function () {
    const scrollPos = $(document).scrollTop();

    $(".nav-link").each(function () {
      const currLink = $(this);
      const refElement = $(currLink.attr("href"));
      if (
        refElement.position().top - 80 <= scrollPos &&
        refElement.position().top + refElement.height() > scrollPos
      ) {
        $(".nav-link").removeClass("active");
        currLink.addClass("active");
      }
    });
  });
  

  // Typed text effect
  new Typed("#typed-text", {
    strings: ["a Software Engineer", "a Web Developer", "a Data Analyst", "a Problem Solver"],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
  });

  // Particles background
  particlesJS("particles-js", {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: { enable: true, speed: 3 },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
      },
    },
  });

  // Click animation for headers (less intrusive)
  $("h2").click(function () {
    const $header = $(this);
    $header.addClass("clicked-highlight");
    setTimeout(function () {
      $header.removeClass("clicked-highlight");
    }, 600);
  });

  // Filter projects
  $(".filter-btn").click(function () {
    const filter = $(this).data("filter");

    // Update active button state
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    // Hide all project tracks
    $(".project-track").addClass("d-none");

    // Show the selected track(s)
    if (filter === "all") {
      $(".project-track").removeClass("d-none");
      // Safely show the 'all' track if it exists
      const allTrack = document.getElementById('all');
      if (allTrack) {
        allTrack.style.display = 'flex';
      }
    } else {
      $("#" + filter).removeClass("d-none");
    }
  });
  
  const $projectTrack = $("#all-track");
  let $cards = $();
  if ($projectTrack.length && $projectTrack[0] !== null) {
    $cards = $projectTrack.find('.project-card');
    const cardsPerPage = 3;
    const step = 1; // Number of cards to scroll per click

    $prevBtn = $("#prevBtn");
    $nextBtn = $("#nextBtn");
    $prevBtn = $("#prevBtn");
    $nextBtn = $("#nextBtn");

    if ($prevBtn.length && $prevBtn[0] !== null) {
      $prevBtn.on('click', function() {
        scrollIndex = Math.max(scrollIndex - step, 0);
        showProjects($cards, scrollIndex, cardsPerPage);
      });
    }

    if ($nextBtn.length && $nextBtn[0] !== null) {
      $nextBtn.on('click', function() {
        if (scrollIndex + cardsPerPage < $cards.length) {
          scrollIndex += step;
          showProjects($cards, scrollIndex, cardsPerPage);
        }
      });
    }

    showProjects($cards, scrollIndex, cardsPerPage);
  } else {
    // Optionally log or handle the missing #all-track element
    // console.warn("Element with id 'all-track' not found.");
  }
});




