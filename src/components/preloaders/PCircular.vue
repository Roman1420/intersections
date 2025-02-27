<template>
  <div class="loader">
    <div class="loading-spinner">
      <svg 
        class="loading-spinner__circle-svg" 
        viewBox="25 25 50 50"
      >
        <circle 
          class="loading-spinner__circle-stroke" 
          cx="50" 
          cy="50" 
          r="20" 
          :stroke="`var(${props.color})`" 
          fill="none"
          stroke-width="2" 
          stroke-miterlimit="10"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: '--icon-secondary-default'
  }
});
</script>

<style lang="scss" scoped>
.loading-spinner {
  position: relative;
  width: 39px;
  height: 39px;
  margin: 0 auto;
}

.loading-spinner::before {
  display: block;
  padding-top: 100%;
  content: '';
}

.loading-spinner__circle-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  transform-origin: center center;
  animation: loading-spinner-rotate 1.28973s linear infinite;
}

.loading-spinner__circle-stroke {
  stroke-width: 4px;
  stroke-linecap: round;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: loading-spinner-dash 2s ease-in-out infinite, loading-spinner-color 8s ease-in-out infinite;
}

@keyframes loading-spinner-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-spinner-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
