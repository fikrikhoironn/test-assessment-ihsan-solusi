class DataManager<T> {
	private data: Array<T>;

	constructor() {
		this.data = [];
	}

	addData(item: T): void {
		this.data.push(item);
	}

	removeData(item: T): boolean {
		const index = this.data.findIndex((i) => i === item);
		if (index > -1) {
			this.data.splice(index, 1);
			return true;
		}
		return false;
	}

	findData(filterFunction: (item: T) => boolean): T | undefined {
		return this.data.find(filterFunction);
	}

	getAllData(): Array<T> {
		return [...this.data];
	}

	sortData(compareFunction: (a: T, b: T) => number): void {
		if (this.data.length > 1000) {
			this.data.sort(compareFunction);
		} else {
			this.insertionSort(compareFunction);
		}
	}

	private insertionSort(compareFunction: (a: T, b: T) => number): void {
		for (let i = 1; i < this.data.length; i++) {
			let j = i;
			while (j > 0 && compareFunction(this.data[j - 1], this.data[j]) > 0) {
				[this.data[j - 1], this.data[j]] = [this.data[j], this.data[j - 1]];
				j--;
			}
		}
	}
}

const dataManager = new DataManager<number>();
dataManager.addData(5);
dataManager.addData(3);
dataManager.addData(8);

console.log(dataManager.getAllData());
dataManager.sortData((a, b) => a - b);
console.log(dataManager.getAllData());

dataManager.removeData(3);
console.log(dataManager.getAllData());
