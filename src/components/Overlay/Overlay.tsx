import { getZIndexStyle, isDef, noop, preventDefault } from '@/utils'
import { CSSProperties, defineComponent, PropType, Transition } from 'vue'
import './index.scss'

export default defineComponent({
	name: 'Overlay',

	props: {
		show: Boolean,
		className: String,
		duration: {
			type: [Number, String],
			default: '0.28s'
		},
		zIndex: [Number, String],
		customStyle: Object as PropType<CSSProperties>,
		lockScroll: Boolean,

	},

	setup(props, {emit, slots, attrs}) {

		const preventTouchmove = (event: TouchEvent) => {
			preventDefault(event, true)
		}

		const renderOverlay = () =>{
			const style: CSSProperties = {
				...getZIndexStyle(props.zIndex),
				...props.customStyle,
			}

			if (isDef(props.duration)) {
				style.animationDuration = `${props.duration}s`
			}


			return (
				<div v-show={props.show} class={['custom-overlay', props.className]} onTouchmove={props.lockScroll ? preventTouchmove : noop}>
					{slots.default?.()}
				</div>
			)
		}
		
		return ()=>(
			<Transition name="fade">
				{renderOverlay()}
			</Transition>
		)
	}
})