import axios, { AxiosPromise } from 'axios' // AxiosPromise类型

interface ResData<T> {
  result: T
}

interface Person {
  name: string
  age: number
  gender: string
  createdAt?: string
  updatedAt?: string
  _id?: string
}

// 新增
export function addPersonApi(params: Person): AxiosPromise<ResData<Person>> {
  return axios.post('/addPerson', params)
}

// 更新
export function updatePersonApi(params: Person): AxiosPromise<ResData<Person>> {
  return axios.post('/updatePerson', params)
}

// 查询
export function findPersonApi(params: { id: string }): AxiosPromise<ResData<Person>> {
  return axios.post('/findPerson', params)
}

// 删除
export function deletePersonApi(ids: string[]): AxiosPromise<ResData<{ deletedCount: string }>> {
  return axios.post('/deletePerson', ids)
}
