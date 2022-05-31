import { defineStore } from 'pinia'

const state = {
  isCollapse: false,
}

export type State = typeof state

export const usestore = defineStore('main', {
  state: () => {
    return {
      isCollapse: false,
    }
  },
  // 开启持久化
  // persist: {
  //   enabled: true, // 启用
  //   strategies: [
  //     // storage 可选localStorage或sessionStorage
  //     // paths 给指定数据持久化
  //     { key: 'user', storage: localStorage, paths: ['isCollapse1'] },
  //   ],
  // },
  getters: {},
  actions: {
    setIsCollapse(State, payload) {
      State.isCollapse = payload
    },

    setUser(isCollapse, payload) {
      isCollapse.user = payload
      // setItem(USER, state.user)
    },

    setMenus(isCollapse, payload) {
      isCollapse.menus = payload
    },
  },
})
