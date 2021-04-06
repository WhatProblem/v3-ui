import { compareMonth, copyDates } from '@/utils'
import { computed, defineComponent, provide, reactive, readonly, ref } from 'vue'
import { CalendarDayItem } from './calendar.interface'
import CalendarHearder from './CalendarHearder'
import CalendarMonth from './CalendarMonth'
import './index.scss'

const current = new Date()
export default defineComponent({
	name: 'Calendar',

	props: {
		minDate: {
			type: Date,
			default: new Date()
		},
		maxDate: {
			type: Date,
			default: new Date(current.getFullYear(), current.getMonth() + 4, current.getDate())
		},
		// 默认一周以哪天开始
		firstDayOfWeek: {
			type: [Number, String],
			default: 0,
			validator: (val: number) => val >= 0 && val <= 6
		},
		className: {
			type: String,
			default: 'custom-day'
		},
		defaultDate: {
			type: [Date, Array] as any,
			default: new Date()
		},
	},

	// 定义通信事件名
	emits: ['select', 'confirm'],

	setup(props, { emit, slots, attrs }) {
		// 初始化日期
		const getInitialDate = (defaultDate = props.defaultDate) => {
			const { minDate, maxDate } = props
			if (!defaultDate) return defaultDate
		}

		// 初始化响应式变量
		const state = reactive({
			subtitle: '',
			currentDate: getInitialDate()
		})
		console.log(state)

		if (props.className) {
			const className = ref(props.className)
			provide('className', readonly(className))
		}

		// 设置默认展示几个月
		const months = computed(() => {
			const months = []
			const cursor = new Date(props.minDate)

			cursor.setDate(1)
			do {
				months.push(new Date(cursor))
				cursor.setMonth(cursor.getMonth() + 1)
			} while (compareMonth(cursor, props.maxDate) !== 1)

			return months
		})

		// 设置一周默认以哪天开始，默认是周日
		// date.getDay() 周日 => 0
		const dayOffset = computed(() => props.firstDayOfWeek ? +props.firstDayOfWeek % 7 : 0)

		const onClickDay = (item: CalendarDayItem) => {
			const { date } = item
			const { currentDate } = state

			select(date, true)
		}

		const onConfirm = () => emit('confirm', copyDates(state.currentDate))

		const select = (date: Date | Array<Date>, complete?: boolean) => {
			const setCurrentDate = (date: Date | Array<Date>) => {
				state.currentDate = date
				emit('select', copyDates(state.currentDate))
			}

			setCurrentDate(date)
			if (complete) {
				onConfirm()
			}
		}

		// 渲染对应的月份的函数
		const renderMonth = (date: Date, index: number) => {
			// const showMonthTitle = index !== 0
			const showMonthTitle = true
			console.log(state.currentDate)
			return (
				<CalendarMonth onClick={onClickDay} date={date} currentDate={state.currentDate} type='single' showMonthTitle={showMonthTitle} firstDayOfWeek={dayOffset.value} />
			)
		}

		return () => (
			<div class="calendar">
				<CalendarHearder firstDayOfWeek={dayOffset.value} />
				<div class="calendar-body">
					{months.value.map(renderMonth)}
				</div>
			</div>
		)
	}
})