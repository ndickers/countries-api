document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("./data.json");
  const countries = await response.json();
  const section = document.querySelector(".countries-section");

  const selectInput = document.querySelector("#region");

  const filteRegion = [];
  selectInput.addEventListener("change", function ({ target }) {
    console.log(target.value);
    countries.filter((country) => {
      console.log(country.region);
      return country.region === target.value.forEach((country) => {
        console.log(country.region);
      });
    });
  });

  countries.forEach((country) => {
    const createlink = document.createElement("a");
    createlink.setAttribute("href", "./details.html");
    const article = `<article country= ${country}>
  <img src=${country.flag} alt="" srcset="" />
  <h2>${country.name}</h2>
  <p>Population: <span>${country.population}</span></p>
  <p>Region: <span>${country.region}</span></p>
  <p>Capital: <span>${country.capital}</span></p>
</article>`;
    createlink.innerHTML = article;
    section.appendChild(createlink);

    // createlink.addEventListener("click", function () {
    //   console.log(country);
    // });
  });
});
