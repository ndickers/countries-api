document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("./data.json");
  const countries = await response.json();
  const section = document.querySelector(".countries-section");

  const selectInput = document.querySelector("#region");
  const search = document.querySelector("#search");

  // search.addEventListener("input", async function ({ target }) {
  //   section.innerHTML = "";
  //   const region = await filterCountries(target.value);
  //   await createCountries(region, section);
  // });

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
    const createArticle = document.createElement("article");
    createArticle.addEventListener("click", function () {
      const main = document.querySelector("main");
      document.querySelector(".search").innerHTML = "";
      window.history.pushState(null, null, "country");
      const url = window.location.pathname;

      if (url === "/country") {
        main.innerHTML = detailPage(country);
      }
    });

    const article = `
  <img src=${country.flag} alt="" srcset="" />
  <div>
  <h2>${country.name}</h2>
  <p>Population: <span>${country.population}</span></p>
  <p>Region: <span>${country.region}</span></p>
  <p>Capital: <span>${country.capital}</span></p>
  </div>
`;
    createArticle.innerHTML = article;
    section.appendChild(createArticle);
  });
}

function detailPage(country) {
  return `<a href="./index.html">
  <img class="back-icon" src="./assets/back-arrow.svg" alt="" srcset="" />
  back</a>

  <div>
    <img src=${country.flags.svg} alt="" srcset="" />
 <div>
 <div>
 <h2>${country.name}</h2>
 <p>Native Name: <span>Belgie</span></p>
 <p>Population:<span>${country.population}</span></p>
 <p>Region: <span>${country.region}</span></p>
 <p>Sub Region: <span>${country.subregion}</span></p>
 <p>Capital: <span>${country.capital}</span></p>
</div>
<div>
 <p>Top Level Domain: <span>${country.topLevelDomain}</span></p>
 <p>Currencies:<span>${country.currencies[0].code}</span></p>
 <p>Languages: <span>${
   (country.languages[0].name, country.languages[0].native)
 }</span></p>
</div>
 </div>

    <h3>Border Countries:</h3>
    <div>
      <p>${country?.borders[0]}</p>
      <p>${country?.borders[1]}</p>
      <p>${country?.borders[2]}</p>
    </div>
  </div>
`;
}
