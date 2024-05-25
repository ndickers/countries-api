document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("./data.json");
  const countries = await response.json();
  const section = document.querySelector(".countries-section");

  const selectInput = document.querySelector("#region");
  const search = document.querySelector("#search");

  search.addEventListener("input", function ({ target }) {
    const getSearch = countries.filter((country) =>
      country.name.toLowerCase().includes(target.value.toLowerCase())
    );
    section.innerHTML = "";
    createCountries(getSearch, section);
  });

  // implement dark mode
  const changeMode = document.querySelector(".change-mode-btn");
  changeMode.addEventListener("click", function () {
    const getRoot = document.querySelector(":root");
    const themeIcon = document.querySelector(".mode-icon");
    const backIcon = document.querySelector(".back-icon");
    if (getRoot.classList.contains("dark")) {
      getRoot.classList.remove("dark");
      themeIcon.setAttribute("src", "./assets/light-icon.png");
    } else {
      getRoot.classList.add("dark");
      themeIcon.setAttribute("src", "./assets/dark-icon.png");
      backIcon.setAttribute("src", "./assets/back-arrow-light.png");
    }

    console.log(getRoot);
  });

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
  console.log(country.languages);
  return `<div class="detail-container">
  <a href="./index.html">
  <img class="back-icon" src="./assets/back-arrow.png" alt="" srcset="" />
  back</a>

  <div class="detail-flex">
    <img class="country-img" src=${country.flags.svg} alt="" srcset="" />
<div class="country-details">
<div class="split-details">
<h2>${country.name}</h2>
<div class="split-content">
<div class="detail-page">

<p>Native Name: <span>Belgie</span></p>
<p>Population:<span>${country.population}</span></p>
<p>Region: <span>${country.region}</span></p>
<p>Sub Region: <span>${country.subregion}</span></p>
<p>Capital: <span>${country.capital}</span></p>
</div>
<div class="domain-sec">
<p>Top Level Domain: <span>${country.topLevelDomain}</span></p>
<p>Currencies:<span>${country.currencies[0].code}</span></p>
<p>Languages: <span>${
    (country.languages[0].name, country.languages[0].nativeName)
  }</span></p>
</div></div>
</div>


   <div class="flex-border">
   <h3>Border Countries:</h3>
   <div class="borders">
     <p>${country.borders.length !== 0 ? country.borders[0] : "No border"}</p>
     <p>${country.borders.length !== 1 ? country.borders[1] : "No border"}</p>
     <p>${country.borders.length !== 2 ? country.borders[2] : "No border"}</p>
   </div>
   </div>
</div>
  </div>
  </div>
`;
}
