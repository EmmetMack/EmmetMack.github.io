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

	document.getElementById("cart-link").innerHTML = "Cart(" + (cartTotalSize) + ")";

	
}

function Item(name, color, size, quantity, price) {
	this.name = name;
	this.color = color;
	this.size = size;
	this.quantity = quantity;
	this.price = price
}

