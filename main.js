"use strict";
const form = document.querySelector("form");
const waitCircle = document.querySelector(".wait-circle");
const searchInput = document.getElementById("search-input");
const side=document.querySelector(".side")

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const item = searchInput.value.toLowerCase();

  waitCircle.style.display = "block";

  (async function () {
    try {
      const res = await fetch(
        "https://forkify-api.herokuapp.com/api/search?q=pizza"
      );
      const data = await res.json();
      waitCircle.style.display = "none";
      for(const recipe of data.recipes){
          console.log(recipe);
          
          
      const html = `
      <li>
        <div class="image-area" style="background-image: url(${recipe.image_url})"></div>
        <div class="title-area"><h5>${recipe.title}</h5></div>
        <div class="text-area"><p>${recipe.publisher}</p></div>
      </li>
      `;
      side.insertAdjacentHTML("afterbegin",html)

      }
     
    } catch (err) {
      console.log(err);
    }
  })();

  //    fetch(`https://forkify-api.herokuapp.com/api/search?q=${item}`).then(res=>res.json()).then(data=>{
  //        console.log(data)
  //        waitCircle.style.display="none"

  // }).catch(err=>console.log(err))
});
