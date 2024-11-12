
# Recipe Finder

Recipe Finder — это веб-приложение, которое позволяет пользователям искать рецепты, просматривать подробную информацию о рецептах, добавлять их в избранное, а также просматривать рекомендации рецептов. Приложение использует [Spoonacular API](https://spoonacular.com/food-api) для получения данных о рецептах.

## Функции

### 1. Поиск рецептов
- Пользователи могут искать рецепты по названию.
- Минимальная длина запроса — 3 символа.
- Если поле поиска пустое, отображаются рекомендуемые рецепты.

### 2. Отображение рецептов
- Рецепты отображаются в виде сетки карточек, каждая из которых включает изображение, название, время приготовления и кнопку для просмотра деталей.

### 3. Страница с деталями рецепта
- При нажатии на рецепт открывается модальное окно с:
  - Названием рецепта
  - Изображением
  - Ингредиентами
  - Инструкциями
  - Пищевой ценностью (калории)
- Кнопка добавления рецепта в избранное (на главной странице).

### 4. Избранное (Favorite Recipes)
- Пользователи могут добавлять рецепты в избранное для будущего просмотра.
- Избранное хранится в `localStorage`, что позволяет сохранить данные даже после обновления страницы.
- На отдельной странице "Your Favorite Recipes" можно просмотреть все добавленные рецепты и открыть подробности.

### 5. Рекомендации рецептов
- На главной странице отображается блок с рекомендуемыми рецептами.

## Установка и настройка

### Предварительные требования
- Убедитесь, что у вас установлен любой современный браузер.

### Шаги установки
1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/yourusername/recipe-finder.git
   cd recipe-finder
   ```

2. Получите API-ключ на сайте [Spoonacular](https://spoonacular.com/food-api).
3. Вставьте ваш API-ключ в `script.js`:
   ```javascript
   const apiKey = 'YOUR_SPOONACULAR_API_KEY';
   ```

4. Откройте `index.html` в браузере, чтобы запустить приложение.

## Использование

- **Поиск рецептов**: Введите название рецепта в строку поиска, и результаты появятся автоматически, если длина запроса >= 3 символов.
- **Просмотр деталей рецепта**: Нажмите на карточку рецепта, чтобы открыть модальное окно с подробной информацией.
- **Добавление в избранное**: В модальном окне на главной странице нажмите на кнопку "Add to Favorites" для добавления рецепта в избранное.
- **Просмотр избранного**: Нажмите на ссылку "View Favorites" для просмотра сохраненных рецептов. Для возврата на главную страницу нажмите "Back to Search".

## Структура проекта

- `index.html` — основной HTML-файл для поиска рецептов.
- `favorite.html` — HTML-файл для отображения избранных рецептов.
- `style.css` — стили для оформления приложения.
- `script.js` — основной JavaScript-файл, включающий логику приложения.

## Заметки

- Приложение использует `localStorage` для сохранения избранного, поэтому данные сохраняются локально на устройстве пользователя.
- API-ключ должен быть защищен. В целях безопасности, если приложение будет размещено, рекомендуется использовать серверный прокси или другие методы защиты.
