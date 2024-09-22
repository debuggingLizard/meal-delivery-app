function getDishesTemplate(i) {
    return /*html*/`
            <div class="dishes-container padding">
                <div>
                    <h4>${meals[i].name}</h4>
                    <p class="meal-description">${meals[i].description}</p>
                    <p class="bold">${(meals[i].price).toFixed(2)} €</p>
                </div>
                <div>
                    <button class="add-to-cart-btn" onclick="addToCart(${i})">+</button>
                </div>
            </div>
    `
}

function getCartItemsTemplate(i) {
    return /*html*/`
        <div id="cart-item${i}" class="cart-item">
            <div class="cart-item-top">
                <div class="cart-item-top-left">
                    <span id="item-quantity-main${i}">1</span><span>${meals[i].name}</span>
                </div>
                <span id="cart-item-price${i}">${(meals[i].price).toFixed(2)} €</span>
            </div>
            <div class="cart-item-bottom">
                <img onclick="deleteItemFromCart(${i})" src="./assets/img/trash-icon.png" alt="remove">
                <button onclick="decreaseCartItemQuantity(${i})" class="dish-amount-button">-</button><span id="item-quantity-secondary${i}">1</span><button onclick="increaseCartItemQuantity(${i})" class="dish-amount-button">+</button>
            </div>
        </div>
    `
}