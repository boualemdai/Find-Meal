export default class View {
  _data;
  render(data, arg) {
    this._data = data;
    const markup = this._generateHtml(data, arg);
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }
  update(data, arg) {
    
    const newMarkup = this._generateHtml(data, arg);
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      if (!newEl.isEqualNode(curElements[i])) {
          if(curElements[i])
        curElements[i].innerHTML= newEl.innerHTML;
      }
    });
  }

  clear() {
    this._parentElement.textContent = "";
  }
  renderSpiner() {
    this._parentElement.innerHTML = `<div class="wait-circle"></div>`;
  }
  renderError(err) {
    const html = `
      <div class="error">🙃😞 ${err}</div>
      `;
    this.clear();
    this._parentElement.insertAdjacentHTML("beforeend", html);
  }
}
