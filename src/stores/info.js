import { defineStore } from 'pinia'

export const useInfoStore = defineStore('info', () => {
  const info = {
    cdkey: '',
    classId: '',
    userId: '',
    school: '',
    studentId: '',
    username: ''
  }
  function updateInfo(newCdkey, newUserId, newClassId, newSchool, newStudentId, newUsername) {
    info.cdkey = newCdkey
    info.userId = newUserId
    info.classId = newClassId
    info.school = newSchool
    info.studentId = newStudentId
    info.username = newUsername
  }

  return { info, updateInfo }
})
