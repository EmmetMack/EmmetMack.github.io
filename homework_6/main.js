
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

