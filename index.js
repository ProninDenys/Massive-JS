// HW MASSIVE 

// TASK MINIMUM and TASK MEDIUM 

// Массив "Список покупок"
const shoppingList = [
    { name: 'Milk', quantity: 2, bought: true, pricePerUnit: 2, total: 4 },
    { name: 'Bread', quantity: 3, bought: false, pricePerUnit: 1.9, total: 5.7 },
    { name: 'Eggs', quantity: 20, bought: true, pricePerUnit: 0.19, total: 20 * 0.19 },
    { name: 'Butter', quantity: 1, bought: false, pricePerUnit: 2.69, total: 2.69 },
    { name: 'Cheese', quantity: 1, bought: false, pricePerUnit: 5.5, total: 5.5 },
    { name: 'Apples', quantity: 10, bought: false, pricePerUnit: 0.3, total: 10 * 0.3 },
    { name: 'Tomatoes', quantity: 5, bought: false, pricePerUnit: 0.5, total: 5 * 0.5 },
    { name: 'Potatoes', quantity: 7, bought: false, pricePerUnit: 0.4, total: 7 * 0.4 },
    { name: 'Bananas', quantity: 6, bought: false, pricePerUnit: 0.35, total: 6 * 0.35 },
    { name: 'Chicken', quantity: 1, bought: false, pricePerUnit: 6, total: 6 },
    { name: 'Rice', quantity: 1, bought: false, pricePerUnit: 1.5, total: 1.5 },
];


function displayShoppingList(list) {
    const shoppingListElement = document.getElementById('shopping-list');
    shoppingListElement.innerHTML = '';

    const notBought = list.filter(item => !item.bought);
    const bought = list.filter(item => item.bought);

    shoppingListElement.innerHTML += '<h3>Not Bought:</h3>';
    notBought.forEach(item => {
        shoppingListElement.innerHTML += `
            <div class="product not-bought">
                <strong>${item.name}</strong> (${item.quantity} units, €${item.pricePerUnit}/unit, Total: €${item.total.toFixed(2)})
            </div>
        `;
    });

    shoppingListElement.innerHTML += '<h3>Bought:</h3>';
    bought.forEach(item => {
        shoppingListElement.innerHTML += `
            <div class="product bought">
                <strong>${item.name}</strong> (${item.quantity} units, €${item.pricePerUnit}/unit, Total: €${item.total.toFixed(2)})
            </div>
        `;
    });

    // Обновление итоговой стоимости купленных продуктов
    updateTotalCost(bought);
}

// Функция отметки продукта как купленного
function buyProduct(productName) {
    const product = shoppingList.find(item => item.name.toLowerCase() === productName.toLowerCase());
    if (product) {
        product.bought = true;
        displayShoppingList(shoppingList);
        alert(`${productName} has been marked as bought.`);
    } else {
        alert(`${productName} not found in the shopping list.`);
    }
}

// Функция добавления продукта в список
function addProduct(name, quantity, pricePerUnit) {
    const product = shoppingList.find(item => item.name.toLowerCase() === name.toLowerCase());
    if (product) {
        product.quantity += quantity;
        product.total = product.quantity * product.pricePerUnit;
    } else {
        shoppingList.push({
            name: name,
            quantity: quantity,
            bought: false,
            pricePerUnit: pricePerUnit,
            total: quantity * pricePerUnit
        });
    }
    displayShoppingList(shoppingList);
}

// Функция удаления продукта из списка
function removeProduct(productName) {
    const newList = shoppingList.filter(item => item.name.toLowerCase() !== productName.toLowerCase());
    shoppingList.length = 0;
    shoppingList.push(...newList);
    displayShoppingList(shoppingList);
}

// Обработчики для кнопок
function buyProductHandler() {
    const productName = document.getElementById('product-name').value;
    buyProduct(productName);
}

function addProductHandler() {
    const name = document.getElementById('new-product-name').value;
    const quantity = parseInt(document.getElementById('new-product-quantity').value, 10);
    const pricePerUnit = parseFloat(document.getElementById('new-product-price').value);
    addProduct(name, quantity, pricePerUnit);
}

function removeProductHandler() {
    const productName = document.getElementById('remove-product-name').value;
    removeProduct(productName);
}

// Функция обновления итоговой стоимости купленных продуктов
function updateTotalCost(boughtProducts) {
    const totalCost = boughtProducts.reduce((sum, product) => sum + product.total, 0);
    document.getElementById('total-cost').innerText = `Total: €${totalCost.toFixed(2)}`;
}


displayShoppingList(shoppingList);
