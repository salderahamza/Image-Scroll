const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let loadedImages = 0;
let totalImages = 0;
let photosArray = [];

const count = 5;
const apiKey = "euX5xagJWCUR4fSKIAvYx0Q1Eyh5azlwIDq8Z-uO7tw";
const apiUrl =
  `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  loadedImages++;
  console.log(loadedImages);
  if (loadedImages === totalImages) {
    ready = true;
    console.log("ready =", ready);
    loader.hidden = true;
    count = 10;
  }
}

function displayPhotos() {
  loadedImages = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("alt", photo.alt_description);
    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get photos from Unspalsh API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Catch Error Here
    console.log(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
