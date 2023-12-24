<script setup>
import InputBox from "@/components/InputBox.vue";
import { reactive, ref } from "vue";
import { debounce } from "@/util/debounce.js";
import { getCdkeyStatue, listSchool } from "@/api/info.js";
import { CircleCheck, CircleClose } from "@element-plus/icons-vue";

const schoolName = ref('')
const schoolNameFocus = ref(false);



const schoolList = ref([]);

const form = reactive({
  cdkey: '',
  schoolId: ''
})

const cdkeyStatue = reactive({
  usable: null,
  description: ''
})

const handleUpdateCdkey = debounce(() => {
  if (form.cdkey === '') {
    cdkeyStatue.description = 'cdkey不能为空';
    return;
  }
  getCdkeyStatue(form).then(res => {
    cdkeyStatue.usable = res.usable;
    cdkeyStatue.description = res.description;
  }).catch(() => {
    cdkeyStatue.usable = null;
  })
}, 1000);

const handleUpdateSchoolName = debounce(() => {
  if (schoolName.value === '') return;
  listSchool(schoolName.value).then(res => {
    schoolList.value = res;
  })
}, 1000);

const handleSchoolSelected = (school) => {
  console.log(123);
  console.log(school);
  schoolName.value = school.schoolName;
  form.schoolId = school.id;
}

function handleConfirm() {

}

function handleSponsor() {

}

</script>

<template>
  <div class="box">
    <div class="form">
      <InputBox label="序列号" v-model:value="form.cdkey" @input="handleUpdateCdkey">
        <div class="cdkey-tip" v-show="!(cdkeyStatue.usable == null)">
          <CircleCheck class="cdkey-icon" v-show="cdkeyStatue.usable === true" />
          <CircleClose class="cdkey-icon" v-show="cdkeyStatue.usable === false" />
          <div>{{ cdkeyStatue.description }}</div>
        </div>
      </InputBox>
      <InputBox label="学校"
                class="input-school"
                v-model:value="schoolName"
                v-model:focus="schoolNameFocus"
                @input="handleUpdateSchoolName"
      />
      <div class="school-list" v-show="schoolNameFocus">
        <ul class="list" ref="schoolSelector">
          <li v-for="school in schoolList" :key="school.id" @click="handleSchoolSelected(school)">
            {{ school.schoolName }}
          </li>
        </ul>
      </div>
      <div class="btn-box">
        <button @click="handleConfirm">确认</button>
        <button @click="handleSponsor">赞助</button>
      </div>

    </div>
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

.input-school:focus + .school-list {
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
}

.school-list .list li:hover {
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

.btn-box> button:hover {
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
