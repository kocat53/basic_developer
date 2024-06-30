<template>
  <textarea
    v-if="props.multiLine"
    :class="classes"
    :rows="multiLine"
    v-model="modelValue"
  ></textarea>
  <input v-else type="text" :class="classes" v-model="modelValue" />
</template>

<script setup lang="ts">
import { computed, withDefaults, watch } from 'vue'
import type { Size } from '@/types/components'

const modelValue = defineModel('modelValue', { default: '' })
const emits = defineEmits(['update:modelValue'])
const props = withDefaults(
  defineProps<{
    multiLine?: number
    size?: Size
  }>(),
  {
    multiLine: 0,
    size: ''
  }
)

const classes = computed(() => {
  return {
    'form-control': true,
    [`form-control-${props.size}`]: props.size
  }
})

watch(modelValue, (newValue) => {
  if (newValue === ' ') modelValue.value = ''
})

// ⭐️ 기존에 아래처럼 사용하던 방식을 defineModel 로 하면 더 심플하게 가능함
// const onInput = (event: Event) => {
//   const target = event.target as HTMLInputElement | HTMLTextAreaElement
//   if (target.value === ' ') return (target.value = '')
//   emits('update:modelValue', target.value)
// }
</script>

<style scoped></style>
