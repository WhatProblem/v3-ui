import { defineComponent } from 'vue'
import './index.scss'

export default defineComponent({
	name: 'CalendarHeader',

	props: {
		firstDayOfWeek: {
			type: Number,
			default: 0
		}
	},

	setup(props, { emit, slots, attrs }) {

		// 一周的标题
		const renderWeekDays = () => {
			const { firstDayOfWeek } = props
			const weekdays = ['日', '一', '二', '三', '四', '五', '六']
			const renderWeekDays = [
				...weekdays.splice(firstDayOfWeek, 7),
				...weekdays.splice(0, firstDayOfWeek)
			]

			return (
				<div class="calendar-weekdays">
					{
						renderWeekDays.map(text=>(<span class="calendar-weekday">{text}</span>))
					}
				</div>
			)
		}

		return () => {
			return (
				<div class="calendar-header">
					{renderWeekDays()}
				</div>
			)
		}
	}
})