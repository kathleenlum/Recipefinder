const appID = "6ecb1dc7";
const appKey = "5cda4b82bb86fd115996729092ef1557";
const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appID}&app_key=${appKey}`;
const recipeContainer = document.querySelector("#recipe-container");
/*const txtSearch = document.querySelector("#txtSearch");
                                         
txtSearch.addEventListener("keyup", (e) => {
  const inputVal = txtSearch.value;
  if(e.keyCode === 13) {
    loadRecipies()
  }
})
var inp = "paneer";// $('.btn');
inp.on("click", set);
*/
var userInput = "eggs";

function getUserInput() {
  userInput = document.getElementById("food").value;
  console.log("received input", userInput);
  loadRecipies(userInput);
}



function loadRecipies(type = userInput) {
  
  const url=baseURL + `&q=${type}`;
  fetch(url)
      .then((res) =>res.json()) // give the query response
      .then((data) => renderRecipies(data.hits)) // chain the response received and "print" it
      .catch((error) => console.log(error)); // for catching errors in returning data
}
loadRecipies();
const getRecipeStepsStr = (ingredientLines = []) => {
  let str = "";
  for (var step of ingredientLines) {
    str = str+`<li>${step}</li>`
  }
  return str;
};
const renderRecipies = (recipeList = []) => {
  recipeList.forEach((recipeObj) => {
    const { label:recipeTitle, ingredientLines, image: recipeImage, 
          } = recipeObj.recipe;
    const recipeStepStr = getRecipeStepsStr(ingredientLines);
    const htmlStr = `<div class = "recipe">
        <div class = "recipe-title">${recipeTitle}</div>
        <div class = "recipe-text-img-parent">
        <div class = "recipe-text">
          
            <p> ${recipeStepStr} </p>
        
        </div>
        <div class = "recipe-image">
          <img src = "${recipeImage}">
        </div>
        </div>
      </div>`;
    recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
  });
};