import {EventType} from "../enums/EventType.enum";

export interface Objective {
	type: EventType;
	position: number[];
}
