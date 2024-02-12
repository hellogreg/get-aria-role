(function () {
  function copyHeadingUrl(headingEl) {
    const statusEl = document.querySelector(`#${headingEl.id} ~ .perma-status`);
    const linkEl = document.querySelector(`#${headingEl.id} > a`);
    const href = linkEl.href;
    navigator.clipboard.writeText(href);
    statusEl.textContent = "link copied";
  }

  function activatePermaButtons() {
    const permaButtons = document.querySelectorAll(".perma-heading button");
    permaButtons.forEach((button) => {
      const headingEl = button.parentNode.firstChild.nextSibling;
      button.style = "display: initial";
      button.addEventListener(
        "click",
        () => {
          copyHeadingUrl(headingEl);
        },
        false
      );
    });
  }

  function init() {
    activatePermaButtons();
  }
  window.addEventListener("DOMContentLoaded", init);
})();
