import { createPinia } from 'pinia'
import PiniaPluginPersist from 'pinia-plugin-persist'

const pinia = createPinia()
// 持久化插件
pinia.use(PiniaPluginPersist)

export default pinia
