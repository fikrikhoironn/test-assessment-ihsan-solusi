class DataManager<T> {
	private data: Array<T>;

	constructor() {
		this.data = [];
	}

	addData(item: T): void {
		this.data.push(item);
	}

	removeData(item: T): boolean {
		const index = this.data.indexOf(item);
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
		return this.data;
	}

	sortData(compareFunction: (a: T, b: T) => number): void {
		this.data.sort(compareFunction);
	}
}

const dataManager = new DataManager<number>();
dataManager.addData(5);
dataManager.addData(3);
dataManager.addData(8);

console.log(dataManager.getAllData());
dataManager.sortData((a, b) => a - b);
console.log(dataData.getAllData());

dataManager.removeData(3);
console.log(dataData.getAllData());
