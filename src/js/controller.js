import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import pagenationView from "./views/pagenationView";
import servingView from "./views/servingView";
import localStorgeView from "./views/localStorgeView";

(() => {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
  pagenationView.addHandlerPage(controlPage);
  servingView.addServingHandler(controlServingNum);
  recipeView.addHandlerLocalStorage(controlLocalStorage);
  localStorgeView.addhandlerBookmarks(controlDisplayFromLocalStorage);
  localStorgeView.addHandlerstartbookMarkes(controlStartBookmarks);
  console.log("hello");
})();

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpiner();
    resultsView.update(model.state.data, model.state.page);
    await model.getRecipe(id);
    recipeView.clear();
    model.servingReset();
    recipeView.booked(model.isBooked(model.state.recipe));
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);

    recipeView.renderError(err);
  }
}

async function controlSearchResult() {
  try {
    resultsView.renderSpiner();
    const query = searchView.getQuery();
    if (!query) return resultsView.clear();
    await model.getSearchResults(query);
    model.sortData(model.state.data);
    model.pageRest();
    resultsView.clear();
    resultsView.render(model.state.data);
    pagenationView.generatePageCommand(model.state.data, model.state.page);
  } catch (err) {
    console.error(err);
    resultsView.clear();
    recipeView.renderError(err);
  }
}
function controlPage(move) {
  model.pageNumber(move);
  resultsView.clear();
  resultsView.render(model.state.data, model.state.page);
  pagenationView.generatePageCommand(model.state.data, model.state.page);
}
function controlServingNum(para) {
  model.servingNum(para);
  recipeView.booked(model.isBooked(model.state.recipe));
  recipeView.update(model.state.recipe, model.state.servingNum);
}

function controlLocalStorage() {
  model.addLocalStorage();
  localStorgeView.clear();
  localStorgeView.render(model.state.localStorageArr);
}
function controlDisplayFromLocalStorage(id) {
  const recipe = model.findRecipe(id);

  model.setRecipe(recipe);
  recipeView.clear();
  recipeView.booked(model.isBooked(recipe));
  recipeView.render(recipe);
}
function controlStartBookmarks() {
  localStorgeView.clear();
  localStorgeView.render(model.state.localStorageArr);
}
