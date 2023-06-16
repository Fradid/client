import { makeAutoObservable } from "mobx";

export default class MaterialStore {
	constructor() {
		this._materials = [];
		this._page = 1
		this._totalCount = 0
		this._limit = 30
		makeAutoObservable(this);
	}

	setMaterials(materials) {
		this._materials = materials;
	}

	setPage(page) {
		this._page = page;
	}

	setTotalCount(count) {
		this._totalCount = count;
	}

	get materials() {
		return this._materials;
	}

	get page() {
		return this._page;
	}

	get totalCount() {
		return this._totalCount;
	}

	get limit() {
		return this._limit;
	}
}
