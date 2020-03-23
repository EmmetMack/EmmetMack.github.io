
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

// sessionStorage.setItem("cart", JSON.stringify(mainCart));

var cartTotalSize = 0;

// sessionStorage.setItem("cartSize", cartTotalSize);

var tableSize = 1;

var itemTotal = 0.00;

// sessionStorage.setItem("price", itemTotal);

function addToCart() {

	var cart = JSON.parse(sessionStorage.getItem("cart"));

	var name = document.getElementById("item-name").innerHTML;
	console.log(name);
	var size = document.getElementById("size").value;
	console.log(size);
	var color = document.getElementById("color").value;
	console.log(color);
	var quantity = document.getElementById("quantity").value;
	console.log(quantity);


	var newItem = new Item(name, color, size, quantity);

	cart.items.push(newItem);

	console.log(cart.items);

	var cartTotalSize = parseInt(sessionStorage.getItem("cartSize"));

	cartTotalSize += parseInt(quantity);

	sessionStorage.setItem("cartSize", cartTotalSize);

	sessionStorage.setItem("cart", JSON.stringify(cart));

	updateNavBar();
}

function displayCart() {

	var table = document.getElementById("cart-table");

	console.log("Called");

	var cart = JSON.parse(sessionStorage.getItem("cart"));

	console.log(cart);

	for (i in cart.items) {
		console.log(i);

		var item = cart.items[i];

		console.log(item)

		console.log(item.name);
		var newRow = table.insertRow(tableSize);
		tableSize += 1;

		var itemCol = newRow.insertCell(0);
		var descriptionCol = newRow.insertCell(1);
		var quantityCol = newRow.insertCell(2);
		var priceCol = newRow.insertCell(3);

		itemCol.innerHTML = item.name;
		descriptionCol.innerHTML = item.color + " and " +  item.size;
		quantityCol.innerHTML = parseInt(item.quantity);
		priceCol.innerHTML = "$ " + (parseInt(item.quantity) * 10.00);

		var itemTotal = parseInt(sessionStorage.getItem("price"));

		itemTotal += (parseInt(item.quantity) * 10.00);

		sessionStorage.setItem("price", itemTotal);

	}

	document.getElementById("total").innerHTML = "Total: $" + parseInt(sessionStorage.getItem("price"));
	document.getElementById('final-cost').innerHTML = "Your Cost: $" + (parseInt(sessionStorage.getItem("price")) + 5.99);

	updateNavBar();
}

function updateNavBar() {
	
	var cartTotalSize = sessionStorage.getItem("cartSize");

	document.getElementById("cart-link").innerHTML = "Cart(" + (cartTotalSize) + ")";
}

function Item(name, color, size, quantity, price) {
	this.name = name;
	this.color = color;
	this.size = size;
	this.quantity = quantity;
	this.price = price
}

