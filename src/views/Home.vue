<template>
  <div class="demo-wrap">
    <h4>操作按钮</h4>
    <div>
      <button @click="isCalendar=!isCalendar">日历demo</button>
      <button @click="isOverlay=!isOverlay">遮罩层demo</button>
    </div>

    <div v-show="isCalendar">
      <h4>日历源码部分</h4>
      <Calendar @select="onSelect" @confirm="onConfirm" />
    </div>
    <div>
      <h4>遮罩层源码</h4>
      <Overlay :show="isOverlay" @click="isOverlay=false"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calendar from '@/components/Calendar/Calendar'
import Overlay from '@/components/Overlay/Overlay'

export default defineComponent({
  name: "Home",
  components: {
    Calendar,
    Overlay
  },
  data() {
    return {
      isCalendar: false,
      isOverlay: false,
    }
  },
  methods: {
    onSelect(opt: unknown) {
      // console.log(opt)
    },
    onConfirm(opt: unknown) {
      // console.log(opt)
    }
  }
});
</script>
<style lang="scss" scoped>

</style>