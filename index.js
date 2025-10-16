const dogIconLink=document.getElementById('dog-icon__link');
const catIconLink=document.getElementById('cat-icon__link');
const chooseBlock=document.getElementsByClassName('choose-block')[0];
const h1=chooseBlock.querySelector('h1')
const animalsList=document.getElementsByClassName('animals-list')[0]

const dogApiKey =
  "live_vfFCtnXKbvbxPbEv9tOYIWt5vCODXwDl5vxkHSNcivbBOUXiIbw4dFABes8ogCXX";
const catApiKey= 'live_S33yFEIT1lqQM9WHYwtq7lYtkcpyuFtH6RiJJNgZJhDPtsPro0qtTfF6o8AQAftN'
const dogUrl = "https://api.thedogapi.com/v1/images/search?";
const catUrl = "https://api.thecatapi.com/v1/images/search?";
const limit = "limit=10";

async function getAnimals(url, apiKey) {
  const response = await fetch(`${url}${limit}&has_breeds=1`, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
    },
  });
  const data = await response.json();
  console.log(data)
  return data;
}

async function displayAnimals(url, apiKey) {
  const animalList = await getAnimals(url, apiKey);
  animalList.forEach((animal) => {
   const animalItem=document.createElement('li');
   animalItem.innerHTML=(`<img src='${animal.url}' height='300'>`);
   animalsList.appendChild(animalItem);
  });
}

function hideTitlePage(){
chooseBlock.style.display="none";
h1.style.display='block';
}

dogIconLink.addEventListener('click',(e)=>{
   e.preventDefault();
   hideTitlePage();
   displayAnimals(dogUrl, dogApiKey)});

catIconLink.addEventListener('click',(e)=>{
   hideTitlePage();
   e.preventDefault();
   displayAnimals(catUrl,catApiKey)});