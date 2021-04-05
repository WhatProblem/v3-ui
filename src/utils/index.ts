/**
 * 比较两个日期是否相等
 * @param date1 当前日期
 * @param date2 待比较日期
 * @returns number
 */
export function compareMonth(date1: Date, date2: Date) {
	const year1 = date1.getFullYear()
	const year2 = date2.getFullYear()
	const month1 = date1.getMonth()
	const month2 = date2.getMonth()

	if (year1 === year2) {
		return month1 === month2 ? 0 : month1 > month2 ? 1 : -1
	}
	return year1 > year2 ? 1 : -1
}

/**
 * 转换日期格式
 * @param date
 * @returns xxxx年xx月
 */
export function formatMonthTitle(date: Date) {
	return `${date.getFullYear()}年${date.getMonth() + 1}月`
}

/**
 * 获取每月多少天/最后一天是几号
 * @param year 年份
 * @param month 月份
 * @returns 每月总天数/最后一天多少号
 */
export function getMonthEndDay(year: number, month: number): number {
	return 32 - new Date(year, month - 1, 32).getDate()
}

/**
 * 比较两个日期是否相等
 */
export function compareDate(date1: Date, date2: Date) {
	const year1 = date1.getFullYear()
	const year2 = date2.getFullYear()

	const month1 = date1.getMonth()
	const month2 = date2.getMonth()

	const day1 = date1.getDate()
	const day2 = date2.getDate()

	if (year1 === year2 && month1 === month2 && day1 === day2) return true
	return false
}

export function copyDate(dates: Date) {
	return new Date(dates)
}

export function copyDates(dates: Date | Array<Date>) {
	if (Array.isArray(dates)) {
		return dates.map((date)=>{
			if (!date) return date
			return copyDate(date)
		})
	}
	return copyDate(dates)
}