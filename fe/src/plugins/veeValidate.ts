// src/plugins/vee-validate.ts
import { type App } from "vue";
import {
  defineRule,
  configure,
  Field as VeeField,
  Form as VeeForm,
} from "vee-validate";
import * as rules from "@vee-validate/rules";

export default {
  install(app: App) {
    // 모든 규칙 정의
    Object.keys(rules).forEach(rule => {
      if (typeof (rules as Record<string, any>)[rule] === "function") {
        defineRule(rule, (rules as Record<string, any>)[rule]);
      }
    });

    configure({
      validateOnBlur: true, // blur 이벤트 시 유효성 검사 수행
      validateOnChange: false,
      validateOnInput: false,
      validateOnModelUpdate: false,
    });

    // 커스텀 컴포넌트 이름으로 등록
    app.component("vField", VeeField);
    app.component("vForm", VeeForm);
  },
};
