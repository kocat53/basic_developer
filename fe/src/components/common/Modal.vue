<template>
  <Teleport to="body">
    <dialog ref="modalRef" @cancel.prevent="handleCloseModal">
      <slot></slot>
      <div class="d-flex justify-content-end">
        <button class="btn btn-primary" type="button" @click="handleCloseModal">
          확인
        </button>
      </div>
    </dialog>
  </Teleport>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
const modalRef = ref<HTMLDialogElement | null>(null);

// 닫기
const handleCloseModal = () => {
  modalRef.value?.close();
  emit("update:modelValue", false);
};

// 열림데이터 감지
watch(
  () => props.modelValue,
  async newValue => {
    if (newValue) {
      await nextTick();
      modalRef.value?.showModal();
    }
  }
);
</script>

<style scoped>
dialog {
  border: none;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 548px;
}

button {
  margin-top: 10px;
}
</style>
