export interface LiveGameEvent {
	EventID: number;
	EventName: string;
	EventTime: number;
	TurretKilled?: string;
	InhibKilled?: string;
	KillerName: string;
	Assisters: string[];
}
