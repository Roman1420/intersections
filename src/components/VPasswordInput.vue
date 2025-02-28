<template>
  <div class="v-password-input">
    <IssInput
      v-model="password"
      :type="type"
      :placeholder="'password'"
    />
    <Icon24View
      v-if="!isPasswordShown && !success"
      class="v-password-input__icon button"
      @click="toggleShowPassword"
    />
    <Icon24Hide
      v-if="isPasswordShown && !success"
      class="v-password-input__icon button"
      @click="toggleShowPassword"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useVModel } from "@vueuse/core";
import { IssInput } from "iss-ui-kit/components";
import { Icon24View, Icon24Hide } from "iss-ui-kit/icons";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    validator: (value: string) => ["s","l"].includes(value),
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
    default: "password",
  },
  error: {
    type: Boolean,
    required: false,
  },
  success: {
    type: Boolean,
    required: false,
  },
});
const emit = defineEmits(["update:modelValue"]);

const password = useVModel(props, 'modelValue', emit);
const isPasswordShown = ref(false);
const type = ref("password");

const toggleShowPassword = () => {
  isPasswordShown.value = !isPasswordShown.value;
  type.value = isPasswordShown.value ? "text" : "password";
};
</script>

<style lang="scss" scoped>
$icon-size: 24px;

.v-password-input {
  position: relative;
  display: flex;
  align-items: center;

  &__icon {
    position: absolute;
    right: 8px;
    width: $icon-size;
    height: $icon-size;

    &.disabled {
      pointer-events: none;
    }

    &.button {
      cursor: pointer;
    }
  }
}
</style>
