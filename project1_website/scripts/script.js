document.addEventListener("DOMContentLoaded", () => {
  const banner = document.querySelector(".cookie-banner");
  const acceptBtn = document.querySelector(".btn-accept");
  const rejectBtn = document.querySelector(".btn-reject");
  const closeBanner = (event) => {
    event.preventDefault();
    banner.classList.add("cookie-hidden");
  };

  if (banner && acceptBtn && rejectBtn) {
    acceptBtn.addEventListener("click", closeBanner);
    rejectBtn.addEventListener("click", closeBanner);
  }
});
