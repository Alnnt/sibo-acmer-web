<script setup>
defineProps(['label', 'value', 'focus'])
defineEmits(['update:value', 'update:focus'])
</script>

<template>
  <div class="input-box">
    <label>{{ label }}</label>
    <input type="text"
           :value="value"
           @input="$emit('update:value', $event.target.value)"
           @focus="$emit('update:focus', true)"
           @blur="$emit('update:focus', false)"
    />
    <slot></slot>
  </div>
</template>

<style scoped>
.input-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.input-box > label {
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
}

.input-box > input {
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  height: 35px;
  width: 300px;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  transition: 0.2s;
  outline: none;
  padding: 0 10px;
  letter-spacing: 1px;
}

.input-box > input:focus {
  border: 1px solid rgba(255, 255, 255, 0.8);
}
</style>
