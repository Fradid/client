import { makeAutoObservable } from "mobx";

export default class LessonStore {
	constructor() {
		this._lessons = [];
		this._page = 1
		this._totalCount = 0
		this._limit = 30
		makeAutoObservable(this);
	}

	setLessons(lessons) {
		this._lessons = lessons;
	}

	setPage(page) {
		this._page = page;
	}

	setTotalCount(count) {
		this._totalCount = count;
	}

	get lessons() {
		return this._lessons;
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
