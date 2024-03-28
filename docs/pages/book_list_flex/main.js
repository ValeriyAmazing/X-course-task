(() => {
  const list = document.getElementById("list");
  const search = document.getElementById("search");
  const options = document.getElementById("category");

  window.onload = filter

  async function filter() {
    const { books } = await fetch("../../books.json").then((response) =>
      response.json(),
    );
    const option = options.value;
    
    list.innerHTML =
      books
        .filter(
          (item) =>
            item.title.toLowerCase().includes(search.value.toLowerCase().trim()) ||
            item.author.toLowerCase().includes(search.value.toLowerCase().trim()),
        )
        .sort((a, b) => {
          if (typeof a[option] === "number") {
            return a[option] - b[option];
          }
          if (typeof a[option] === "string") {
            return a[option].localeCompare(b[option]);
          }
          return 0;
        })
        .map(
          ({ author, price, image, title }) => `
          <li class="books__item">
          <div class="book">
            <div class="book__img" style="background-image: url(${image || "../../img/default_book_cover.webp"})"></div>
            <p class="book__name">${title}</p>
            <p class="book__author">${author}</p>
            <div class="book__bottom-wrapper"><span class="book__price">${price}</span>
              <button class="book__btn">Viev</button>
            </div>
          </div>
        </li>`,
        )
        .join("") ||
      `<li style="font-size: 3rem; text-align: center; width:100%">Nothing to show</li>`;
  }

  options.onchange = filter;
  search.oninput = filter;
})();
