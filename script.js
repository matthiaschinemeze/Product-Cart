const products = document.querySelectorAll('.grid-container > div');
const cartItemsWrap = document.querySelector('.cart-items');
const emptyCart = document.querySelector('.cart-container');
const cartContainer = document.querySelector('.add-to-cart-container');
const orderPrice = document.querySelector('.order-price');
const emptyCartHeading = document.querySelector('.cart-container h2');
const cartHeading = document.querySelector('.add-to-cart-container h2');
const modal = document.querySelector('.modal-container');
const confirmTOModal = document.querySelector('.confirm-button');
const spanCloseButton = document.querySelector('.close');
const confirmedOrdersContainer = document.querySelector('.orders');
const confirmedTotalOrderContainer = document.querySelector('.confirm-order-container');

let cartArray = [];

const displayCartItems = () => {
    cartItemsWrap.innerHTML = "";
    let total = 0;

    cartArray.forEach((item, index)=>{
        let itemTotal = item.price * item.quantity
        total += itemTotal;

        cartItemsWrap.innerHTML += `<div class="writeup-container">
            <p>${item.title}</p>
            <div class="quantity-container">
                <span class="quantity">${item.quantity}</span>
                <span class="quantity-price">@ ${item.price.toFixed(2)}</span> 
                <span class="quantity-amount">${itemTotal.toFixed(2)}</span> 
                <span class="remove-btn" data-index="${index}">
                <img src="product-list-with-cart-main/assets/images/icon-remove-item.svg" alt=""></span>
            </div>   
        </div>`;
    })

    orderPrice.textContent = `$${total.toFixed(2)}`;

    // Update headings with total items
    const totalItems = cartArray.length;
    emptyCartHeading.textContent = `Your Cart (${totalItems})`;
    cartHeading.textContent = `Your Cart (${totalItems})`;

    //To display the Confirm Order Container
    confirmTOModal.onclick = function () {
        modal.style.display = "block";

        // To display the content in the add to cart container inside the modal
        confirmedOrdersContainer.innerHTML = "";

        cartArray.forEach((item)=>{
            let itemTotal = item.price * item.quantity;

            confirmedOrdersContainer.innerHTML += `<div class="selected-order">
                <div class="confirmed-orders">
                    <img src="${item.image}" alt="">
                    <div class="product-details">
                        <p class="confirmed-product">${item.title}</p>
                        <span class="confirmed-quantity">${item.quantity}</span>
                        <span class="confirmed-price">@ ${item.price.toFixed(2)}</span>
                    </div>
                    <span class="confirmed-price-total">${itemTotal.toFixed(2)}</span>
                </div>
            </div>`       
        })
        confirmedOrdersContainer.innerHTML += `<div class="confirm-order-container">
            <p>Order Total</p>
            <p class="confirm-order-price">$${total.toFixed(2)}</p>
        </div>`
    }
    //To close the container 
    spanCloseButton.onclick = function () {
        modal.style.display = "none";
    }

    if (cartArray.length === 0) {
    emptyCart.style.display = "block";
    cartContainer.style.display = "none";
    } else {
    emptyCart.style.display = "none";
    cartContainer.style.display = "block";
    }
    
    //For the remove button
    const removeBtn = document.querySelectorAll('.remove-btn');
    removeBtn.forEach(button =>{
        button.addEventListener("click", function () {
            const indexToRemove = this.getAttribute("data-index");

            if (indexToRemove !== -1) {
                cartArray.splice(indexToRemove, 1)
                displayCartItems();
            }
        })
    })
        
}

products.forEach((product) => {
    let addToCartButton = product.querySelector("button");

    addToCartButton.onclick = function () {
    let productImg = product.querySelector("img").src;
    let productTitle = product.querySelector(".product-type").innerText;
    let productPrice = parseFloat(product.querySelector(".product-price").innerText.replace("$", ""));
    
    let itemExist = cartArray.find(item => item.title === productTitle);

    if (itemExist) {
        itemExist.quantity++;
    } else {
    cartArray.push({
        title: productTitle,
        image: productImg,
        price: productPrice,
        quantity: 1,
    });
    }
    
    displayCartItems();
};
});

