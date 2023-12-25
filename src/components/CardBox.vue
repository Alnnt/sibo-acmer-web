<script setup></script>

<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  justify-content: center;

  height: auto;
  width: auto;
  padding: 30px 30px;

  border-radius: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.2);

  backdrop-filter: blur(10px);
  background: rgba(50, 50, 50, 0.2);
}
</style>
