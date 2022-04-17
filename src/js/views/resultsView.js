import View from "./view";
class ResultsView extends View {
  _parentElement = document.querySelector(".side");

  _generateHtml(pagedData, page = 1) {
   if(!pagedData.length) return

    let html = "";
    for (const [i, recipes] of pagedData.entries()) {
      if (i === page - 1)
        recipes.forEach((recipe) => {
          html += `
        <a href="#${recipe.recipe_id}">
            <li class="recipe ${
              window.location.hash.slice(1) === recipe.recipe_id
                ? "selected"
                : ""
            }" data-id=${recipe.recipe_id}>
              <div class="image-area" style="background-image: url(${
                recipe.image_url
              })"></div>
              <div class="title-area">${recipe.title}</div>
              <div class="text-area"><p>${recipe.publisher}</p></div>
            </li>
        </a>
            `;
        });
    }

    return html;
  }
}

export default new ResultsView();
