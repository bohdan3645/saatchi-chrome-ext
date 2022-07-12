const fillInInput = document.getElementById("fillInInput");

// set the canvas size
let canvasHeight = '100';
let canvasWidth = '150';
let canvasWeight = '4.5';
let canvasPrice = '600';
let canvasName = 'Landscape'
let curentNum = 0;

const canvasSizeList = document.getElementsByName('canvas_size');
for(let i = 0; i < canvasSizeList.length; i++) {
  canvasSizeList[i].addEventListener('change', (e) => {
    const tgt = e.target;
    canvasHeight = tgt.getAttribute('data-height');
    canvasWidth = tgt.getAttribute('data-width');
    canvasWeight = tgt.getAttribute('data-weight');
    canvasPrice = Number(tgt.getAttribute('data-price'));
    console.log(canvasHeight, canvasWidth, canvasWeight, canvasPrice);
  })
}


chrome.storage.sync.get('landscapeNo', (result) => {
  curentNum = result.landscapeNo;
});

const canvasNameList = document.getElementsByName('collection_name');
for(let i = 0; i < canvasNameList.length; i++) {
  canvasNameList[i].addEventListener('change', (e) => {
    const tgt = e.target;
    canvasName = tgt.getAttribute('data-name');
    // set the paiting number saved in chrome storage
    if(tgt.getAttribute('data-name') == 'Meditation'){
      chrome.storage.sync.get('meditationNo', (result) => {
        curentNum = result.meditationNo;
      });
    };
  });
};





  //display current number of painting
  const displayMeditationNo = document.getElementById("displayMeditationNo");
  chrome.storage.sync.get('meditationNo', (result) => {
    displayMeditationNo.innerHTML = result.meditationNo;
  });

  const displayLandscapeNo = document.getElementById("displayLandscapeNo");
  chrome.storage.sync.get('landscapeNo', (result) => {
    displayLandscapeNo.innerHTML = result.landscapeNo;
  });
    




// When the button is clicked, inject setPageBackgroundColor into current page
fillInInput.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setInputValue,
      args: [canvasHeight, canvasWidth, canvasWeight, canvasPrice, canvasName, curentNum],
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  
async function setInputValue(canvasHeight, canvasWidth, canvasWeight, canvasPrice, canvasName, curentNum) {

  //set new price 
  
  canvasPrice = Number(canvasPrice) + (Math.floor(Math.random() * 12)) * 50;

  // UPLOAD PHOTO PAGE
  // go to the next page
  document.querySelector('.wizard-button--right').click() 


  ////////////////////////////////////////////// CATEGORY PAGE
  setTimeout(categoryPage, 3000);
  function categoryPage() {

    // choose subject
    document.querySelector(".rw-select").click()
    setTimeout(document.querySelectorAll('.rw-list-option')[0].click(), 100);

    // choose category
    document.getElementsByClassName("react-tooltip")[0].click()

    // go to the next page
    setTimeout(document.querySelector('.wizard-button--right').click(), 500);

  }



  ////////////////////////////////////////////// ARTWORK STATUS PAGE
  setTimeout(artworkStatuPage, 6000);
  function artworkStatuPage() {

    // year
    document.querySelector(".rw-select").click()
    setTimeout(document.querySelectorAll('.rw-list-option')[0].click(), 100);

    // original
    document.querySelectorAll('.button-radio__button')[0].click();
    // for sale
    document.querySelectorAll('.button-radio__button')[2].click();
    // print
    document.querySelectorAll('.button-radio__button')[4].click();

    // go to the next page
    setTimeout(document.querySelector('.wizard-button--right').click(), 500);

  }


  ////////////////////////////////////////////// CROPS PAGE
  setTimeout(cropsPage, 11000);
  function cropsPage() {

  // go to the next page
  
  setTimeout(document.querySelector('.wizard-button--right').click(), 500);
 
  }



  // MEDIUMS PAGE
  setTimeout(mediumsPage, 14000);
  function mediumsPage() {

    // mediums
    document.querySelectorAll(".rw-input")[0].click()
    setTimeout(document.querySelectorAll('.rw-list-option')[3].click(), 100);

    // material
    setTimeout(document.querySelectorAll(".rw-input")[1].click(), 150);
    setTimeout(document.querySelectorAll('.rw-list-option')[2].click(), 200);

    // styles
    setTimeout(document.querySelectorAll(".rw-input")[2].click(), 250);
    setTimeout(document.querySelectorAll('.rw-list-option')[0].click(), 300);
    setTimeout(document.querySelectorAll(".rw-input")[2].click(), 350);
    setTimeout(document.querySelectorAll('.rw-list-option')[0].click(), 400);
    setTimeout(document.querySelectorAll(".rw-input")[2].click(), 450);
    setTimeout(document.querySelectorAll('.rw-list-option')[7].click(), 500);

    // keywords
    setTimeout( ()=> {
      let keyWords = ['art', 'fine art', 'painting', 'acrylic', 'canvas', 'abstract', 'abstract painting', 'acrylic on canvas', 'interior', 'interior design', 'large painting', 'living room',
                        'home decoration', 'big painting', 'large-scale painting', 'famous painting', 'famous artist', 'famous artists', 'popular artist', 'vivid', 'color', 'colour', 'colorful', 'bright', 
                        'interesting', 'beautiful', 'love', 'home', 'house', 'new york shool', 'usa', 'affordable', 'affordable art', 'affordable painting', 'popular', 'high-end', 'emerging artists',
                        'xxl', 'stripes', 'multicolor', 'geometric', 'brooklyn', 'color fields', 'lines', 'los angeles', 'contemporary', 'contemporary artist', 'contemporary abstract', 'modern abstract',
                        'painterly', 'wall', 'wall decor', 'seattle', 'white', 'happy', 'free', 'drama', 'texture', 'pattern', 'shapes', 'layer', 'layers', 'expressionism', 'bold', 'gestural', 'pigment',
                        'artbasel', 'light colors', 'collage', 'light'];

      const key = document.querySelectorAll(".rw-input")[3];
      
      for(i = 0; i < 12; i++) {
        let index = Math.floor(Math.random() * keyWords.length)
        key.value = keyWords[index];

        key.dispatchEvent(new Event("change", { bubbles: true }));
        key.dispatchEvent(new Event("blur", { bubbles: true }));
        key.dispatchEvent(new Event("input", { bubbles: true }));
        document.querySelector('.rw-create-list-option').click();
        keyWords.splice(index, 1);
        console.log(keyWords.length);
      }
      
      // go to the next page
      setTimeout(document.querySelector('.wizard-button--right').click(), 500);
    }, 600);
  };



  ////////////////////////////////////////////// DIMENTIONS PAGE
  setTimeout(dimentionsPage, 17000);
    function dimentionsPage() {
    // height
    const height = document.querySelectorAll('.input-container')[0].lastChild;
    height.value = canvasHeight;
    height.dispatchEvent(new Event("change", { bubbles: true }));
    height.dispatchEvent(new Event("blur", { bubbles: true }));
    height.dispatchEvent(new Event("input", { bubbles: true }));
    
    
  // width
    const width = document.querySelectorAll('.input-container')[1].lastChild;
    width.value = canvasWidth;
    width.dispatchEvent(new Event("change", { bubbles: true }));
    width.dispatchEvent(new Event("blur", { bubbles: true }));
    width.dispatchEvent(new Event("input", { bubbles: true }));


  // depth
    const depth = document.querySelectorAll('.input-container')[2].lastChild;
    depth.value = '2';
    depth.dispatchEvent(new Event("change", { bubbles: true }));
    depth.dispatchEvent(new Event("blur", { bubbles: true }));
    depth.dispatchEvent(new Event("input", { bubbles: true }));
    

    // go to the next page
    setTimeout(document.querySelector('.wizard-button--right').click(), 500);
  }



  ////////////////////////////////////////////// DESCRIPTION PAGE
  setTimeout(descriptionPage, 20000);
  function descriptionPage() {

  // painting roman number
    curentNum++;
  
    if(canvasName === 'Meditation'){
      chrome.storage.sync.set({meditationNo: curentNum });
    } else {
      chrome.storage.sync.set({landscapeNo: curentNum });
    }

    //display current number of painting
    const displayMeditationNo = document.getElementById("displayMeditationNo");
    chrome.storage.sync.get('meditationNo', (result) => {
      displayMeditationNo.innerHTML = result.meditationNo + 1;
    });

    const displayLandscapeNo = document.getElementById("displayLandscapeNo");
    chrome.storage.sync.get('landscapeNo', (result) => {
      displayLandscapeNo.innerHTML = result.landscapeNo  + 1;
    });

    function romanNum(num){
      let res = '';
      const indian = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
      const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
    
    function convert(n, l) {
      while(num >= n ) {
        num -= n;
        res += l;
      }
    }
    for(i = 0; i < indian.length; i++) {
      convert(indian[i], roman[i])
    }
    return res
    }
    let romanNumber = romanNum(curentNum);

    document.querySelector('.title-input__title-wrapper').firstChild.focus();
    document.execCommand('insertText', false, `${canvasName} ${romanNumber}`);
    
    document.querySelector('.description-input__description').focus();
    document.execCommand('insertText', false, `When creating an artwork, most of the processing stages are based on emotions and improvisation. Once the painting is complete, my sole goal is for each viewer to find their own story when looking at the artwork. Still, if one is interested to hear my perspective on the work, I can say that it is, most importantly, about playing with the combination of colors, textures, lines, and more.
    \n\nThis artwork by Bohdan Bohatchuk is an acrylic on canvas piece. This is an original painting directly from the artist's studio in Lviv, Ukraine, and has been hand-signed on the back.`);

    // go to the next page
    setTimeout(document.querySelector('.wizard-button--right').click(), 500);
  }



  ////////////////////////////////////////////// PACKAGING PAGE
  setTimeout(packagingPage, 23000);
  function packagingPage() {

    document.querySelectorAll('.image-radio__item')[2].click();
    document.querySelectorAll('.button-radio__button')[1].click();
    document.querySelectorAll('.button-radio__button')[3].click();
  
   // go to the next page
   setTimeout(document.querySelector('.wizard-button--right').click(), 500);
  };




  ////////////////////////////////////////////// SHIPPING PAGE
  setTimeout(shippingPage, 26000);
  function shippingPage() {

    //art weight
    const weight = document.getElementById('art_weight');
    weight.value = canvasWeight;
    
    weight.dispatchEvent(new Event("change", { bubbles: true }));
    weight.dispatchEvent(new Event("blur", { bubbles: true }));
    weight.dispatchEvent(new Event("input", { bubbles: true }));

    // //container weight
    // const containerWeight = document.getElementById('container_weight');
    // containerWeight.value = canvasWeight;
    
    // containerWeight.dispatchEvent(new Event("change", { bubbles: true }));
    // containerWeight.dispatchEvent(new Event("blur", { bubbles: true }));
    // containerWeight.dispatchEvent(new Event("input", { bubbles: true }));
  
   // go to the next page
   setTimeout(document.querySelector('.wizard-button--right').click(), 500);
  }



  ////////////////////////////////////////////// PRICING PAGE
  setTimeout(pricingPage, 29000);
  function pricingPage() {

    const price = document.getElementById('price');
    price.value = canvasPrice;
   
    price.dispatchEvent(new Event("change", { bubbles: true }));
    price.dispatchEvent(new Event("blur", { bubbles: true }));
    price.dispatchEvent(new Event("input", { bubbles: true }));
  
   // go to the next page
   setTimeout(document.querySelector('.wizard-button--right').click(), 500);
  }



  ////////////////////////////////////////////// PRINT TYPE PAGE
  setTimeout(printTypePage, 32000);
  function printTypePage() {

    document.querySelectorAll('.image-radio__item')[0].click();
    document.querySelectorAll('.image-radio__item')[2].click();

    // go to the next page
   setTimeout(document.querySelector('.wizard-button--right').click(), 500);

  };

}

//////////////////////////////////////////////////////////////////////////
let like = document.getElementById("like");

// When the button is clicked, inject setPageBackgroundColor into current page
like.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: likeThemAll,
  });
})

function likeThemAll() {
  const allLikeButtons = document.querySelectorAll('[title="Add to Favorites"]')
  console.log(allLikeButtons)

  for(let i = 0; i < 10; i++) {
    allLikeButtons[i].click();
  }
}