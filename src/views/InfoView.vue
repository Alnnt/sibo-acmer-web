<script setup>
import InputBox from '@/components/InputBox.vue'
import { reactive, ref } from 'vue'
import { debounce } from '@/util/debounce.js'
import { getCdkeyStatue, listSchool, userLogin } from '@/api/info.js'
import { CircleCheck, CircleClose } from '@element-plus/icons-vue'
import router from '@/router/index.js'
import Card from '@/components/CardBox.vue'
import { useInfoStore } from '@/stores/info.js'

const schoolName = ref('')
const schoolNameFocus = ref(false)
const schoolList = ref([])
const tip = ref('')
const form = reactive({
  cdkey: '',
  schoolId: '',
  studentId: '',
  password: '',
  userId: '',
  classId: ''
})

const cdkeyStatue = reactive({
  usable: null,
  description: ''
})

const handleUpdateCdkey = debounce(() => {
  if (form.cdkey === '') {
    cdkeyStatue.description = 'cdkey不能为空'
    return
  }
  getCdkeyStatue(form)
    .then((res) => {
      cdkeyStatue.usable = res.usable
      cdkeyStatue.description = res.description
    })
    .catch(() => {
      cdkeyStatue.usable = null
    })
}, 1000)

const handleUpdateSchoolName = debounce(() => {
  if (schoolName.value === '') return
  listSchool(schoolName.value).then((res) => {
    schoolList.value = res
  })
}, 1000)

const handleSchoolSelected = (school) => {
  schoolName.value = school.schoolName
  form.schoolId = school.id
}

/**
 * 学号密码输入
 */
const userStatue = reactive({
  usable: null,
  description: ''
})
const handleInputUser = debounce(() => {
  if (
    form.schoolId === '' ||
    form.password === '' ||
    cdkeyStatue.usable !== true ||
    form.schoolId === ''
  )
    return
  userLogin(form)
    .then((res) => {
      userStatue.usable = true
      userStatue.description = res.name
      form.userId = res.userId
      classList.value = res.classList
      if (classList.value.length > 0) {
        handleClassSelected(classList.value[0])
      }
    })
    .catch((e) => {
      userStatue.usable = false
      userStatue.description = e
    })
}, 2000)

/**
 * 班级选择
 */
const classList = ref([])
const className = ref('')
const classNameFocus = ref(false)
function handleClassSelected(clazz) {
  className.value = clazz.className + ' ' + clazz.teacherName
  form.classId = clazz.classID
}

function handleConfirm() {
  if (cdkeyStatue.usable !== true) {
    tip.value = '请检查您的序列号';
    return;
  }
  if (form.schoolId === '') {
    tip.value = '请选择学校';
    return;
  }
  if (form.schoolId === '') {
    tip.value = '请输入学号';
    return;
  }
  if (form.password === '') {
    tip.value = '请输入密码';
    return;
  }
  if (form.classId === '') {
    tip.value = '请选择班级';
    return;
  }
  useInfoStore().updateInfo(
    form.cdkey,
    form.userId,
    form.classId,
    schoolName.value,
    form.studentId,
    userStatue.description
  )
  router.push({ name: 'task' })
}

function handleSponsor() {
  window.open('https://afdian.net/a/alnnt')
}
</script>

<template>
  <Card class="box">
    <div class="form">
      <InputBox
        label="序列号"
        v-model:value="form.cdkey"
        @input="handleUpdateCdkey"
        placeholder="运行有成本，赞助以获取"
      >
        <div class="cdkey-tip" v-show="!(cdkeyStatue.usable == null)">
          <CircleCheck class="cdkey-icon" v-show="cdkeyStatue.usable === true" />
          <CircleClose class="cdkey-icon" v-show="cdkeyStatue.usable === false" />
          <div>{{ cdkeyStatue.description }}</div>
        </div>
      </InputBox>
      <InputBox
        label="学校"
        class="input-with-selector"
        v-model:value="schoolName"
        v-model:focus="schoolNameFocus"
        @input="handleUpdateSchoolName"
        placeholder="请搜索并选择您所在学校"
      />
      <div class="school-list" v-show="schoolNameFocus">
        <ul class="list">
          <li
            v-for="school in schoolList"
            :key="school.id"
            @mousedown="handleSchoolSelected(school)"
          >
            {{ school.schoolName }}
          </li>
        </ul>
      </div>
      <InputBox
        label="学号"
        v-model:value="form.studentId"
        @input="handleInputUser"
        placeholder="在此输入学号"
      >
        <div class="cdkey-tip" v-show="!(userStatue.usable == null)">
          <CircleCheck class="cdkey-icon" v-show="userStatue.usable === true" />
          <CircleClose class="cdkey-icon" v-show="userStatue.usable === false" />
          <div>{{ userStatue.description }}</div>
        </div>
      </InputBox>
      <InputBox
        label="密码"
        v-model:value="form.password"
        type="password"
        @input="handleInputUser"
        placeholder="我们不会保存您的密码"
      />
      <InputBox
        label="班级"
        class="input-with-selector"
        readonly="true"
        v-model:value="className"
        v-model:focus="classNameFocus"
        placeholder="请先完善学号与密码"
      />
      <div class="school-list" v-show="classNameFocus">
        <ul class="list">
          <li
            v-for="clazz in classList"
            :key="clazz.classID"
            @mousedown="handleClassSelected(clazz)"
          >
            {{ clazz.className + ' ' + clazz.teacherName }}
          </li>
        </ul>
      </div>

      <div class="tip">{{ tip }}</div>
      <div class="btn-box">
        <button @click="handleConfirm">确认</button>
        <button @click="handleSponsor">赞助</button>
      </div>
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

.cdkey-tip {
  margin-top: 5px;
  width: 100%;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 14px;
  color: rgba(255, 255, 0, 0.7);
}

.cdkey-icon {
  height: 15px;
}

.school-list {
  margin-top: -20px;
  margin-bottom: 20px;
  position: relative;
  width: 100%;
}

.input-with-selector:focus + .school-list {
  display: block;
}

.school-list .list {
  position: absolute;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0 0 5px 5px;
  height: auto;
  width: 100%;
  z-index: 99;
}

.school-list .list li {
  padding-left: 10px;
  cursor: pointer;
}

.school-list .list li:hover {
  background-color: skyblue;
  color: white;
}

.tip {
  margin-bottom: 10px;
  font-size: 14px;
  color: red;
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

.btn-box > button:nth-of-type(2) {
  margin-left: 10px;
  border: 1px solid rgba(214, 214, 213, 0.8);
  background: rgba(0, 162, 216, 0.5);
}

.box .btn-box > button:nth-of-type(2):hover {
  border: 1px solid rgba(214, 214, 213, 0.8);
  background: rgba(4, 125, 214, 0.5);
}
</style>
