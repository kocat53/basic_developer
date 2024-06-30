const BASE_URL = import.meta.env.VITE_BASE_URL
console.log('나오나?', BASE_URL)

const baseFetchOption = (method: string) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

export const postFetch = (url: string, value: any) => {
  return fetch(BASE_URL + url, { ...baseFetchOption('POST'), body: JSON.stringify(value) })
}

export const getFetch = (url: string, params: any) => {
  // 쿼리 문자열 생성
  const queryString = new URLSearchParams(params).toString()
  // URL에 쿼리 문자열 추가
  const fetchUrl = `${BASE_URL + url}?${queryString}`

  return fetch(fetchUrl, { ...baseFetchOption('GET') })
}
