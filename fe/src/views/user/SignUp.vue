<template>
  <div
    class="container-sm h-100 d-flex align-items-center justify-content-center"
  >
    <div class="box_login w-50">
      <h1 class="text-center text-fw-bold text-uppercase mb-4 d-block">
        Jasper 2024
      </h1>
      <vForm
        as="form"
        v-slot="{ errors, values, validate }"
        @submit.prevent="handleSignUp"
        class="d-grid gap-2"
      >
        <div class="container-fluid p-0">
          <div class="row gx-3">
            <div class="col">
              <!-- 아이디  -->
              <vField
                v-model.trim="user.id"
                name="id"
                v-slot="{ field, errors }"
                :rules="{ required: true, min: 5, regex: /^[a-zA-Z0-9.]+$/ }"
              >
                <TextField
                  id="id"
                  v-bind="field"
                  autofocus
                  :error="errors[0]"
                  placeholder="아이디입력"
                  autocomplete="off"
                  @blur="onBlurCheckMatch({ id: user.id }, errors)"
                />
              </vField>
            </div>
            <!-- 닉네임 -->
            <div class="col">
              <vField
                name="nickName"
                v-slot="{ field, errors }"
                :rules="{ required: true }"
                v-model.trim="user.nickName"
              >
                <TextField
                  id="nickName"
                  autofocus
                  placeholder="닉네임 입력"
                  autocomplete="off"
                  :error="errors[0]"
                  v-bind="field"
                  @blur="onBlurCheckMatch({ nickName: user.nickName }, errors)"
                />
              </vField>
            </div>
          </div>
        </div>
        <!-- 비밀번호 입력 -->
        <vField
          name="password"
          v-slot="{ field, errors }"
          :rules="{ required: true, min: 7 }"
          v-model.trim="user.password"
        >
          <TextField
            id="password"
            placeholder="비밀번호 입력"
            type="password"
            :error="errors[0]"
            autoComplete="off"
            v-bind="field"
            @blur="onBlurCheckMatch({ password: user.password }, errors)"
          />
        </vField>
        <!-- 비밀번호 확인 -->
        <vField
          v-model.trim="user.passwordCheck"
          name="passwordCheck"
          v-slot="{ field, errors }"
          :rules="{ required: true, is: passwordMismatch }"
        >
          <TextField
            id="passwordCheck"
            placeholder="비밀번호 체크!"
            type="password"
            :error="errors[0]"
            autoComplete="off"
            v-bind="field"
          />
        </vField>
        <vField
          name="phone"
          v-slot="{ field, errors }"
          :rules="{ required: true }"
          v-model.trim="user.phone"
        >
          <TextField
            id="phone"
            placeholder="01012345678"
            autocomplete="off"
            :error="errors[0]"
            v-bind="field"
          />
        </vField>
        <Button
          type="submit"
          :disabled="Object.keys(errors).length !== 0"
          class="mt-4"
          @click="handleSignUp(validate)"
          theme="primary"
          >티켓발권</Button
        >
      </vForm>
    </div>
  </div>
  <!-- 경고모달 -->
  <Modal v-model="isDuplicateInfo">
    <p>{{ DuplicateErrorMessage }}</p>
  </Modal>
</template>

<script setup lang="ts">
import Button from "@/components/common/Button.vue";
import Modal from "@/components/common/Modal.vue";
import TextField from "@/components/common/TextField.vue";
import axios from "@/api/axios";
import { isAxiosError } from "axios";
const router = useRouter();

const user = ref({
  id: "",
  password: "",
  passwordCheck: "",
  phone: "",
  nickName: "",
});

const DuplicateErrorMessage = ref("");
const isDuplicateInfo = ref(false);

const passwordMismatch = computed(
  () =>
    user.value.password &&
    user.value.passwordCheck &&
    user.value.password !== user.value.passwordCheck
);

const onBlurCheckMatch = async (info: any, errors: any) => {
  // 입력된 값 없을경우 막기
  if (Object.values(info)[0] === "") return;

  try {
    await axios.post("/user/check", info);
  } catch (error) {
    if (isAxiosError(error)) {
      isDuplicateInfo.value = true;
      DuplicateErrorMessage.value = error.response?.data.message;
      // 에러 메시지를 errors 객체에 추가
      errors[0] = error.response?.data.message;
      return errors;
    } else {
      console.error("알 수 없는 에러:", error);
    }
  }
};
// 최종 회원가입 버튼
const handleSignUp = async (validate: () => Promise<{ valid: boolean }>) => {
  const checkValidate = await validate();

  if (checkValidate.valid) {
    const { status, data } = await axios.post("/user/signup", user.value);
    if (status === 200) router.push("/login");
  }
};
</script>

<style scoped lang="scss"></style>
