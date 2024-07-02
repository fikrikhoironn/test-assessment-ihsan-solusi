interface Product {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

class InventoryManager {
	private inventory: Product[];

	constructor() {
		this.inventory = [];
	}

	addProduct(product: Product) {
		const index = this.inventory.findIndex((p) => p.id === product.id);
		if (index !== -1) {
			console.log("Product already exists.");
			return;
		}
		this.inventory.push(product);
	}

	updateProduct(productId: number, newQuantity: number) {
		const product = this.inventory.find((p) => p.id === productId);
		if (!product) {
			console.log("Product not found.");
			return;
		}
		product.quantity = newQuantity;
	}

	listProducts() {
		console.log("Listing all products:");
		this.inventory.forEach((product) => {
			console.log(
				`ID: ${product.id}, Name: ${product.name}, Price: ${product.price}, Quantity: ${product.quantity}`,
			);
		});
	}

	sellProduct(productId: number, amount: number) {
		const product = this.inventory.find((p) => p.id === productId);
		if (!product) {
			console.log("Product not found.");
			return;
		}
		if (product.quantity < amount) {
			console.log("Not enough inventory.");
			return;
		}
		product.quantity -= amount;
	}
}
