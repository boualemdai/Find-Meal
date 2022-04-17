

class SearchView {
  _ParentElement = document.querySelector("form");

  getQuery() {
     
    return this._ParentElement.firstElementChild.value.toLowerCase();
  }
  _clearInput() {
    this._ParentElement.firstElementChild.value = "";
  }
  addHandlerSearch(handler) {
    this._ParentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
      this._clearInput();
    });
  }
}
export default new SearchView();
