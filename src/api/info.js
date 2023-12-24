import request from "@/util/request.js";

export function getCdkeyStatue({ cdkey }) {
  return request.get('/info/cdkey', {
    params: {
      cdkey
    }
  });
}

export async function listSchool(schoolName) {
  return request.get('/info/list_school', {
    params: {
      schoolName
    }
  });
}
