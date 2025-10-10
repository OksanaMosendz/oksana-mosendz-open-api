
const apiKey="live_vfFCtnXKbvbxPbEv9tOYIWt5vCODXwDl5vxkHSNcivbBOUXiIbw4dFABes8ogCXX"
const url="https://api.thedogapi.com/v1/images/search?"
const limit='limit=10'

async function dogs() {
   const response=await fetch(`${url}${limit}&has_breeds=1`,{
      method: "GET",
      headers:{
         'x-api-key': apiKey
      } 
   })
   const data=await response.json();
   return data;
} 


async function displayDogs(){
  const dogsList= await dogs();
  dogsList.forEach((dog)=>{
  console.log(`This is ${dog.breeds[0].name}. This breed is for ${dog.breeds[0].bred_for} `)
  })

}

displayDogs()