document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");
  const modal = document.getElementById("bookingModal");
  const modalClose = document.querySelector(".modal-close");
  const termsCheckbox = document.getElementById("termsCheckbox");
  const confirmBookingBtn = document.getElementById("confirmBooking");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
    });
  });

  document.querySelectorAll(".action-card").forEach((card) => {
    card.addEventListener("click", function () {
      const action = this.querySelector("span").textContent;

      switch (action) {
        case "Vote on Destinations":
          document.querySelector('[data-tab="destinations"]').click();
          break;
        case "Vote on Activities":
          document.querySelector('[data-tab="activities"]').click();
          break;
        case "Split Expenses":
          document.querySelector('[data-tab="expenses"]').click();
          break;
        case "Group Chat":
          document.querySelector('[data-tab="chat"]').click();
          break;
      }
    });
  });

  document
    .querySelectorAll(".destination-card .btn, .activity-item .btn")
    .forEach((button) => {
      if (button.textContent.trim() === "Vote") {
        button.addEventListener("click", function (e) {
          e.preventDefault();

          if (this.textContent.trim() === "Vote") {
            this.textContent = "Voted";
            this.classList.remove("btn-primary");
            this.classList.add("btn-secondary");

            const voteElement =
              this.closest(".destination-card")?.querySelector(".vote-badge") ||
              this.closest(".activity-item")?.querySelector(
                ".activity-votes span"
              );
            if (voteElement) {
              const currentVotes = parseInt(
                voteElement.textContent.match(/\d+/)[0]
              );
              voteElement.textContent = voteElement.textContent.replace(
                /\d+/,
                currentVotes + 1
              );
            }
          } else {
            this.textContent = "Vote";
            this.classList.remove("btn-secondary");
            this.classList.add("btn-primary");

            const voteElement =
              this.closest(".destination-card")?.querySelector(".vote-badge") ||
              this.closest(".activity-item")?.querySelector(
                ".activity-votes span"
              );
            if (voteElement) {
              const currentVotes = parseInt(
                voteElement.textContent.match(/\d+/)[0]
              );
              voteElement.textContent = voteElement.textContent.replace(
                /\d+/,
                Math.max(0, currentVotes - 1)
              );
            }
          }
        });
      }
    });

  const bookTripBtn = document.querySelector(".btn-full");
  if (bookTripBtn && bookTripBtn.textContent.includes("Book Trip")) {
    bookTripBtn.addEventListener("click", function () {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  if (termsCheckbox && confirmBookingBtn) {
    termsCheckbox.addEventListener("change", function () {
      confirmBookingBtn.disabled = !this.checked;
    });
  }

  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", function () {
      if (termsCheckbox.checked) {
        this.innerHTML =
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Processing...';
        this.disabled = true;

        setTimeout(() => {
          alert(
            "Booking confirmed! You will receive a confirmation email shortly."
          );
          closeModal();

          this.innerHTML =
            '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Confirm Booking';
          this.disabled = false;
          termsCheckbox.checked = false;
        }, 2000);
      }
    });
  }

  const destinationSearch = document.querySelector(".destination-search");
  if (destinationSearch) {
    destinationSearch.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const searchTerm = this.value.trim();
        if (searchTerm) {
          alert(
            `Searching for destinations: "${searchTerm}". This feature would integrate with a travel API in a real application.`
          );
          this.value = "";
        }
      }
    });
  }

  const messageInput = document.querySelector(".message-input");
  const sendBtn = document.querySelector(".chat-input .btn");

  if (messageInput && sendBtn) {
    function sendMessage() {
      const message = messageInput.value.trim();
      if (message) {
        alert(
          `Message sent: "${message}". Chat functionality would be implemented with real-time messaging in a production app.`
        );
        messageInput.value = "";
      }
    }

    sendBtn.addEventListener("click", sendMessage);

    messageInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  function animateProgressBars() {
    const progressBars = document.querySelectorAll(".progress-fill");
    progressBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0%";
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }

  const overviewTab = document.querySelector('[data-tab="overview"]');
  if (overviewTab) {
    overviewTab.addEventListener("click", () => {
      setTimeout(animateProgressBars, 100);
    });
  }

  setTimeout(animateProgressBars, 500);

  function handleMobileNav() {
    const tabNav = document.querySelector(".tab-nav");
    if (window.innerWidth <= 768) {
      tabNav.style.overflowX = "auto";
    } else {
      tabNav.style.overflowX = "visible";
    }
  }

  window.addEventListener("resize", handleMobileNav);
  handleMobileNav();

  function smoothScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setTimeout(smoothScrollToTop, 100);
    });
  });

  function addLoadingState(button, originalText, loadingText = "Loading...") {
    button.disabled = true;
    button.textContent = loadingText;

    setTimeout(() => {
      button.disabled = false;
      button.textContent = originalText;
    }, 1000);
  }

  document.querySelectorAll(".btn").forEach((button) => {
    if (button.textContent.trim() === "Vote") {
      button.addEventListener("click", function () {
        const originalText = this.textContent;
        addLoadingState(this, originalText, "Voting...");
      });
    }
  });

  if (destinationSearch) {
    destinationSearch.addEventListener("input", function () {
      const value = this.value.trim();
      if (value.length > 0) {
        this.style.borderColor = "#f41542";
      } else {
        this.style.borderColor = "#e6e6e6";
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      const activeTab = document.querySelector(".tab-btn.active");
      const allTabs = Array.from(document.querySelectorAll(".tab-btn"));
      const currentIndex = allTabs.indexOf(activeTab);

      let nextIndex;
      if (e.key === "ArrowLeft") {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : allTabs.length - 1;
      } else {
        nextIndex = currentIndex < allTabs.length - 1 ? currentIndex + 1 : 0;
      }

      if (e.target.classList.contains("tab-btn")) {
        allTabs[nextIndex].click();
        allTabs[nextIndex].focus();
      }
    }
  });

  document.querySelectorAll(".btn, .tab-btn").forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "2px solid #f41542";
      this.style.outlineOffset = "2px";
    });

    element.addEventListener("blur", function () {
      this.style.outline = "none";
    });
  });
});
