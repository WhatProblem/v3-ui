export type CalendarDayType = | ''
	| 'start'
	| 'start-end'
	| 'middle'
	| 'end'
	| 'selected'
	| 'single'
	| 'multiple-middle'
	| 'multiple-selected'
	| 'disabled'
	| 'placeholder';

export type CalendarDayItem = {
	date: Date
	type?: CalendarDayType
	text: string | number
	className?: unknown
}