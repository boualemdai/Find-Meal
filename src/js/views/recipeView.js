import Fraction from "fraction.js";
import View from "./view";
class RecipeView extends View {
  _parentElement = document.querySelector("main");
  #isBookmarked = false;
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }
  booked(boolean) {
    this.#isBookmarked = boolean;
  }
  _generateHtml(recipe, n = 4) {
    
    let ingList1 = "";
    let ingList2 = "";

    for (let [i, ing] of recipe.recipe.ingredients.entries()) {
      let newIng;

      if (ing.match(/^[\d\s\/\-]+/) && n !== 4) {
        newIng = ing.replace(/^[\d\s\/\-]+/, (m, c) => {
          let exp = m.trim().replace(" ", "+").replace("-", "+");

          if (exp[0].match(/[\+\/]/)) exp = exp.slice(1);
          if (exp[exp.length - 1].match(/[\+\/]/))
            exp = exp.slice(0, length - 1);
          const total = eval(exp);
          const newTotal = total + ((n - 4) * total) / 4;
          const int = Number.parseInt(newTotal);
          const float = newTotal - int;
          const x = new Fraction(float).toFraction();
          return `${int == 0 ? "" : int} ${x == 0 ? "" : x} `;
        });
      }
      if (newIng) ing = newIng;
      i < recipe.recipe.ingredients.length / 2
        ? (ingList1 += `<li><i class="fa-solid fa-check"></i> ${ing}</li>`)
        : (ingList2 += `<li><i class="fa-solid fa-check"></i> ${ing}</li>`);
    }

    return `
        <img src=${recipe.recipe.image_url} class="recipe-image">
        <div class="recipe-title"><span>${recipe.recipe.title}</span></div>
        <div class="recipe-top">
        <p>60 MINUTES</p>
        <p><i class="fa-regular fa-user"></i>${n} SERVINGS</p>
        <button class="serving-btn"><i class="fa-regular fa-square-plus"></i></button>
        <button class="serving-btn"><i class="fa-regular fa-square-minus"></i></button>
        <button class="book-btn ${
          this.#isBookmarked ? "salmon" : ""
        }" title="click to bookmark"><i class="fa-solid fa-book-bookmark"></i></button>
        </div>
        <div class="ingredients"><h1>${"recipe ingredients".toUpperCase()}</h1></div>
        <ul class="recipe-ing1">
              ${ingList1}
            </ul>
        <ul class="recipe-ing2">
              ${ingList2}
            </ul>
            <div class="foo">
            <h3>HOW TO COOK IT</h3>
           <p> This recipe was carefully designed and tested by <strong>${
             recipe.recipe.publisher
           }</strong>.
             Please check out directions at their website.</p>
            <a href=${
              recipe.recipe.publisher_url
            } target="_blank"><button>DIRECTIONS <i class="fa-solid fa-arrow-right"></i></button></a> 
          </div>
        `;
  }
  addHandlerLocalStorage(hander) {
    this._parentElement.addEventListener("click", (e) => {
      if (!e.target.closest(".book-btn")) return;
      e.target.closest(".book-btn").classList.toggle("salmon");
      hander();

      
    });
  }
}

export default new RecipeView();
