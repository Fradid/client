import { makeAutoObservable } from "mobx";

export default class CourseStore {
	constructor() {
		this._courses = [];
		makeAutoObservable(this);
	}

	setCourses(courses) {
		this._courses = courses;
	}

	get courses() {
		return this._courses;
	}
}
