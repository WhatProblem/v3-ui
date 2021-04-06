import { compareDate, formatMonthTitle, getMonthEndDay } from '@/utils'
import { computed, defineComponent, PropType } from 'vue'
import CalendarDay from './CalendarDay'
import { CalendarDayItem, CalendarDayType } from './calendar.interface'
import './index.scss'

export default defineComponent({
	name: 'CalendarMonth',
	props: {
		date: {
			type: Date,
			required: true
		},
		showMonthTitle: {
			type: Boolean,
			required: true
		},
		firstDayOfWeek: {
			type: Number,
			required: true
		},
		onClick: Function,
		type: String as PropType<CalendarDayType>,
		currentDate: [String, Array] as PropType<Date | Date[]>
	},

	// 定义事件名
	emits: ['click'],

	setup(props, { emit, slots, attrs }) {
		// 获取指定格式日期
		const title = computed(() => formatMonthTitle(props.date))

		// 每月上面的标题 2021年4月
		const renderTitle = () => {
			if (props.showMonthTitle) {
				return <div class="calendar-month-title">{title.value}</div>
			}
		}

		// 获取每月天数/最后一天是几号
		const totalDay = computed(() => getMonthEndDay(props.date.getFullYear(), props.date.getMonth() + 1))

		// 获取每月第一天的偏移量 例如 2021-4-1 周四，在一周的偏移量就是4
		const offset = computed(() => {
			const realDay = props.date.getDay()
			if (props.firstDayOfWeek) {
				return (realDay + 7 - props.firstDayOfWeek) % 7
			}
			return realDay
		})

		const getDayType = (day: Date): CalendarDayType => {
			const {type, currentDate} = props

			if (type === 'single') {
				return compareDate(day, currentDate as Date) ? 'selected' : ''
			}
			return ''
		}

		// 每月天数
		const days = computed(() => {
			const days: Array<CalendarDayItem> = []
			const year = props.date.getFullYear()
			const month = props.date.getMonth()

			for (let day = 1; day <= totalDay.value; day++) {
				const date = new Date(year, month, day)
				const type = getDayType(date)

				let config: CalendarDayItem = {
					date,
					type,
					text: day,
					className: compareDate(date, new Date()) ? 'selected-day' : ''
				}
				days.push(config)
			}
			return days
		})

		// 渲染每一天
		const renderDay = (item: CalendarDayItem, index: number) => {
			return (
				<CalendarDay onClick={ (item: CalendarDayItem) => emit('click', item)} item={item} index={index} offset={offset.value} />
			)
		}

		// 每月的具体日期渲染
		const renderDays = () => {
			return (
				<div role="grid" class="calendar-days">
					{days.value.map(renderDay)}
				</div>
			)
		}

		return () => (
			<div class="calendar-month">
				{renderTitle()}
				{renderDays()}
			</div>
		)
	}
})