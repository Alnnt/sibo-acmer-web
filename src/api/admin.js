import request from '@/util/request.js'

export function generateCdkey({ password, disposable, times, count }) {
  return request.post('/admin/generate_cdkey', {
    password,
    disposable,
    times: parseInt(times),
    count: parseInt(count)
  })
}
