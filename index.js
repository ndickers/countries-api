document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("./data.json");
  const countries = await response.json();
  const section = document.querySelector(".countries-section");

  const selectInput = document.querySelector("#region");

  selectInput.addEventListener("change", async function ({ target }) {
    section.innerHTML = "";
    if (target.value === "all") {
      await createCountries(countries, section);
    }
    const region = await filterCountries(target.value);
    await createCountries(region, section);
    // await createCountries(countries, section);
  });

  function filterCountries(value) {
    return countries.filter((country) => country.region === value);
  }

  await createCountries(countries, section);
});

function createCountries(countryArray, section) {
  countryArray.forEach((country) => {
    const createlink = document.createElement("a");
    createlink.setAttribute("href", "./details.html");
    createlink.addEventListener("click", nextPage);
    const article = `<article country= ${country}>
  <img src=${country.flag} alt="" srcset="" />
  <h2>${country.name}</h2>
  <p>Population: <span>${country.population}</span></p>
  <p>Region: <span>${country.region}</span></p>
  <p>Capital: <span>${country.capital}</span></p>
</article>`;
    createlink.innerHTML = article;
    section.appendChild(createlink);
  });
}

function nextPage() {
  console.log("nooo");
}
