<template>
  <div :class="['form-check', { 'form-check-inline': inline }]">
    <input
      v-bind="$attrs"
      class="form-check-input"
      :type="type"
      :id="props.id"
      :value="value"
      :checked="isChecked"
      @change="updateValue"
    />
    <label v-if="hasContent" class="form-check-label" :for="props.id">
      <slot></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
import { useSlots, useAttrs, computed, withDefaults, defineProps, defineOptions } from 'vue'
const slots = useSlots()
const $attrs = useAttrs()

const hasContent = !!slots.default
const emits = defineEmits(['update:modelValue'])

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(
  defineProps<{
    type?: 'checkbox' | 'radio'
    inline?: boolean
    value?: string | number | boolean
    modelValue?: boolean | any[] | string | number
    id?: string
  }>(),
  {
    type: 'checkbox',
    inline: false,
    value: '',
    id: `check-${Math.random().toString(36).substr(2, 9)}`,
    modelValue: false
  }
)

// 체크 설정
const isChecked = computed(() => {
  // 타입이 체크박스이고 배열 value가 넘어올때
  if (props.type === 'checkbox' && Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }
  // 배열이 아닌 일반 값 일때
  return props.modelValue === props.value
})

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement

  if (props.type === 'checkbox' && Array.isArray(props.modelValue)) {
    handleCheckboxArray(target.checked)
  } else {
    emits('update:modelValue', target.type === 'checkbox' ? target.checked : target.value)
  }
}

const handleCheckboxArray = (checked: boolean) => {
  if (!Array.isArray(props.modelValue)) return
  const newValue = [...props.modelValue]
  if (checked) {
    newValue.push(props.value)
  } else {
    const index = newValue.indexOf(props.value)
    if (index > -1) {
      newValue.splice(index, 1)
    }
  }
  emits('update:modelValue', newValue)
}
</script>

<style scoped></style>
