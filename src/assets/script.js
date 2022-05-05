/* Create 3 or more product objects using object literal notation 
   Each product should include four properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart (integer)
   - SKU: unique id for product (number)
   - image: picture of product (url string)
*/



/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/


/* Create an array named productsArr and add all product object literals to array */

let productsArr = [
  {
    name: "Strawberry",
    price: 3,
    quantity: 0,
    SKU: 1,
    image: "images/strawberry.jpg"
  },
  {
    name: "Orange",
    price: 2,
    quantity: 0,
    SKU: 2,
    image: "images/orange.jpg"
  },
  {
    name: "Cherry",
    price: 5,
    quantity: 0,
    SKU: 3,
    image: "images/cherry.jpg"
  }
];

/* Declare an empty array named cartArr to hold the items in the cart */
/* Create a global variable named totalPaid to store the current remaining balance */

let cartArr = [];
let currency = '$'
let totalPaid = 0



// Helper function to get product
// Most recent product interacted with


// Gets the product from the SKU received from the frontend

function findProduct(arr, sku) {
  return arr.find(product => product.SKU === sku);
}

/* Create a function named addToCart that takes in the product SKU as an argument
  - addToCart should get the correct product based on the SKU
  - addToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

function addToCart(sku) {
  if (cartArr.length <= 0 || !cartArr.find(product => product.SKU === sku)) {
    let productToAdd = findProduct(productsArr, sku);
    productToAdd.quantity += 1;
    cartArr.push(JSON.parse(JSON.stringify(productToAdd))) // breaking object reference from productsArr
  }
  else {
    increase(sku)
  }
  console.log('cartArr after adding -------> ', cartArr);
}


/* Create a function named increase that takes in the product SKU as an argument
  - increase should get the correct product based on the SKU
  - increase should then increase the product's quantity
*/
function increase(sku) {
  cartArr.find(product => product.SKU === sku).quantity += 1;
  productsArr.find(product => product.SKU === sku).quantity += 1;
}


/* Create a function named decrease that takes in the product SKU as an argument
  - decrease should get the correct product based on the SKU
  - decrease should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

function decrease(sku) {
  cartArr.find(product => product.SKU === sku).quantity -= 1;
  productsArr.find(product => product.SKU === sku).quantity -= 1;
  if (findProduct(cartArr, sku).quantity <= 0) remove(sku)
  if (cartArr.length === 0) cartArr.splice(0, cartArr.length); // emptying the array. Assigning a blank array was not breaking references for the test cases so had to opt for an alternative.
}


/* Create a function named remove that takes in the product SKU as an argument
  - remove should get the correct product based on the SKU
  - remove should update the product quantity to 0
  - remove should remove the product from the cart
*/


function remove(sku) {
  cartArr.splice(cartArr.findIndex(product => product.SKU === sku), 1);
  productsArr.find(product => product.SKU === sku).quantity = 0;
}


/* When paying, the user should be able to split their payment */



/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total of all products
  - cartTotal should return the sum of the products in the cart
*/
function cartTotal() {
  let total = 0;

  cartArr.forEach(element => {
    let itemTotal = 0;
    itemTotal += element.price * element.quantity
    total += itemTotal;
  });

  return total;
}

/* Create a function named pay that takes in an amount as an argument
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
*/
function pay(amount) {
  totalPaid += amount;
  return totalPaid - cartTotal();
}


function emptyCart() {
  cartArr = [];
}



/* Place stand out suggestions here */



/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/


















module.exports = {
  productsArr,
  cartArr,
  addToCart,
  increase,
  decrease,
  remove,
  cartTotal,
  pay,
  emptyCart,
  currency
}