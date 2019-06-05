const fonoapiToken = 'a4c77c8691f5ab5f5cf58fa837a1d292e6184d7b5ebc6ff5';

// DOM elements
const brandList = document.getElementById('brandList');
const modelList = document.getElementById('modelList');


const getProducts = async () => {
    const result = await fetch('https://fonoapi.freshpixl.com/v1/getlatest?token=' + fonoapiToken)
    const retrievedProducts =  await result.json();

    const products = Array.from(retrievedProducts);

    return products;   

}

getProducts().then( (products) => {

    // add id to every product - fonoapi json doesn't have id for products
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        product.id = i;        
    }
    // end:: add id to every product - fonoapi json doesn't have id for products

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

    return products;
})


.then((products) => {
    var cards = document.getElementById('jsCards');        
    var removeBtns = document.querySelectorAll('.remove');
    const addToCompareBtn = document.getElementById('jsAddToCompareBtn');
    
    //REMOVE CAR
    //------------------------------
    var removeProduct = (e) => {
        // let carId = Number(e.dataset.product_id);
        // console.log(carId);
        const allProductElements = document.querySelectorAll('[data-product_id]');
        
        allProductElements.forEach( productElement => {
            if(productElement.dataset.product_id == e.dataset.product_id){
                productElement.parentNode.removeChild(productElement);
            }
        });
        let cardsChildren = Number(cards.dataset.children);
        cards.setAttribute('data-children', cardsChildren - 1);
    
    }
    
    
    removeBtns.forEach( btn => {
        btn.addEventListener('click', () => {                        
            console.log(btn);
            removeProduct(btn);
    
        });
    })
    //------------------------------
    //REMOVE CAR END

    
    //ADD PRODUCT
    const addToCompare = (productId) => {

        return function() {        
            let selectedProduct = products.filter(product => product.id == modelList.value);
            console.log(selectedProduct[0]);
    
            let cardsChildren = Number(cards.dataset.children);
            cards.setAttribute('data-children', cardsChildren + 1);
    
            const { id, Brand, DeviceName, announced, price, size, weight } = selectedProduct[0];
    
            // start:: Add product card
            let productNode = `
            <div class="card_product" data-product_id="${id}">
                <div class="img-holder">
                    <div class="remove" data-product_id="${id}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></div>
                    <img src="https://via.placeholder.com/480x640/888888/000000?Text=${Brand}" alt="${DeviceName}">
                </div>
                <div class="card_text">
                    <p><strong>${Brand}</strong></p>
                    <h4>${DeviceName}</h4>
                    <p>Announced: ${announced}</p>
                    <p>Price: ${price}</p>
                </div>
            </div>
            `            
            cards.innerHTML += productNode;
            // end:: Add product card

            // start:: Add data to every data category
            const categories = ['size','weight','os','resolution', 'protection', 'battery_c', 'talk_time' ];
            categories.forEach((cat)=>{

                categoryHolderName = 'data_' + cat;
                let value = selectedProduct[0][cat];
                if(value == undefined){
                    value = 'N/A';
                }

                let categoryHolder = document.getElementById(categoryHolderName);            
                let dataNode = `
                <div class="product_data" data-product_id="${id}">
                    <div class="product_label visible-xs">${DeviceName}</div>
                    <div class="product_value">${value}</div>
                </div>
                `
                categoryHolder.innerHTML += dataNode;

            })
            // end:: Add data to every data category




            removeBtns = document.querySelectorAll('.remove');
    
            removeBtns.forEach( btn => {
                btn.addEventListener('click', () => {                        
                    console.log(btn);
                    removeProduct(btn);
    
                });
            })
        }
    
    }
    
    addToCompareBtn.addEventListener('click', addToCompare(modelList.value));

})








// Accordion on list data
const data_groups = document.querySelectorAll('.list_title');

data_groups.forEach((data_group) => {
    console.log(data_group);
    data_group.addEventListener('click', (e)=>{        
        let accordion_btn = e.target;
        if(!accordion_btn.classList.contains('active')){
            accordion_btn.scrollIntoView(true);
        }
        accordion_btn.classList.toggle('active');
    })
});
// end:: Accordion on list data

















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
