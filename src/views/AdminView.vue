<script setup>
import Card from '@/components/CardBox.vue'
import InputBox from '@/components/InputBox.vue'
import { reactive, ref } from 'vue'
import { generateCdkey } from '@/api/admin.js'

const form = reactive({
  password: '',
  disposable: '',
  times: '',
  count: ''
})

/* 一次性/规律选择器 */
const disposableList = ref([
  {
    type: true,
    title: '一次性'
  },
  {
    type: false,
    title: '规律'
  }
])
const disposable = ref('')
const disposableFocus = ref(false)

function handleDisposableSelected(item) {
  form.disposable = item.type
  disposable.value = item.title
}

/* 确认 */
function handleConfirm() {
  generateCdkey(form).then(res => {
    res.forEach(value => {
      cdkeyRow.value += value.cdkey + '\n';
    })
    cdkeyRowVisible.value = true;
  })
}

/* 生成的序列号回显 */
const cdkeyRow = ref('')
const cdkeyRowVisible = ref(false)

</script>

<template>
  <Card class="box">
    <div class="form">
      <InputBox
        label="密码"
        v-model:value="form.password"
        placeholder="管理员密码"
      />
      <InputBox
        label="类型"
        class="input-with-selector"
        readonly="true"
        v-model:value="disposable"
        v-model:focus="disposableFocus"
        placeholder="请选择序列号类型"
      />
      <div class="disposable-selector" v-show="disposableFocus">
        <ul class="list">
          <li
            v-for="disposable in disposableList"
            :key="disposable.type"
            @mousedown="handleDisposableSelected(disposable)"
          >
            {{ disposable.title }}
          </li>
        </ul>
      </div>
      <InputBox
        label="频率"
        v-model:value="form.times"
        type="number"
        placeholder="一次性篇数/可用周数"
      />
      <InputBox
        label="数量"
        v-model:value="form.count"
        type="number"
        placeholder="生成序列号的数量"
      />
      <div class="btn-box">
        <button @click="handleConfirm">确认</button>
      </div>
      <textarea v-show="cdkeyRowVisible" v-model="cdkeyRow"></textarea>
    </div>
  </Card>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-box {
  margin-bottom: 20px;
}

.disposable-selector {
  margin-top: -20px;
  margin-bottom: 20px;
  position: relative;
  width: 100%;
}

.input-with-selector:focus + .disposable-selector {
  display: block;
}

.disposable-selector .list {
  position: absolute;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0 0 5px 5px;
  height: auto;
  width: 100%;
  z-index: 99;
}

.disposable-selector .list li {
  padding-left: 10px;
  cursor: pointer;
}

.disposable-selector .list li:hover {
  background-color: skyblue;
  color: white;
}

.btn-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: start;
}

.btn-box > button {
  width: 100px;
  height: 32px;
  border: 1px solid rgba(197, 81, 58, 0.8);
  background: rgba(197, 81, 58, 0.5);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  transition: 0.2s;
}

.btn-box > button:hover {
  border: 1px solid rgba(248, 108, 76, 0.8);
  background: rgba(248, 108, 76, 0.5);
}

textarea {
  width: 100%;
  margin-top: 15px;
}
</style>
