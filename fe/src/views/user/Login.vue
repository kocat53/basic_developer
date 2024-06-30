<template>
  <div
    class="container-sm h-100 d-flex align-items-center justify-content-center"
  >
    <div class="box_login w-50">
      <h1 class="text-center text-fw-bold text-uppercase mb-4 d-block">
        Jasper 2024
      </h1>
      <form @submit.prevent="handleLogin" class="d-grid gap-2">
        <TextField
          id="id"
          autofocus
          placeholder="아이디입력"
          v-model="user.id"
        />
        <TextField
          id="password"
          placeholder="비밀번호 입력"
          type="password"
          v-model.trim="user.password"
          autoComplete="off"
        />
        <Checkbox inline v-model="user.saveId">다음에 또오세요</Checkbox>
        <div class="mt-3 d-grid">
          <Button type="submit" theme="primary">입장하기</Button>
          <div class="text-center mt-4">
            <RouterLink to="/SignUp">입장티켓 끊기</RouterLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/common/Button.vue";
import TextField from "@/components/common/TextField.vue";
import Checkbox from "@/components/common/Checkbox.vue";
import { RouterLink } from "vue-router";
import axios from "@/api/axios";

const user = ref({
  id: "",
  password: "",
  saveId: false,
});

const handleLogin = async () => {
  const result = await axios.post("/user/login", {
    id: user.value.id,
    password: user.value.password,
  });
  console.log("나오나?", result);
};
</script>

<style scoped lang="scss"></style>
