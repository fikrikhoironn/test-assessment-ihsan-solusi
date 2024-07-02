class InventoryError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InventoryError";
	}
}

interface Product {
	readonly id: number;
	name: string;
	price: number;
	quantity: number;
}

class InventoryManager {
	private inventory: Product[];

	constructor() {
		this.inventory = [];
		this.loadInventory();
	}

	private findProductById(productId: number): Product | undefined {
		return this.inventory.find((p) => p.id === productId);
	}

	addProduct(product: Product): boolean {
		if (this.findProductById(product.id)) {
			throw new InventoryError("Product already exists.");
		}
		this.inventory.push(product);
		this.saveInventory();
		return true;
	}

	updateProduct(productId: number, changes: Partial<Product>): boolean {
		const product = this.findProductById(productId);
		if (!product) {
			throw new InventoryError("Product not found.");
		}
		Object.assign(product, changes);
		this.saveInventory();
		return true;
	}

	listProducts(): void {
		console.log("Listing all products:");
		this.inventory.forEach((product) => {
			console.log(
				`ID: ${product.id}, Name: ${product.name}, Price: ${product.price}, Quantity: ${product.quantity}`,
			);
		});
	}

	sellProduct(productId: number, amount: number): boolean {
		const product = this.findProductById(productId);
		if (!product) {
			throw new InventoryError("Product not found.");
		}
		if (product.quantity < amount) {
			throw new InventoryError("Not enough inventory.");
		}
		product.quantity -= amount;
		this.saveInventory();
		return true;
	}

	saveInventory(): void {
		const data = JSON.stringify(this.inventory);
		localStorage.setItem("inventory", data);
	}

	loadInventory(): void {
		const data = localStorage.getItem("inventory");
		if (data) {
			this.inventory = JSON.parse(data);
		}
	}
}
