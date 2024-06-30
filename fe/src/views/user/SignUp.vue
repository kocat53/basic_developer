<template>
  <div
    class="container-sm h-100 d-flex align-items-center justify-content-center"
  >
    <div class="box_login w-50">
      <h1 class="text-center text-fw-bold text-uppercase mb-4 d-block">
        Jasper 2024
      </h1>
      <form @submit.prevent="handleLogin" class="d-grid gap-2">
        <div class="container-fluid p-0">
          <div class="row gx-3">
            <div class="col">
              <TextField
                id="id"
                autofocus
                placeholder="아이디입력"
                v-model.trim="user.id"
              />
            </div>
            <div class="col">
              <TextField
                id="nickName"
                autofocus
                placeholder="닉네임 입력"
                v-model.trim="user.nickName"
              />
            </div>
          </div>
        </div>
        <TextField
          id="password"
          placeholder="비밀번호 입력"
          type="password"
          v-model.trim="user.password"
          autoComplete="off"
        />
        <TextField
          id="passwordCheck"
          placeholder="비밀번호 체크!"
          type="passwordCheck"
          v-model.trim="user.password"
          autoComplete="off"
        />
        <TextField
          id="phone"
          placeholder="01012345678"
          v-model.trim="user.phone"
        />
        <Button type="submit" class="mt-4" theme="primary">티켓발권</Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { postFetch } from "@/api/useFetch.ts";
import Button from "@/components/common/Button.vue";
import TextField from "@/components/common/TextField.vue";

const user = ref({
  id: "",
  password: "",
  passwordCheck: "",
  phone: "",
  nickName: "",
});

const handleLogin = async () => {
  const result = await postFetch("/user/signup", user.value);
  console.log("될까..!?", result);
};
</script>

<style scoped lang="scss"></style>
