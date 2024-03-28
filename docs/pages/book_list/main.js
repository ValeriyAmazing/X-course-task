(() => {
  const list = document.getElementById("list");
  const search = document.getElementById("search");
  const options = document.getElementById("filter");

  window.onload = filter;

  async function filter() {
    const { books } = await fetch("../../books.json").then((response) =>
      response.json(),
    );
    const option = options.value;

    list.innerHTML =
      books
        .filter(
          (item) =>
            item.title
              .toLowerCase()
              .includes(search.value.toLowerCase().trim()) ||
            item.author
              .toLowerCase()
              .includes(search.value.toLowerCase().trim()),
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
          <li class="list__item item">
            <a class="item__img-wrapper" href="../book">
              <div class="item__img" style="background-image:url(${image ||"../../img/default_book_cover.webp"})"></div>
            </a>
            <p class="item__name">${title}</p>
            <p class="item__author">${author}</p>
            <span class="item__price">${price}</span>
            <a class="item__link" href="../book">Viev</a>
        </li>`,
        )
        .join("") ||
      `<li style="font-size: 3rem; text-align: center; grid-column: span 4; grid-row: span 4;width:100%">Nothing to show</li>`;
  }

  options.onchange = filter;
  search.oninput = filter;
})();
