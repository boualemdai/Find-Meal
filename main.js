"use strict";
const form = document.querySelector("form");
const waitCircle = document.querySelector(".wait-circle");
const searchInput = document.getElementById("search-input");
const side = document.querySelector(".side");
const next = document.querySelector(".next");
const back = document.querySelector(".back");
const changePage = document.querySelector(".change-page");
const aside = document.querySelector("aside");
const main = document.querySelector("main");

//     // catch (err) {
//     //   waitCircle.style.display = "none";
//     //   const html = `

//     //     <div class="error"><h2>Error: 😞 ${err.message}</h2></div>

//     //   `;
//     //   side.insertAdjacentHTML("afterbegin", html);
//     // }

class MealApp {
  #pageNum;

  #pagedData;
  constructor() {
    form.addEventListener("submit", this._getItem.bind(this));
    changePage.addEventListener("click", this._changePage.bind(this));
    aside.addEventListener("click", this._getRecipe.bind(this));
  }
  _wait(s) {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`Request Timeout`)), s * 1000);
    });
  }
  _getItem(e) {
    e.preventDefault();
    const item = searchInput.value.toLowerCase();
    side.textContent = "";
    changePage.style.display = "none";
    waitCircle.style.display = "block";
    this.#pageNum = 0;
    next.classList.add("next");
    this._fetchData(item);
  }
  async _fetchData(item) {
    const res = await Promise.race([
      fetch(`https://forkify-api.herokuapp.com/api/search?q=${item}`),
      this._wait(10),
    ]);
    const data = await res.json();
    this._sortData(data);
  }
  _sortData(data) {
    if (data.recipes.length > 10) changePage.style.display = "flex";
    const pages = Math.ceil(data.recipes.length / 10);
    const dataArr = Array.from({ length: pages }, (e) => []);

    let j = 0;
    const pagedData = data.recipes.reduce((_, val, i) => {
      i !== 0 && i % 10 === 0 && j++;
      dataArr[j].push(val);
      return dataArr;
    }, dataArr);
    this.#pagedData = pagedData;
    this._display(pagedData);
  }

  _display(pagedData) {
    waitCircle.style.display = "none";

    side.textContent = "";
    for (const [i, recipes] of pagedData.entries()) {
      if (i === this.#pageNum)
        recipes.forEach((recipe) => {
          const html = `
        <li class="recipe" data-id=${recipe.recipe_id}>
          <div class="image-area" style="background-image: url(${recipe.image_url})"></div>
          <div class="title-area"><h5>${recipe.title}</h5></div>
          <div class="text-area"><p>${recipe.publisher}</p></div>
        </li>
        `;
          side.insertAdjacentHTML("afterbegin", html);
        });
    }

    if (this.#pageNum <= 0) back.classList.remove("back");

    if (this.#pageNum >= pagedData.length - 1) next.classList.remove("next");
  }

  _changePage(e) {
    if (!e.target.classList.contains("btn")) return;

    if (e.target.classList.contains("next")) {
      back.classList.add("back");
      this.#pageNum++;
    }
    if (e.target.classList.contains("back")) {
      next.classList.add("next");
      this.#pageNum--;
    }

    this._display(this.#pagedData);
  }
  async _getRecipe(e) {
    if (!e.target.closest(".recipe")) return;
    const id = e.target.closest(".recipe").dataset.id;
    const response = await Promise.race([
      fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`),
      this._wait(10),
    ]);
    const recipe = await response.json();
    this._renderRecipe(recipe);
  }
  _renderRecipe(recipe) {
    let ingList1=""
    let ingList2=""
    main.textContent = "";
        
    for (const [i, ing] of recipe.recipe.ingredients.entries()) {
      
     i<recipe.recipe.ingredients.length/2? ingList1 += `<li>${ing}</li>`:ingList2+=`<li>${ing}</li>`
    }
    console.log(recipe);
   ;
    const html = `
    <img src=${recipe.recipe.image_url} class="recipe-image"></img>
    <ul class="recipe-ing1">
          ${ingList1}
        </ul>
    <ul class="recipe-ing2">
          ${ingList2}
        </ul>
        <div class="foo">
        <h4>HOW TO COOK IT</h4>
       <p> This recipe was carefully designed and tested by <strong>${recipe.recipe.publisher}</strong>.
         Please check out directions at their website.</p>
         <button>DIRECTION</button>
      </div>
    `;
    main.insertAdjacentHTML("beforeend", html);
  }
}

const mealApp = new MealApp();
