let carts= document.querySelectorAll('.add-cart');

let products =[ {
  name:'Classic Blue',
  tag: 'wholesaleapp_23_800x',
  price: 151,
  inCart:0
},
{
  name:'Gold Pack',
  tag: 'minigoldmain_800x',
  price: 150,
  inCart:0
},
{
  name:'Mermaid Hue',
  tag: 'wholesaleapp_19_800x',
  price: 200,
  inCart:0
},
{
  name:'Rosegold straws',
  tag: 'rosegoldminimain_800x',
  price: 560,
  inCart:0
},
{
  name:'Black Glint',
  tag: 'sirenminimain_800x',
  price: 1020,
  inCart:0
},
{
  name:'Hype Blue',
  tag: 'wholesaleapp_23_800x',
  price: 149,
  inCart:0
}]


for(let i=0; i  <carts.length; i++){
  carts[i].addEventListener('click', ()=>{
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}

function onloadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers){
    document.querySelector('.cart span').textContent = productNumbers;
  }
}


function cartNumbers(product){
  
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);

  if(productNumbers){
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.cart span').textContent = productNumbers + 1;
  }
  else{
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }

  setItems(product);
  
}

function setItems(product){
 let cartItems = localStorage.getItem('productsInCart');
 cartItems = JSON.parse(cartItems);

 if(cartItems != null){

  if(cartItems[product.tag] == undefined){
    cartItems = {
      ...cartItems, 
      [product.tag]: product
    }
  }
   cartItems[product.tag].inCart += 1;
 }
 else{
  product.inCart = 1;
  cartItems = {
    [product.tag]: product
  }
 }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

function totalCost(product){

  let cartCost = localStorage.getItem('totalCost');
  cartCost = parseInt(cartCost);


  if(cartCost != null){
    localStorage.setItem("totalCost", cartCost + product.price);
  }
  else{
    localStorage.setItem('totalCost', product.price);
  }

}

function displayCart(){
  let cartItems= localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products-container");
   let cartCost = localStorage.getItem('totalCost');
  console.log(cartItems);
  if(cartItems && productContainer){
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class= "product">
      
          <img src ="/img/products/${item.tag}.png" style="height:50px; width:50px;">
          <span class="strawName">${item.name}</span>
      </div>    
      <div class="price">
      ₹ ${item.price}</div>
      <div class= "quantity">
          
          <span>${item.inCart}</span>
      </div>
      <div class="total">
          
₹ ${item.inCart * item.price}
      </div>
      `
    });

    productContainer.innerHTML += `
    <div class="basketTotalConatiner">
      <h4 class="basketTotalTitle">
        
      </h4>
      <h4 class="basketTotal">
        
      </h4>
    </div>`
  }
}

onloadCartNumbers();
displayCart();