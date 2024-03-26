(() => {
  window.onload = async () => {
    const { books } = await fetch("../../books.json").then((response) =>
      response.json(),
    );
    let total = 0;
    const list = document.querySelector(".list");
    list.innerHTML = books
      .map(({ title, price }) => {
        return (
          `<li class="item"> 
        <p class="item__book-name">${title}</p><span class="item__count">1</span><span class="item__total">${price}</span>
        <button class="item__delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill=color d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
        </button>
    </li>`);
      })
      .join("");
    getTotal();

    const items = document.querySelectorAll(".item");
    items.forEach((item) => {
      const btn = item.querySelector("button");
      btn.addEventListener("click", () => {
        if (confirm("Delete item?")) {
          item.remove();
          getTotal();
        }
      });
    });
  };

  function getTotal() {
    const total = Array.from(document.querySelectorAll(".item .item__total"))
      .map((e) => +e.innerHTML)
      .reduce((a, e) => a + e, 0);
    const totalPrice = document.querySelector(".total__price");
    totalPrice.innerHTML = total.toFixed(2);
  }
})();
