// JavaScript - script.js
let musicPlaying = false;
const music = document.getElementById("backgroundMusic");
const musicIcon = document.getElementById("musicIcon");

// Toggle music function
function toggleMusic() {
  if (musicPlaying) {
    music.pause();
    musicIcon.className = "fas fa-music";
    musicPlaying = false;
  } else {
    music
      .play()
      .then(() => {
        musicIcon.className = "fas fa-pause";
        musicPlaying = true;
      })
      .catch((error) => {
        console.log("Audio play failed:", error);
      });
  }
}

// Open invitation function
function openInvitation() {
  document.getElementById("mainContent").style.display = "block";

  // Show navbar
  document.getElementById("navbar").classList.remove("hidden");

  // Start music when invitation is opened
  if (!musicPlaying) {
    toggleMusic();
  }

  // Scroll to couple section
  document.getElementById("quotes").scrollIntoView({ behavior: "smooth" });
  AOS.refresh();
}

// Countdown timer
function updateCountdown() {
  const weddingDate = new Date("2025-06-15T08:00:00").getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, "0");
    document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
  } else {
    document.getElementById("countdownTimer").innerHTML = '<p class="text-2xl font-bold text-yellow-600">Hari Bahagia Telah Tiba! 🎉</p>';
  }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Map functions
function openMap(type) {
  let targetDiv = "";

  if (type === "akad") {
    targetDiv = document.getElementById("map-akad");
    iframeHTML = `
    <a href="https://maps.app.goo.gl/rAzuCs1siNZ6Nttb8" target="_blank" rel="noopener noreferrer">
    <iframe class="map-akad" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32716.894358688558!2d106.82487003566968!3d-6.202694555192257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f405302bf3a1%3A0x5286b4af4df2a6d6!2sThe%20Grove%20Suites%20by%20GRAND%20ASTON!5e0!3m2!1sid!2sid!4v1748912612684!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> </a> <p class="w-[70%] mx-auto my-10">Klik <b>"Lihat Peta Lebih Besar"</b> di pojok kiri atas maps, untuk membuka Google Maps</p>`;
  } else if (type === "resepsi") {
    targetDiv = document.getElementById("map-resepsi");
    iframeHTML = `
    <a href="https://maps.app.goo.gl/f3Esy3r2BY3GT4qg7" target="_blank" rel="noopener noreferrer">
    <iframe class="map-resepsi" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32716.353460865506!2d106.79849836120798!3d-6.211404254586176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14d30079f01%3A0x2e74f2341fff266d!2sStadion%20Utama%20Gelora%20Bung%20Karno!5e0!3m2!1sid!2sid!4v1748913329937!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> </a> <p class="w-[70%] mx-auto my-10">Klik <b>"Lihat Peta Lebih Besar"</b> di pojok kiri atas maps, untuk membuka Google Maps</p>`;
  }

  if (targetDiv.innerHTML.trim() === "") {
    targetDiv.innerHTML = iframeHTML;
  } else {
    targetDiv.innerHTML = "";
  }
}

// klik open galeri images functions
function openImages(imageSrc) {
  const openImg = document.getElementById("openImage");
  const imgOpen = document.getElementById("imageOpen");
  openImg.style.display = "block";
  imgOpen.src = imageSrc;
}

// Close img when clicking the X
document.querySelector(".close").onclick = function () {
  document.getElementById("openImage").style.display = "none";
};

// Close img when clicking outside the image
window.onclick = function (event) {
  const openImg = document.getElementById("openImage");
  if (event.target === openImg) {
    openImg.style.display = "none";
  }
};

// RSVP form submission
document.getElementById("rsvpForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("guestName").value;
  const attendance = document.getElementById("attendance").value;
  const message = document.getElementById("message").value;

  // Simulate form submission
  alert(`Terima kasih ${name}! Konfirmasi kehadiran Anda telah diterima.`);

  // Reset form
  this.reset();
});

// Observe all fade-in elements
document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((el) => observer.observe(el));
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 0; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Active nav link highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

// animasi bunga jatuh
function buatBunga() {
  const bungaJatuh = document.createElement("div");
  bungaJatuh.classList.add("bunga");
  bungaJatuh.style.left = Math.random() * window.innerWidth + "px";
  bungaJatuh.style.animationDuration = 3 + Math.random() * 5 + "s";
  document.body.appendChild(bungaJatuh);

  // Hapus elemen setelah jatuh selesai
  setTimeout(() => {
    bunga.remove();
  }, 4000);
}

// Interval untuk membuat bunga terus menerus
setInterval(buatBunga, 400);

// Navbar hide/show on scroll
let lastScrollTop = 0;
function handleNavbarScroll() {
  const navbar = document.getElementById("navbar");
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
    // Scrolling down
    navbar.classList.add("navbar-hidden");
    navbar.classList.remove("navbar-visible");
  } else {
    // Scrolling up
    navbar.classList.remove("navbar-hidden");
    navbar.classList.add("navbar-visible");
  }

  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  updateActiveNavLink();
}

// Add scroll event listener
window.addEventListener("scroll", handleNavbarScroll);
// window.addEventListener("scroll", updateActiveNavLink);

// Add loading animation
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});
