import { catsData } from "./data.js";

const EMO_DIV = document.getElementById("emotion-radios");
const BTN_GET_IMG = document.getElementById("get-image-btn");
const CHECK_GIFT_BOX = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const MODAL_CLOSE_BTN = document.getElementById('meme-modal-close-btn')

BTN_GET_IMG.addEventListener("click", renderCat);
EMO_DIV.addEventListener("change", highlightCheckedOption);
MODAL_CLOSE_BTN.addEventListener("click", closeModal)

function closeModal () {
    memeModal.style.display = 'none';
}

function highlightCheckedOption(e) {
  let target = document.getElementById(e.target.id);
  const arrayAll = document.getElementsByClassName("radio");
  for (let i of arrayAll) {
    i.classList.remove("highlight");
  }
  target.parentElement.classList.add("highlight");
}

function getMatchingCatArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const radioValue = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = CHECK_GIFT_BOX.checked;
    const getMatchedCats = catsData.filter(function (cats) {
      if (isGif) {
        return cats.isGif === true && cats.emotionTags.includes(radioValue);
      } else {
        return cats.emotionTags.includes(radioValue);
      }
    });
    return getMatchedCats;
  }
}

function getSingleCatObject() {
  const catsArray = getMatchingCatArray();

  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const randomNumber = Math.floor(Math.random() * catsArray.length)
    return catsArray[randomNumber]
  }
}
function renderCat() {
  const catObject = getSingleCatObject();
  memeModalInner.innerHTML = `<img 
  class="cat-img" 
  src="./images/${catObject.image}"
  alt=${catObject.alt}
  >`
  memeModal.style.display = 'flex'
}

function getEmotionsArray(cats) {
  let emo = [];
  for (let cat of cats) {
    for (let emotions of cat.emotionTags) {
      if (!emo.includes(emotions)) {
        emo.push(emotions);
      }
    }
  }
  return emo;
}

function renderEmotionsRadios(cats) {
  let emotionList = "";
  const emotions = getEmotionsArray(cats);
  for (let i of emotions) {
    emotionList += `
    <div class="radio">
    <label for'${i}'>${i}</label>
    <input 
    type='radio' 
    id="${i}"
    value='${i}'
    name='chose-radio'>
    </div>
    `;
  }
  EMO_DIV.innerHTML = emotionList;
}

renderEmotionsRadios(catsData);
