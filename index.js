// start section
const startSection = document.querySelector(".start-section");
const dogIconLink = document.getElementById("dog-icon__link");
const catIconLink = document.getElementById("cat-icon__link");
const h1 = document.querySelector("h1");

// animal section
const animalsSection = document.querySelector(".animals-section");
const animalsList = document.querySelector(".animals-list");
const currentAnimal = document.querySelector(".current-animal");
const loadButton = document.querySelector("button");

// nav
const catsNavLink = document.querySelector(".cats-link");
const dogsNavLink = document.querySelector(".dogs-link");

// api data
const dogs = {
  apiKey:
    "live_vfFCtnXKbvbxPbEv9tOYIWt5vCODXwDl5vxkHSNcivbBOUXiIbw4dFABes8ogCXX",
  url: "https://api.thedogapi.com/v1",
};

const cats = {
  apiKey:
    "live_S33yFEIT1lqQM9WHYwtq7lYtkcpyuFtH6RiJJNgZJhDPtsPro0qtTfF6o8AQAftN",
  url: "https://api.thecatapi.com/v1",
};

const limit = "limit=6";

let currentOpenAnimal = {
  apiKey: "",
  url: "",
};

async function getAnimals(animals) {
  try {
    const response = await fetch(
      `${animals.url}/images/search?${limit}&has_breeds=1$size=small`,
      {
        method: "GET",
        headers: {
          "x-api-key": animals.apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error with getting  animals data");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getBreedInfo(animals, breedId) {
  try {
    const response = await fetch(`${animals.url}/breeds/${breedId}`, {
      method: "GET",
      headers: {
        "x-api-key": animals.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Error with getting breed data");
    }

    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function diasplayBreedInfo(animals, breedId, img) {
  const breed = await getBreedInfo(animals, breedId);
  currentAnimal.style.display = "flex";

  currentAnimal.innerHTML = `<div class="animal-info">

     <img alt=${breed.name} loading="lazy" class='current-img' src=${img}> 
      <div class="breed-info">
      <h2 class="breed-name">${breed.name}</h2>
      <p><span>Life:</span> ${breed.life_span}</p>
      <p> <span>Temperament:</span>${breed.temperament}</p>
      </div>`;

  document.body.style.overflow = "hidden";
  currentAnimal.addEventListener("click", () => {
    currentAnimal.innerHTML = "";
    currentAnimal.style.display = "none";
    document.body.style.overflow = "";
  });
}

async function displayAnimalsList(animals) {
  const animalList = await getAnimals(animals);
  currentOpenAnimal.url = animals.url;
  currentOpenAnimal.apiKey = animals.apiKey;

  animalList.forEach((animal) => {
    const animalItem = document.createElement("li");

    animalItem.className = "animal-item";
    animalItem.innerHTML = `<div class="animal-img__wrap"><img alt='${animal.breeds[0].name}' src='${animal.url}'></div>`;
    animalsList.appendChild(animalItem);
    animalsSection.style.display = "block";

    animalItem.addEventListener("click", (e) => {
      diasplayBreedInfo(animals, animal.breeds[0].id, animal.url);
    });
  });
}

function hideStartSection() {
  startSection.style.display = "none";
  h1.style.display = "block";
}

// Eventlisteners

function addClickEvent(el, animals) {
  el.addEventListener("click", (e) => {
    animalsList.innerHTML = "";
    e.preventDefault();
    hideStartSection();
    displayAnimalsList(animals);
  });
}

addClickEvent(catIconLink, cats);
addClickEvent(catsNavLink, cats);
addClickEvent(dogIconLink, dogs);
addClickEvent(dogsNavLink, dogs);

loadButton.addEventListener("click", () => {
  displayAnimalsList(currentOpenAnima);
});
