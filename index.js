const searchBox = document.querySelector(".searchBox");
const searchButton = document.querySelector(".searchButton");
const recipeContainer = document.querySelector(".recipeContainer");
const recipeDetailsContent = document.querySelector(".recipeDetailsContent");
const recipeCloseButton = document.querySelector(".recipeCloseButton");

const fetchRecipe = async (query) => {
  recipeContainer.innerHTML = "<h2>fetching recipies</h2>";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const res = await data.json();
    recipeContainer.innerHTML = "";
    res.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipeCard");
      recipeDiv.innerHTML = `
    <img src=${meal.strMealThumb} alt=""/>
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea} Dish</span></p>
    <p>Bleongs to <span>${meal.strCategory}</span></p>
    `;
      const buttonPopup = document.createElement("button");
      buttonPopup.textContent = "viewRecipe";
      buttonPopup.addEventListener("click", () => {
        openRecipePopup(meal);
      });
      recipeContainer.appendChild(recipeDiv);
      recipeDiv.appendChild(buttonPopup);
    });
  } catch (err) {
    recipeContainer.innerHTML = `<h2>Item Not Found </h2> `;
  }
};
const fetchInGredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li> ${measure}${ingredient}</li>`;
    } else {
      break;
    }
  }
  console.log(ingredientsList);
  return ingredientsList;
};

const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredients">${fetchInGredients(meal)}</ul>
    <div class="instructions">
            <h3>Instrucitons:</h3>
            <p>${meal.strInstructions}</p>
    </div>
        
    `;

  recipeDetailsContent.parentElement.style.display = "block";
};

recipeCloseButton.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>Type Meal to Search</h2>`;
    return;
  }
  fetchRecipe(searchInput);
});
