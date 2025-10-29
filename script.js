const products = document.querySelectorAll('.grid-container > div');
const cartItemsWrap = document.querySelector('.inside-cart-container');
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

//To get back the items in the storage if exits
cartArray = JSON.parse(localStorage.getItem('PRODUCTCART')) || [] 
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
    confirmTOModal.onclick = function (event) {
        event.stopPropagation();
        openModal();

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
    spanCloseButton.onclick = function (event) {
        event.stopPropagation();
        closeModal();
    }

    //To make the screen inactive when the modal container is clicked
    document.querySelector('.modal-overlay').onclick = function (){
        closeModal();
    }
    function openModal () {
        document.body.classList.add('modal-open');
        document.querySelector('.modal-overlay').style.display = "block";
        modal.style.display = "block";
    }
    function closeModal () {
        document.body.classList.remove('modal-open');
        document.querySelector('.modal-overlay').style.display = "none";
        modal.style.display = "none";
    }

    //For the Add to Cart number
    if (cartArray.length === 0) {
    emptyCart.style.display = "block";
    cartContainer.style.display = "none";
    } else {
    emptyCart.style.display = "none";
    cartContainer.style.display = "block";
    }
    
    //For the remove button
    const removeBtn = document.querySelectorAll('.remove-btn');
    removeBtn.forEach(button => {
        button.addEventListener("click", function () {
            const indexToRemove = this.getAttribute("data-index");

            if (indexToRemove !== -1) {
                cartArray.splice(indexToRemove, 1)
                displayCartItems();
            }
        })
    })    
}
displayCartItems();

//storing the products in the local storage
const addToStorage = () => {
    localStorage.setItem('PRODUCTCART', JSON.stringify(cartArray));
} 

products.forEach((product) => {
    const addCart = product.querySelector('.to-cart');
    const increment = product.querySelector('.increment');
    const minusButton = product.querySelector('.substraction');
    const plusButton = product.querySelector('.addition');
    const quantitySpan = product.querySelector('.increment span');
    const productImg = product.querySelector("img").src;
    const productTitle = product.querySelector(".product-type").innerText;
    const productPrice = parseFloat(product.querySelector(".product-price").innerText.replace("$", ""));
    
    product.querySelector("button").addEventListener("click", () => {
        addCart.style.display = 'none';
        increment.style.display = 'flex';  
    })

    plusButton.addEventListener("click", (e) => {
        e.stopPropagation();
        let itemExist = cartArray.find(item => item.title === productTitle);

            if (itemExist) {
                itemExist.quantity++;
                quantitySpan.textContent = itemExist.quantity;
            } else {
            cartArray.push({
                title: productTitle,
                image: productImg,
                price: productPrice,
                quantity: 1,
            });
            quantitySpan.textContent = 1;
        }
        displayCartItems();
    })

    minusButton.addEventListener("click", (e) => {
        e.stopPropagation();
        let itemExist = cartArray.find(item => item.title === productTitle);
        if (itemExist) {
            itemExist.quantity--;
            if (itemExist.quantity <= 0) {
                cartArray = cartArray.filter(item => item.title !== productTitle);
                addCart.style.display = "flex";
                increment.style.display = "none";
                quantitySpan.textContent = 1;
            }else {
                quantitySpan.textContent = itemExist.quantity;
            }
            displayCartItems();
        }
    })
    displayCartItems();
    addToStorage();
});

