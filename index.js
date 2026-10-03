import { menuArray } from '/data.js'

let mainContent = document.getElementById('content')
//const mainContainerListen = document.getElementById('menu-item')


// render main menu
let mainHtml = menuArray.map(e => {
    return `
            <div class='menu-item'>
                <div class='menu-left-container'>
                    <div class='emoji-container'>
                        <p>${e.emoji}</p>
                    </div>
                    <div class='details-column'>
                        <h3>${e.name}</h3>
                        <p>${e.ingredients}</p>
                        <h3>${e.price}</h3>
                    </div>
                </div>
                <button id="selector-btn" data-id="${e.id}">+</button>
            </div>
    `
}).join('')

mainContent.innerHTML = mainHtml

//  add button press
document.addEventListener('click', function(e) {
    if (e.target.matches('#selector-btn')) {
        const itemId = e.target.dataset.id
        const selectedItem = menuArray.find(item => item.id == itemId)
        
        // put item in orderArray
        if (selectedItem){
            orderArray.push(selectedItem)
            console.log(orderArray)
            renderCartSheet()
        }
    }
        // remove item
     if (e.target.matches('#remove-item') || e.target.matches('.remove-btn')) {
        const itemId = e.target.dataset.id
            
        orderArray = orderArray.filter(item => item.id != itemId)
        renderCartSheet()
    }
})
    
// cart items
let orderArray = []

// render cart sheet
function renderCartSheet() {
    
    // selected item
        let cartContainer = document.getElementById('cart-container')
        
    //if no cart, render cart
        if (!cartContainer) {
            cartContainer = document.createElement('div')
            cartContainer.id = 'cart-container'
            document.body.appendChild(cartContainer)
        }
      
    const groupedOrders = orderArray.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item, quantity: 0, subtotal: 0 }
        }
        acc[item.id].quantity += 1
        acc[item.id].subtotal += item.price
        return acc
        }, {})
      
        
    const orderLayout = Object.values(groupedOrders).map(item => {
            return `
            <div class="cart-sheet">
                <div class="individual-item">
                    <div class="item-row">
                        <h4>${item.quantity}x ${item.name}</h4>
                        <button class="remove-btn" data-index="${item.id}">Remove</button>
                    </div>
                <p>$${item.subtotal}</p>
                </div>
            </div>
            `
       }).join('')
       
       let orderTotal = orderArray.reduce((acc, val) => acc + val.price, 0)
       
       cartContainer.innerHTML = `
        <div class="order">
            <h2>Your order</h2>
            ${orderLayout}
            <div class="order-total">
                <h2>Total</h2>
                <h3>$${orderTotal}</h3>
            </div>
            <button id="complete-btn">Complete Order</button>
        </div>
    `
        
}

let placeOrder = document.addEventListener('click', (e) => {
                if (e.target.matches('#complete-btn')) {
                    console.log('Complete Order Button was pressed!');
                    checkoutDialogue()
                }
            });

function checkoutDialogue() {
        let checkoutEl = document.getElementById('checkout-dialogue')
    
            if (!checkoutEl) {
                checkoutEl = document.createElement('dialog')
                checkoutEl.id = 'checkout-dialogue'
                
                checkoutEl.innerHTML = `
                    <form id="checkout-form">
                        <h2>Enter Card Details</h2>
                        <input type="text" placeholder="Enter your name" required>
                        <input type="text" placeholder="Enter your card number" required>
                        <input type="text" placeholder="Enter CVV" required>
                        <button type="submit" id="pay-now-btn">Pay now</button>
                    </form>
                `
            document.body.appendChild(checkoutEl) 
        }
        checkoutEl.showModal()  
}


document.addEventListener('submit', function(e) {
            if (e.target.matches('#checkout-form')) {
                e.preventDefault();
                
                const form = e.target
                
                if (form.checkValidity()) {
                    const userName = form.querySelector('input[type="text"]').value
                    
                    const checkoutEl = document.getElementById('checkout-dialogue');
                    if (checkoutEl) {
                        checkoutEl.close();
                        
                    orderArray = [];
                    
                    let cartContainer = document.getElementById('cart-container')
                        if (cartContainer) {
                            cartContainer.innerHTML = `
                            <div class="order" id="order-complete">
                            <h2>Thanks, your order has been placed!</h2>
                            </div>
                        `
                        }
                }
        }
    }
})