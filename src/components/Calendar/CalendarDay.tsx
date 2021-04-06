import { ComponentPublicInstance, computed, CSSProperties, defineComponent, inject, InjectionKey, PropType } from 'vue'
import { CalendarDayItem } from './calendar.interface'
import './index.scss'

export default defineComponent({
	name: 'CalendarDay',

	props: {
		item: {
			type: Object as PropType<CalendarDayItem>,
			required: true
		},
		offset: {
			type: Number,
			default: 0
		},
		index: Number,
		onClick: Function,
	},

	// 定义事件名
	emits: ['click'],

	setup(props, {emit, slots, attrs}) {
		const className: ComponentPublicInstance<any, {}> = inject('className')
		// 具体每个月份第一天偏移量样式
		const style = computed(()=>{
			const { item, offset, index } = props
			const style: CSSProperties = {}
			if (index === 0) {
				style.marginLeft = `${(100*offset)/7}%`
			}
			return style
		})

		// 具体内容定义
		const renderContent=()=>{
			const { text, type } = props.item

			const Nodes = [text]
			if (type === 'selected') {
				return (
					<div class="selected">{Nodes}</div>
				)
			}
			return Nodes
		}

		const onClick = () => {
			emit('click', props.item)
		}

		return () => (
			// const {className} = props.item
			<div onClick={onClick} role="gridcell" style={style.value} class={["calendar-day", className.value, props.item.className]}>
				{renderContent()}
			</div>
		)
	}
})