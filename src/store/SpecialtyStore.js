import { makeAutoObservable } from "mobx";

export default class SpecialtyStore {
	constructor() {
		this._specialties = [];
		makeAutoObservable(this);
	}

	setSpecialties(specialties) {
		this._specialties = specialties;
	}

	get specialties() {
		return this._specialties;
	}
}
