
function updateProductImage() {

	var size = document.getElementById("size").value;
	var color = document.getElementById("color").value;
	var harnessImg = document.getElementById("harness");

	if (size === "Tiny" && color === "Strawberry") {

		harnessImg.setAttribute("src", "images/red-dog-harness-tiny.jpg");

	} else if (size === "Tiny" && color === "Crazyberry") {

		harnessImg.setAttribute("src", "images/crazy-berry-harness-tiny.jpg");

	} else if (size === "Tiny" && color === "Blackberry") {

		harnessImg.setAttribute("src", "images/blackberry-dog-harness-tiny.jpg");

	} else if (size === "Tiny" && color === "FireOrange") {

		harnessImg.setAttribute("src", "images/fire-orange-harness-tiny.jpg");

	} else if (size === "Small" && color === "Strawberry") {

		harnessImg.setAttribute("src", "images/red-dog-harness-small.jpg");

	} else if (size === "Small" && color === "Crazyberry") {

		harnessImg.setAttribute("src", "images/crazy-berry-harness-small.jpg");

	} else if (size === "Small" && color === "Blackberry") {

		harnessImg.setAttribute("src", "images/blackberry-dog-harness-small.jpg");

	} else if (size === "Small" && color === "FireOrange") {

		harnessImg.setAttribute("src", "images/fire-orange-harness-small.jpg");

	} else if (size === "Medium" && color === "Strawberry") {

		harnessImg.setAttribute("src", "images/red-dog-harness-medium.jpg");

	} else if (size === "Medium" && color === "Crazyberry") {

		harnessImg.setAttribute("src", "images/crazy-berry-harness-medium.jpg");

	} else if (size === "Medium" && color === "Blackberry") {

		harnessImg.setAttribute("src", "images/blackberry-dog-harness-medium.jpg");

	} else if (size === "Medium" && color === "FireOrange") {

		harnessImg.setAttribute("src", "images/fire-orange-harness-medium.jpg");

	} else if (size === "Large" && color === "Strawberry") {

		harnessImg.setAttribute("src", "images/red-dog-harness-large.jpg");

	} else if (size === "Large" && color === "Crazyberry") {

		harnessImg.setAttribute("src", "images/crazy-berry-harness-large.jpg");

	} else if (size === "Large" && color === "Blackberry") {

		harnessImg.setAttribute("src", "images/blackberry-dog-harness-large.jpg");

	} else if (size === "Large" && color === "FireOrange") {

		harnessImg.setAttribute("src", "images/fire-orange-harness-large.jpg");

	}

}


// cart logic below

function Cart(items) {
	this.items = items;
}

var mainCart = new Cart([]);

var cartTotalSize = 0;

var tableSize = 1;

var itemTotal = 0.00;

function addToCart() {

	var name = document.getElementById("item-name").innerHTML;
	console.log(name);
	var size = document.getElementById("size").value;
	console.log(size);
	var color = document.getElementById("color").value;
	console.log(color);
	var quantity = document.getElementById("quantity").value;
	console.log(quantity);


	var newItem = new Item(name, color, size, quantity);


	mainCart.items.push(newItem);


	console.log(parseInt(quantity));

	cartTotalSize += parseInt(quantity);

	document.getElementById("cart-link-detail").innerHTML = "Cart(" + (cartTotalSize) + ")";

	localStorage.setItem("cart", JSON.stringify(mainCart));

	return mainCart;
}

function displayCart() {

	var table = document.getElementById("cart-table");

	console.log("Called");

	let cart = JSON.parse(localStorage.getItem("cart"));
	console.log(cart);

	for (i in cart.items) {
		console.log("In loop");

		console.log(i.item);
		var newRow = table.insertRow(tableSize);
		tableSize += 1;

		var itemCol = newRow.insertCell(0);
		var descriptionCol = newRow.insertCell(1);
		var quantityCol = newRow.insertCell(2);
		var priceCol = newRow.insertCell(3);

		itemCol.innerHTML = i.name;
		descriptionCol.innerHTML = i.color + " and " +  i.size;
		quantityCol.innerHTML = i.quantity;
		priceCol.innerHTML = "$ " + (i.quantity * 10.00);

		itemTotal += (i.quantity * 10.00);

	}

	document.getElementById("total").innerHTML = "Total: $" + itemTotal;
	document.getElementById('final-cost').innerHTML = "Your Cost: $" + (itemTotal + 5.99);
}

function Item(name, color, size, quantity, price) {
	this.name = name;
	this.color = color;
	this.size = size;
	this.quantity = quantity;
	this.price = price
}

