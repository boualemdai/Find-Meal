import View from "./view";
class LocalStorageView extends View {
  _parentElement = document.querySelector(".local-storage-list");
  addhandlerBookmarks(handler) {
    this._parentElement.addEventListener("click", (e) => {
      if (!e.target.closest(".recipe")) return;
      const id = e.target.closest(".recipe").dataset.id;
      handler(id);
    });
  }
  addHandlerstartbookMarkes(handler) {
    window.addEventListener("load", handler);
  }
  _generateHtml(arr) {
    if (arr.length === 0) return `<h1>No bookmarks 🙃</h1>`;
    else
      return arr
        .map((e) => {
          return `
      <a href="#${e.recipe.recipe_id}">
        <li class="recipe lselement" data-id=${e.recipe.recipe_id}>
          <div class="image-area" style="background-image: url(${e.recipe.image_url})"></div>
          <div class="title-area" >${e.recipe.title}</div>
          <div class="text-area" ><p>${e.recipe.publisher}</p></div>
        </li>
      </a>
        `;
        })
        .join(" ");
  }
}
export default new LocalStorageView();
