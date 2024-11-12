document.addEventListener('DOMContentLoaded', async () => {
  const apiKey = 'YOUR_SPOONACULAR_API_KEY';
  const path = window.location.pathname;
  const searchInput = document.getElementById('searchInput');
  const recipesContainer = document.getElementById('recipes');
  const recommendedSection = document.getElementById('recommendedSection');
  const recommendedRecipesContainer = document.getElementById('recommendedRecipes');
  const recipeModal = document.getElementById('recipeModal');
  const recipeDetails = document.getElementById('recipeDetails');

  if (path.includes('index.html')) {
    if (searchInput) {
      searchInput.addEventListener('input', async () => {
        const query = searchInput.value.trim();
        if (query.length === 0) {
          recipesContainer.innerHTML = '';
          recommendedSection.style.display = 'block';
          return;
        }

        if (query.length >= 3) {
          recommendedSection.style.display = 'none';
          await searchRecipes(query);
        }
      });
    } else {
      console.error("Element with id 'searchInput' not found.");
    }

    if (recommendedRecipesContainer) {
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=8&apiKey=${apiKey}`);
        const data = await response.json();
        displayRecipes(data.recipes, 'recommendedRecipes');
      } catch (error) {
        console.error('Error fetching recommended recipes:', error);
      }
    } else {
      console.error("Element with id 'recommendedRecipes' not found.");
    }
  }

  if (path.includes('favorite.html')) {
    loadFavorites();
  }

  async function searchRecipes(query) {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        displayRecipes(data.results);
      } else {
        recipesContainer.innerHTML = '<p>No recipes found. Please try another search.</p>';
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  function displayRecipes(recipes, containerId = 'recipes') {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Element with id '${containerId}' not found.`);
      return;
    }

    container.innerHTML = '';
    if (recipes.length === 0) {
      container.innerHTML = '<p>No recipes found. Please try another search.</p>';
      return;
    }

    recipes.forEach(recipe => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');
      recipeCard.innerHTML = `
        <img src="https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p>Ready in ${recipe.readyInMinutes ? recipe.readyInMinutes : 'N/A'} minutes</p>
        <button onclick="showRecipeDetails(${recipe.id})">View Recipe</button>
      `;
      container.appendChild(recipeCard);
    });
  }

  window.showRecipeDetails = async function (recipeId) {
    const recipeDetails = document.getElementById('recipeDetails');
    if (!recipeDetails) {
      console.error("Element with id 'recipeDetails' not found.");
      return;
    }

    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=${apiKey}`);
      const recipe = await response.json();

      let addToFavoritesButton = '';
      if (window.location.pathname.includes('index.html')) {
        addToFavoritesButton = `<button onclick="saveFavorite(${recipe.id}, \`${recipe.title}\`, \`${recipe.image}\`)">Add to Favorites</button>`;
      }

      recipeDetails.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>Ingredients</h3>
        <ul>${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('')}</ul>
        <h3>Instructions</h3>
        <p>${recipe.instructions}</p>
        <h3>Nutrition</h3>
        <p>Calories: ${recipe.nutrition.nutrients[0].amount}</p>
        ${addToFavoritesButton}
      `;
      recipeModal.style.display = 'block';
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  window.saveFavorite = function (recipeId, title, image) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.id === recipeId)) {
      favorites.push({ id: recipeId, title, image });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(`${title} added to favorites!`);
    } else {
      alert(`${title} is already in favorites.`);
    }
  };

  function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorites');
    favoritesContainer.innerHTML = '';

    if (favorites.length === 0) {
      favoritesContainer.innerHTML = '<p>No favorite recipes added yet.</p>';
      return;
    }

    favorites.forEach(fav => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');
      recipeCard.innerHTML = `
        <img src="${fav.image}" alt="${fav.title}">
        <h3>${fav.title}</h3>
        <button onclick="showRecipeDetails(${fav.id})">View Recipe</button>
      `;
      favoritesContainer.appendChild(recipeCard);
    });
  }

  document.querySelector('.close')?.addEventListener('click', () => {
    recipeModal.style.display = 'none';
  });

  window.onclick = event => {
    if (event.target == recipeModal) {
      recipeModal.style.display = 'none';
    }
  };
});
