import { defineStore } from 'pinia'

export const usestore = defineStore('main', {
  state: () => {
    return {
      isCollapse: false,
    }
  },
  // 开启持久化
  persist: {
    enabled: true, // 启用
    strategies: [
      // storage 可选localStorage或sessionStorage
      // paths 给指定数据持久化
      { key: 'user', storage: localStorage, paths: ['token', 'userInfo'] },
    ],
  },
  getters: {},
  actions: {},
})
