<template>
  <div class="demo-wrap">
    <h4>日历源码部分</h4>
    <Calendar @select="onSelect" @confirm="onConfirm" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calendar from '@/components/Calendar/Calendar'

export default defineComponent({
  name: "Home",
  components: {
    Calendar
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