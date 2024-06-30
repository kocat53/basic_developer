<template>
  <button :class="classes" type="button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    theme?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
    size?: 'lg' | 'sm' | ''
  }>(),
  {
    theme: 'secondary',
    size: ''
  }
)

const classes = computed(() => {
  return {
    btn: true,
    [`btn-${props.theme}`]: true,
    [`btn-${props.size}`]: props.size
  }
})
</script>

<style scoped></style>
