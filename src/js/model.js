import { async } from "regenerator-runtime";
import * as conf from "./config";
import * as helper from "./helpers";

export const state = {
  data: {},
  recipe: {},
  page: 1,
  servingNum: 4,
  localStorageArr: [],
};

(() => {
  state.localStorageArr = JSON.parse(localStorage.getItem("recipes"))
    ? JSON.parse(localStorage.getItem("recipes"))
    : [];
})();
export const getSearchResults = async function (query) {
  try {
    const data = await helper.getJSON(`${conf.API_URL_Q}${query}`);
    state.data = { query, ...data };
  } catch (err) {
    throw err;
  }
};

export const getRecipe = async function (id) {
  try {
    const recipe = await helper.getJSON(`${conf.API_URL_ID}${id}`);
    state.recipe = recipe;
  } catch (err) {
    throw err;
  }
};
export const sortData = (data, page) => {
  if (data.recipes.length >= conf.RES_PAG) {
    const pages = Math.ceil(data.recipes.length / conf.RES_PAG);
    const dataArr = Array.from({ length: pages }, (e) => []);
    let j = 0;
    state.data = data.recipes.reduce((_, val, i) => {
      i !== 0 && i % conf.RES_PAG === 0 && j++;
      dataArr[j].push(val);
      return dataArr;
    }, dataArr);
  } else state.data = [state.data.recipes];
};
export const pageRest = () => (state.page = 1);
export const pageNumber = (move) => (move ? state.page++ : state.page--);
export const servingNum = (para) => {
  if (state.servingNum === 1 && !para) return;
  return para ? state.servingNum++ : state.servingNum--;
};
export const servingReset = () => (state.servingNum = 4);
export const addLocalStorage = () => {
  if (state.localStorageArr.length === 0) {
    state.localStorageArr.push(state.recipe);
    state.recipe.recipe.bookmarked = true;
  } else {
    const index = state.localStorageArr.findIndex(
      (e) => e.recipe.recipe_id === state.recipe.recipe.recipe_id
    );
    if (index >= 0) {
      state.localStorageArr.splice(index, 1);
    } else {
      state.localStorageArr.push(state.recipe);
      state.recipe.recipe.bookmarked = true;
    }
  }
  localStorage.setItem("recipes", JSON.stringify(state.localStorageArr));
};
export const setRecipe = (recipe) => {
  state.recipe = recipe;
};
export const isBooked = (r) => {
  if (state.localStorageArr.length === 0) return false;

  const index = state.localStorageArr.findIndex(
    (e) => e.recipe.recipe_id === r.recipe.recipe_id
  );

  if (index >= 0) return true;

  return false;
};
export const findRecipe=(id)=>{
 return state.localStorageArr.find(
    (e) => e.recipe.recipe_id === id)
}