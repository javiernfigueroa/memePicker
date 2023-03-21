import { catsData } from "./data.js";

const EMO_DIV = document.getElementById("emotion-radios");

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
    id='${i}'
    value='${i}'
    name='chose-radio'>
    </div>
    `;
  }
  EMO_DIV.innerHTML = emotionList;
}

renderEmotionsRadios(catsData);
