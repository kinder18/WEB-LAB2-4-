export function accordionButtonListener() {
  var acc = document.getElementsByClassName("accordion-btn");
  var i;

  for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
      window.$(this).toggleClass('opened');
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      }
  });
  }
}