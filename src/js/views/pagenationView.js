import View from "./view";
class PagenationView extends View {
  _parentElement = document.querySelector("aside");
  _back = this._parentElement.querySelector(".back");
  _next = this._parentElement.querySelector(".next");
  _changePage = this._parentElement.querySelector(".change-page");
  addHandlerPage(handler) {
    this._changePage.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn");

      if (!btn) return;
      if (btn.classList.contains("next")) {
        handler(true);
      }
      if (btn.classList.contains("back")) {
        handler(false);
      }
    });
  }
  generatePageCommand(pagedData, page) {
    this._changePage.style.display = "flex";
    this._next.classList.add("next");
    this._next.innerHTML = `Next ${
      page + 1
    }  <i class="fa-solid fa-arrow-right"></i>`;
    this._back.innerHTML = ` <i class="fa-solid fa-arrow-left"></i> ${
      page - 1
    } Back`;
    if (page <= 1) this._back.classList.remove("back");
    else this._back.classList.add("back");
    if (page >= pagedData.length) this._next.classList.remove("next");
    else this._next.classList.add("next");
  }
}
export default new PagenationView();
