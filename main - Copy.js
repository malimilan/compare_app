const fonoapiToken = 'a4c77c8691f5ab5f5cf58fa837a1d292e6184d7b5ebc6ff5';

// DOM elements
const brandList = document.getElementById('brandList');
const modelList = document.getElementById('modelList');




const getProducts = async () => {
    const result = await fetch('https://fonoapi.freshpixl.com/v1/getlatest?token=' + fonoapiToken)
    const retrievedProducts =  await result.json();

    const products = Array.from(retrievedProducts);

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        product.id = i;        
    }

    // Get unique brand names from JSON and insert into BRAND LIST <select>
    const brands = [...new Set(products.map(product => product.Brand))];
    brandOptions = brands.sort().map(brandOption => `<option value="${brandOption}">${brandOption}</option>`);
    brandList.innerHTML = `<option value="0" disabled selected >Select a brand</option>` + brandOptions.join('');

    brandList.addEventListener('change', (e) => {

        // enable/disable model list
        if(brandList.value != 0) {
            modelList.disabled = false;
        } else {
            modelList.disabled = true;
        }
    
        matchProducts = products.filter(product => product.Brand == brandList.value);
        console.log(matchProducts);

        modelOptions = matchProducts.map(model => `<option value="${model.id}">${model.DeviceName}</option>`);        
        modelList.innerHTML = `<option value="0">Choose ${brandList.value} model</option>` + modelOptions.join('');
    
    })

}

getProducts().then( () => {
    console.log();
})



// var request = new XMLHttpRequest();
// request.open('GET', 'https://fonoapi.freshpixl.com/v1/getlatest?token=' + fonoapiToken, true)
// request.onload = function() {
//   // Begin accessing JSON data here
//   var data = JSON.parse(this.response)


//   if (request.status >= 200 && request.status < 400) {
//     // data.forEach(product => {
        
//     //     console.log(product)
//     // })

//     let products = data;

//     // Get unique brand names from JSON and insert into BRAND LIST <select>
//     const brands = [...new Set(products.map(product => product.Brand))];
//     brandOptions = brands.map(brandOption => `<option value="${brandOption}">${brandOption}</option>`);
//     brandList.innerHTML = `<option value="0" disabled selected >Select a brand</option>` + brandOptions.join('');

//   } else {
//     console.log('error')
//   }
// }

// request.send()

















var cards = document.getElementById('jsCards');        
var removeBtns = document.querySelectorAll('.remove');
const addToCompareBtn = document.getElementById('jsAddToCompareBtn');

//REMOVE CAR
//------------------------------
var removeAuto = (e) => {
    let carId = Number(e.dataset.car_id);
    console.log(carId);
    const allCarElements = document.querySelectorAll('[data-car_id]');
    
    allCarElements.forEach( car => {
        if(car.dataset.car_id == e.dataset.car_id){
            car.parentNode.removeChild(car);
        }
    });
    let cardsChildren = Number(cards.dataset.children);
    cards.setAttribute('data-children', cardsChildren - 1);

}

// document.addEventListener('click', (e) => {
//     console.log(e.target.classList);

// })

removeBtns.forEach( btn => {
    btn.addEventListener('click', () => {                        
        console.log(btn);
        removeAuto(btn);

    });
})
//------------------------------
//REMOVE CAR END


//ADD CAR
//------------------------------
let newCar = {
    "id": 1,
    "brand": "Kia",
    "model": "Ceed",
    "description": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure provident quibusdam laboriosam?",
    "length": "500 - 520 cm",
    "width": "500 - 520 cm"
}



// const addToCompare = (e) => {
const addToCompare = (productId) => {
    
    return function() {        
        let selectedProduct = products.filter(product => product.id == modelList.value);
        console.log(selectedProduct[0]);

        let cardsChildren = Number(cards.dataset.children);
        cards.setAttribute('data-children', cardsChildren + 1);

        const { id, make, model, image } = selectedProduct[0];

        let productNode = `
        <div class="card_auto" data-car_id="${id}">
            <div class="img-holder">
                <div class="remove" data-car_id="${id}"></div>
                <img src="${image}" alt="">
            </div>
            <div class="card_text">
                <p>${make}</p>
                <h4>${model}</h4>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure provident quibusdam laboriosam?</p>
            </div>
        </div>
        `

        cards.innerHTML += productNode;
        removeBtns = document.querySelectorAll('.remove');

        removeBtns.forEach( btn => {
            btn.addEventListener('click', () => {                        
                console.log(btn);
                removeAuto(btn);

            });
        })
    }

}

addToCompareBtn.addEventListener('click', addToCompare(modelList.value));




















// const products = [
//     {
//         "id":"1",
//         "make":"Apple",
//         "model":"iPhone 8",
//         "image":"https://cdn2.gsmarena.com/vv/bigpic/apple-iphone-8-new.jpg",
//         "body": {
//             "dimensions":"20x200x300",
//             "weight":"200g"
//         },
//         "display": {
//             "type":"AMOLED",
//             "size":"5.8 inches",
//             "resolution":"1080 x 2340 pixels, 19.5:9 ratio (~403 ppi density)"
//         }
//     },
//     {
//         "id":"2",
//         "make":"Apple",
//         "model":"iPhone X",
//         "image":"https://cdn2.gsmarena.com/vv/bigpic/apple-iphone-x.jpg",
//         "body": {
//             "dimensions":"23x200x300",
//             "weight":"220g"
//         },
//         "display": {
//             "type":"AMOLED",
//             "size":"6 inches",
//             "resolution":"1180 x 2340 pixels, 19.5:9 ratio (~423 ppi density)"
//         }
//     },
//     {
//         "id":"9001",
//         "make":"Xiaomi",
//         "model":"Mi 8",
//         "image":"https://cdn2.gsmarena.com/vv/bigpic/xiaomi-mi8.jpg",
//         "body": {
//             "dimensions":"20x200x300",
//             "weight":"200g"
//         },
//         "display": {
//             "type":"AMOLED",
//             "size":"5.8 inches",
//             "resolution":"1080 x 2340 pixels, 19.5:9 ratio (~403 ppi density)"
//         }
//     },
//     {
//         "id":"9002",
//         "make":"Xiaomi",
//         "model":"Mi 9",
//         "image":"https://cdn2.gsmarena.com/vv/bigpic/xiaomi-mi-9-.jpg",
//         "body": {
//             "dimensions":"23x200x300",
//             "weight":"220g"
//         },
//         "display": {
//             "type":"AMOLED",
//             "size":"6 inches",
//             "resolution":"1180 x 2340 pixels, 19.5:9 ratio (~423 ppi density)"
//         }
//     }
// ]
