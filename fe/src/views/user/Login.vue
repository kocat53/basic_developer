<template>
  <section class="login_wrap">
    <div class="outer">
      <div class="form_wrap">
        <h1 class="text-center text-fw-bold text-uppercase mb-4 d-block">
          Jasper 2024
        </h1>
        <form @submit.prevent="handleLogin" class="d-grid gap-2">
          <TextField
            id="id"
            autofocus
            placeholder="아이디입력"
            autocomplete="off"
            v-model="user.id"
          />
          <TextField
            id="password"
            placeholder="비밀번호 입력"
            type="password"
            v-model.trim="user.password"
            autoComplete="off"
          />
          <Checkbox inline v-model="user.saveId">
            <span>다음에 또오세요</span>
          </Checkbox>
          <div class="mt-3 d-grid">
            <Button type="submit">입장하기</Button>
            <div class="text-center mt-4">
              <RouterLink to="/SignUp">입장티켓 끊기</RouterLink>
            </div>
          </div>
        </form>
      </div>
      <div class="bg_wrap" aria-hidden="true"></div>
    </div>
  </section>
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
  saveId: false, // 자동저장 여부
});

// 이벤트 : 로그인
const handleLogin = async () => {
  const result = await axios.post("/user/login", {
    id: user.value.id,
    password: user.value.password,
  });
  console.log("나오나?", result);
};
</script>
<style scoped lang="scss">
.login_wrap {
  height: 100vh;
  padding: 80px 40px;
  background: linear-gradient(
    90deg,
    rgba(199, 148, 126, 1) 50.01%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  );
  container: outer / inline-size;

  .outer {
    display: flex;
    width: 100%;
    height: 100%;
    max-width: 55vw;
    margin: 0 auto;

    > div {
      flex: 1 1 50%;
    }
  }
  .form_wrap {
    background: #fff;
    box-shadow: 0px 0px 10px rgb(141, 109, 98);
    border-radius: 10px 0 0 10px;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .bg_wrap {
    height: 100%;
    background: url("/src/assets/images/bg.webp") no-repeat right bottom;
    background-size: cover;
    box-shadow: 5px 0px 10px rgb(138, 78, 57);
    border-radius: 0 10px 10px 0;
  }

  img {
    height: 100%;
    width: auto;
  }
}

@container outer (max-width: 1200px) {
  .outer {
    max-width: 80vw !important;
  }
}
</style>
