<template>
  <button :class="classes" type="button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    theme?: "primary" | "secondary" | "success" | "danger" | "warning" | "";
    size?: "lg" | "sm" | "";
  }>(),
  {
    theme: "",
    size: "",
  }
);

const classes = computed(() => {
  return {
    btn: true,
    [`btn-${props.theme}`]: true,
    [`btn-${props.size}`]: props.size,
  };
});
</script>

<style scoped></style>
