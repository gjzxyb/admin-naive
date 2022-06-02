import { defineStore } from 'pinia'
import { IUserInfo, IMenu } from '@/api/types/common'
const state = {
  isCollapse: false,
  user: null as ({ token: string } & IUserInfo) | null,
  // user: getItem<{ token: string } & IUserInfo>(USER),
  menus: [] as IMenu[],
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
    setIsCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setUser(state: { user: any }, payload: any) {
      state.user = payload
      // setItem(USER, state.user)
    },
  },
})
