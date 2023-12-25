import request from '@/util/request.js'

export function getCdkeyStatue({ cdkey }) {
  return request.get('/info/cdkey', {
    params: {
      cdkey
    }
  })
}

export async function listSchool(schoolName) {
  return request.get('/info/list_school', {
    params: {
      schoolName
    }
  })
}

export function userLogin({ schoolId, studentId, password }) {
  return request.post('/info/user_login', {
    schoolId,
    studentId,
    password
  })
}

export function submit({ cdkey, classId, userId, school, studentId, username }) {
  return request.post('/info/submit', {
    cdkey,
    classId,
    userId,
    school,
    studentId,
    username
  })
}
