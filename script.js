const categorySelect = document.getElementById("category");
const getButton = document.getElementById("get-button");
const gallery = document.querySelector(".gallery");
const API_URL = "https://api.thecatapi.com";
const API_KEY = "live_HWziIScxan4YMYsSfjJVvUPpTyBMWymZFbP30pnd598IKF5nSgPZGf8iQ7p6MWbd"; // your API key goes here;
const getFav = document.getElementById("get-favourites");





// }
async function populateCategory() {
  try {
    const response = await fetch(`${API_URL}/v1/categories?api_key=${API_KEY}`);
    const categData = await response.json();
    console.log(categData);
    console.log(categData.length);

    if (!response.ok) {
      throw new Error("Failed to populate the categories");
    }
    for (let i = 0; i < categData.length; i++) {
      const option = document.createElement("option");
      option.value = categData[i].id;
      option.textContent = categData[i].name;
      categorySelect.appendChild(option);

    }
  }
  catch (error) {
    console.error(error.message);
  };

}

getButton.addEventListener("click", async function () {
  const selectedCategory = categorySelect.value;
  try {
    const response = await fetch(`${API_URL}/v1/images/search?limit=9&category_ids=${selectedCategory}&api_key=${API_KEY}`);


    const getImages = await response.json();
    console.log(getImages);
    displayimages(getImages);
    if (!response.ok) {
      throw new Error("Failed to fetch cat pictures");
    }

  } catch (error) {
    console.log(error);
  }
});

var urls = [];

getFav.addEventListener("click", async function () {
  for (let i = 0; i < favid.length; i++) {
    (async () => {
      try {
        const response = await fetch(`${API_URL}/v1/favourites/${favid[i]}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error("Request failed with status: " + response.status);
        }

        const data = await response.json();
        console.log("Favourite:", data);
        // displayimages(data);
        console.log(data.image.url);
        displayFavImage(data.image.url);

      } catch (error) {
        console.error("Error fetching favourite:", error);
      }
    })();
  }
});

function displayFavImage(imageUrl) {
  const item = document.createElement("div");
  const img = document.createElement("img");

  item.classList.value = "gallery-item";
  img.src = imageUrl;
  console.log(imageUrl);
  item.appendChild(img);
  gallery.appendChild(item);
}



// function displayfavs(arr) {
//   gallery.innerHTML = "";

//   for (let i = 0; i < arr.length; i++) {
//     const item = document.createElement("div");
//     const img = document.createElement("img");
//     item.classList.value = "gallery-item";
//     img.id = result[i].id;

//     item.appendChild(img);
//     gallery.appendChild(item)
//     item.append(heart);
//     img.src = arr[i].url;
//   }
// }


function displayimages(result) {

  gallery.innerHTML = "";

  for (let i = 0; i < result.length; i++) {
    const heart = document.createElement("span");
    const item = document.createElement("div");
    const img = document.createElement("img");
    heart.classList.add("heart");
    heart.innerHTML = "&#x2764;";

    item.classList.value = "gallery-item";
    img.id = result[i].id;

    item.appendChild(img);
    gallery.appendChild(item)
    item.append(heart);
    img.src = result[i].url;
    item.addEventListener("click", addToFavourite);


  }
}

populateCategory();


// Add your code here

/* Bonus */

/* 
You'll need to append the heart and add an eventlistener to each image parent (div) when you create it. Here is the code to do that. You might have to modify it a bit differently if you used a different variable name.

    const heart = document.createElement("span");
    heart.classList.add("heart");
    heart.innerHTML = "&#x2764;";
    div.addEventListener("click", addToFavourite);
*/

/* Uncomment below for the bonus, this is the function that will be called when you click each image. I've used e.currentTarget instead of e.target because it's more reliable. I would encourage you to google it and read about it to understand the differences. */

var favid = [];

async function addToFavourite(e) {
  e.currentTarget.classList.toggle("showheart");
  console.log('clicked');
  console.log(e.srcElement.id);


  const requestData = {
    image_id: e.srcElement.id
  };

  fetch("https://api.thecatapi.com/v1/favourites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY
    },
    body: JSON.stringify(requestData)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Favourite added:", data);
      favid.push(data.id);
      console.log("favid:", favid);
    })
    .catch(error => {
      console.error("Error adding favourite:", error);
    });
  // Add your code here
}




console.log(favid);