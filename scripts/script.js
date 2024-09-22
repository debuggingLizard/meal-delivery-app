let sumFoodItems = 0;
let sumTotal = 0;

// render dishes into main section
function renderDishes() {
    let dishesRef = document.getElementById('dishes');
    dishesRef.innerHTML = "";

    for (let i = 0; i < meals.length; i++) {
        dishesRef.innerHTML += getDishesTemplate(i);
    }
}

// + Button in rendered dishes
function addToCart(i) {
    let cartItemsRef = document.getElementById('cart-items');
    let foodItemRef = document.getElementById('cart-item' + i);

    if (foodItemRef == null) {
        cartItemsRef.innerHTML += getCartItemsTemplate(i);
        calculateIncreasedSum(i, 1);
        document.getElementById('order-button').removeAttribute('disabled');
    } else {
        increaseCartItemQuantity(i);
    }
}

// + and - in shopping cart
function increaseCartItemQuantity(i) {
    let itemQuantityMainRef = document.getElementById('item-quantity-main' + i);
    itemQuantityMainRef.innerText++;
    let itemQuantitySecondaryRef = document.getElementById('item-quantity-secondary' + i);
    itemQuantitySecondaryRef.innerText++;
    calculateIncreasedSum(i, itemQuantityMainRef.innerText);
}

function decreaseCartItemQuantity(i) {
    let itemQuantityMainRef = document.getElementById('item-quantity-main' + i);
    let itemQuantitySecondaryRef = document.getElementById('item-quantity-secondary' + i);

    if (itemQuantityMainRef.innerText == '1') {
        deleteItemFromCart(i);
    } else {
        itemQuantityMainRef.innerText--;
        itemQuantitySecondaryRef.innerText--;
        calculateDecreasedSum(i, itemQuantityMainRef.innerText);
    }
}

function deleteItemFromCart(i) {
    let deletedItem = document.getElementById('cart-item' + i)
    calculateDeletedItemSum(i)
    deletedItem.remove();

    let cartItemsRef = document.getElementById('cart-items').innerText;
    if (cartItemsRef == "") {
        document.getElementById('order-button').setAttribute('disabled', 'true');
    }
}

// calculations for adding, removing or deleting item
function calculateIncreasedSum(i, quantity) {
    let sumFoodItemsRef = document.getElementById('sum-food-items');

    calculateItemTotal(i, quantity)

    sumFoodItems += meals[i].price;
    sumFoodItemsRef.innerText = sumFoodItems.toFixed(2);

    calculateSumTotal(sumFoodItems);
}

function calculateDecreasedSum(i, quantity) {
    let sumFoodItemsRef = document.getElementById('sum-food-items');

    calculateItemTotal(i, quantity)

    sumFoodItems -= meals[i].price;
    sumFoodItemsRef.innerText = sumFoodItems.toFixed(2);

    calculateSumTotal(sumFoodItems);
}

function calculateItemTotal(i, quantity) {
    let cartItemPriceRef = document.getElementById('cart-item-price' + i);
    cartItemPriceRef.innerHTML = (meals[i].price * quantity).toFixed(2) + '€';
}

function calculateDeletedItemSum(i) {
    let sumFoodItemsRef = document.getElementById('sum-food-items');
    let quantity = document.getElementById('item-quantity-main' + i).innerText;
    sumFoodItems = sumFoodItems.toFixed(2) - meals[i].price * Number(quantity);
    sumFoodItemsRef.innerText = sumFoodItems.toFixed(2);

    calculateSumTotal(sumFoodItems);
}

// calculation for total costs
function calculateSumTotal(sumFoodItems) {
    let sumTotalRef = document.getElementById('sum-total');
    let deliveryCostsRef = document.getElementById('delivery-costs').innerText;

    if (sumFoodItems == 0) {
        sumTotalRef.innerText = "0.00";
    } else {
        sumTotal = sumFoodItems + Number(deliveryCostsRef);
        sumTotalRef.innerText = sumTotal.toFixed(2);
    }
}

// send order 
function sendOrder() {
    let overlay = document.getElementById('order-success');
    overlay.classList.remove('display-none');

    resetCart();

    setTimeout(
        () => {overlay.classList.add('display-none');}, 3000
    );
}

function resetCart() {
    document.getElementById('cart-items').innerHTML = "";
    document.getElementById('sum-food-items').innerText = "0.00";
    document.getElementById('sum-total').innerText = "0.00";
    document.getElementById('order-button').setAttribute('disabled', 'true');

    sumFoodItems = 0;
    sumTotal = 0;
}

// responsive functionality
function toggleCartSmallScreen() {
   let shoppingCartRef = document.getElementById('shopping-cart-wrapper');
    shoppingCartRef.classList.toggle('display-block');
}