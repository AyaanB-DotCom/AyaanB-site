(function () {
  "use strict";

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  var entries = Array.prototype.slice.call(document.querySelectorAll("[data-categories]"));
  var empty = document.querySelector("[data-filter-empty]");

  if (!buttons.length || !entries.length) return;

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var selected = button.getAttribute("data-filter") || "all";
      var visible = 0;

      buttons.forEach(function (item) {
        var active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      entries.forEach(function (entry) {
        var categories = (entry.getAttribute("data-categories") || "").split(/\s+/);
        var show = selected === "all" || categories.indexOf(selected) !== -1;
        entry.hidden = !show;
        if (show) visible += 1;
      });

      if (empty) empty.hidden = visible !== 0;
    });
  });
})();
