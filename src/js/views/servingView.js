import View from "./view";
class ServingView extends View {
  #parentElement = document.querySelector("main");

  addServingHandler(handler) {
    this.#parentElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-square-plus")) {
        handler(true);
      }
      if (e.target.classList.contains("fa-square-minus")) {
        handler(false);
      }
    });
  }
}
export default new ServingView();
