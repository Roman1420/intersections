<template>
  <teleport to="body">
    <transition :name="wrapperAnimationName" appear>
      <div ref="modalWrapper" v-if="showModal" :class="modalWrapperClasses">
        <transition :name="modalAnimationName" appear>
          <div ref="modalContent" v-if="showModal" class="v-modal-wrapper__modal">
            <slot></slot>
            <IssRoundIconButton
              v-if="canClose && hasCloseButton"
              class="v-modal-wrapper__close"
              :mode="buttonMode"
              @click="hide"
            >
              <Icon24CloseOutline />
            </IssRoundIconButton>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { ref, watch, onMounted, onUnmounted, computed } from "vue";
import { IssRoundIconButton } from "iss-ui-kit/components";
import { Icon24CloseOutline } from "iss-ui-kit/icons";

interface Props {
  modelValue: boolean;
  wrapperAnimationName?: string;
  modalAnimationName?: string;
  canClose?: boolean;
  canClickOutsideClose?: boolean;
  hasCloseButton?: boolean;
  hasBlackout?: boolean;
  hasBlur?: boolean;
  buttonMode?: "system" | "accent" | "content" | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  wrapperAnimationName: "fade",
  modalAnimationName: "fade",
  canClose: true,
  canClickOutsideClose: true,
  hasCloseButton: true,
  hasBlackout: true,
  hasBlur: false,
  buttonMode: "system",
});

const emit = defineEmits(["update:modelValue", "show", "hide"]);

const showModal = useVModel(props, "modelValue", emit);
const modalWrapper = ref<HTMLElement | null>(null);
const modalContent = ref<HTMLElement | null>(null);

const modalWrapperClasses = computed((): string[] => {
  const classes: string[] = ["v-modal-wrapper"];

  if (props.hasBlackout) classes.push("v-modal-wrapper--blackout");
  if (props.hasBlur) classes.push("v-modal-wrapper--blur");

  return classes;
});

const show = (): void => {
  document.body.style.overflowY = "hidden";

  emit("show");
  showModal.value = true;
};
const hide = (): void => {
  document.body.style.overflowY = "auto";

  emit("hide");
  showModal.value = false;
};

watch(showModal, () => {
  if (showModal.value) {
    show();
  } else {
    hide();
  }
});

const handleClickOutside = (e: MouseEvent): void => {
  if (
    showModal.value &&
    modalWrapper.value &&
    modalContent.value &&
    props.canClose &&
    props.canClickOutsideClose &&
    e.target instanceof Node &&
    e.target === modalWrapper.value &&
    !modalContent.value.contains(e.target)
  )
    hide();
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

defineExpose({ show, hide });
</script>

<style lang="scss" scoped>
.v-modal-wrapper {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 58px 101px;

  &--blackout {
    background-color: rgba(0, 0, 0, 55%);
  }

  &--blur {
    backdrop-filter: blur(12px);
  }

  &__modal {
    position: relative;
  }

  &__close {
    position: absolute;
    top: 0;
    right: -8px;
    color: var(--icon-secondary-default, #4E5A6C);
    transform: translateX(100%);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-y-enter-active,
.slide-y-leave-active {
  transition: transform 0.3s ease;
}

.slide-y-enter-from,
.slide-y-leave-to {
  transform: translateY(-100%);
}
</style>
