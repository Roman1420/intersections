<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
  >
    <rect
      width="6"
      height="18"
      rx="2"
      transform="matrix(-1 0 0 1 22 3)"
      :fill="iconColor"
    />
    <path
      :style="rotateStyle"
      opacity="0.4"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.99999 12.9758C2.44771 12.9758 2 12.5494 2 12.0234C2 11.4974 2.44771 11.071 2.99999 11.071L10.5971 11.071L8.04166 8.62398C7.6522 8.25104 7.65392 7.64803 8.04551 7.27712C8.43709 6.9062 9.07025 6.90784 9.4597 7.28078L13.709 11.3499C14.0984 11.7228 14.0968 12.3257 13.7053 12.6966L9.45596 16.7228C9.06443 17.0938 8.43127 17.0922 8.04176 16.7193C7.65224 16.3464 7.65388 15.7434 8.04541 15.3724L10.5749 12.9758L2.99999 12.9758Z"
      :fill="iconColor"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  iconColor: {
    type: String,
    default: '#9DA6B2'
  },
  active: {
    type: Boolean,
    default: false
  }
});

const rotateStyle = computed(() => {
  return {
    transition: '.3s',
    transformOrigin: '32% 50%',
    transform: props.active
      ? 'rotate(-180deg)'
      : 'rotate(0deg)'
  };
});
</script>
