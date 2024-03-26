(() => {
  const count = document.getElementById("count");
  const total = document.getElementById("total-price");
  const price = document.getElementById("price");
  const image = document.querySelector(".detail__img");
  const name = document.querySelector(".inner-detail__name");
  const author = document.querySelector(".inner-detail__author");
  const level = document.querySelector(".inner-detail__level");
  const tags = document.querySelector(".inner-detail__tags");
  const description = document.querySelector(".description__text");

  window.onload = async function () {
    const { books } = await fetch("books.json").then((response) =>
      response.json(),
    );
    const book = books[(Math.random() * books.length) | 0];

    price.textContent = book.price;
    image.src = book.image || "../../img/default_book_cover.webp";
    image.alt = book.title;
    name.textContent = book.title;
    author.textContent = book.author;
    level.textContent = book.level;
    price.textContent = book.price;
    total.textContent = book.price;
    description.textContent = book.description;
    tags.innerHTML = book.tags
      .map((tag) => `<a href="#">#${tag}</a>`)
      .join(" ");
  };

  document.getElementById("form").onsubmit = (e) => {
    e.preventDefault();
  };

  count.oninput = (e) => {
    if (count.value > 0 && count.value < 43)
      total.innerText = count.value * price.innerText;
    else {
      alert("You entered incorrect values");
      count.value = 1;
      total.innerText = count.value * price.innerText;
    }
  };
})();
