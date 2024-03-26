(() => {
  const list = document.getElementById("list");
  const search = document.getElementById("search");
  const options = document.getElementById("category");

  window.onload = filter
//   async function () {
//     const { books } = await fetch("books.json").then((response) =>
//       response.json(),
//     );
//     list.innerHTML =
//       books
//         .map(
//           ({ author, price, image, title }) => `
//         <li class="item">
//             <div class="item__img-wrapper">
//                 <img class="item__img" src=${
//                   image || "../../img/default_book_cover.webp"
//                 } alt=${title}></div>
//             <p class="item__name">${title}</p>
//             <p class="item__author">${author}</p>
//             <div class="item__bottom-wrapper">
//                 <span class="item__price">${price}</span>
//                 <a href="../book"><button class="item__btn">Viev</button></a>
//             </div>
//         </li>
// `,
//         )
//         .join("") ||
//       `<li style="font-size: 3rem; text-align: center; width:100%">Nothing to show</li>`;
//   };

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
        <li class="item">
            <div class="item__img-wrapper">
                <img class="item__img" src=${
                  image || "../../img/default_book_cover.webp"
                } alt=${title}></div>
            <p class="item__name">${title}</p>
            <p class="item__author">${author}</p>
            <div class="item__bottom-wrapper">
                <span class="item__price">${price}</span>
                <a href="../book">
                  <button class="item__btn">Viev</button>
                </a>
            </div>
        </li>`,
        )
        .join("") ||
      `<li style="font-size: 3rem; text-align: center; width:100%">Nothing to show</li>`;
  }

  options.onchange = filter;
  search.oninput = filter;
})();
