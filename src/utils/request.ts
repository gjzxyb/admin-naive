import { merge } from '@/utils/index'
import axios from 'axios'
import QS from 'qs'
import { getTokenAUTH } from '@/utils/auth'
import { ElLoading, ElMessage } from 'element-plus'

const IS_USE_GLOBAL_MOCK = true // 是否全部用mock数据  true是  false否
const MOCK_SERVER_IP = 'http://localhost:8888/api'
// baseURL会给每个接口都加上对应前缀，而项目实际场景中，
// 存在一个前端工程，对应多个服务的场景。需要通过不用的前缀代理到不同的服务，故使用自定义prefixUrl
const DEFAULT_PREFIX_URL =
  process.env.NODE_ENV == 'development' ? 'http://dev.123dailu.com' : 'http://pro.123dailu.com'
const DEFAULT_AXIOS_CONFIG = {
  withCredentials: true, // 允许把cookie传递到后台
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 10000,
}

const contentTypes = {
  json: 'application/json; charset=utf-8',
  urlencoded: 'application/x-www-form-urlencoded; charset=utf-8',
  multipart: 'multipart/form-data',
}

const LoadingInstance = {
  _target: null, // 保存Loading实例
  _count: 0,
}
const pendingRequestMap = new Map()
const fetch = (
  url,
  {
    method = 'get',
    params = {}, // 参数，根据method封装参数形式
    axiosConfig = {}, // 自定义http配置 如responseType、headers
    prefixUrl = '', // 自定义url前缀
    repeat_request = false, // 允许重复请求
    paramsType = 'json',
    loading = true,
    loadingOptions = {
      // elementUI loading配置
      text: '动静有时，大音希声',
    },
  }
) => {
  const axiosConfigIn = merge(DEFAULT_AXIOS_CONFIG, axiosConfig)
  const instance = axios.create()
  instance.interceptors.request.use((config) => {
    config.headers.tokenId = getTokenAUTH()
    switch (method) {
      case 'get':
        config.params = params
        // 如果要在get请求设置content-Type
        if (axiosConfig?.headers?.contentType) {
          // 未设置requestData的时候源码会删掉Content-Type的设置，其这么做的原因在于是Get请求本身是不需要Content-Type的。
          config.data = true
        }
        break
      case 'post':
        config.headers['Content-Type'] =
          axiosConfig?.headers?.contentType || contentTypes[paramsType]
        // http://axios-js.com/zh-cn/docs/#%E4%BD%BF%E7%94%A8-application-x-www-form-urlencoded-format
        config.data = paramsType === 'urlencoded' ? QS.stringify(params) : params
        break
      default:
        break
    }
    if (!repeat_request) {
      removePending(config) // 重复请求相关
      addPending(config)
    }
    if (loading) {
      LoadingInstance._count++
      if (LoadingInstance._count === 1) {
        LoadingInstance._target = ElLoading.service(loadingOptions)
      }
    }
    // 移除起始部分 / 所有请求url走相对路径
    config.url = config.url.replace(/^\//, '')
    return config
  })

  instance.interceptors.response.use(
    (res) => {
      httpErrorStatusHandle(res)
      !repeat_request && removePending(res.config)
      loading && closeLoading(loading) // 关闭loading
      return Promise.resolve(res)
    },
    (error) => {
      httpErrorStatusHandle(error)
      error.config && !repeat_request && removePending(error.config)
      loading && closeLoading(loading) // 关闭loading
      return Promise.reject(error) // 错误继续返回给到具体页面
    }
  )
  return instance({
    url: IS_USE_GLOBAL_MOCK
      ? `${MOCK_SERVER_IP}/${url}`
      : `${prefixUrl}`
      ? `${prefixUrl}/${url}`
      : `${DEFAULT_PREFIX_URL}/${url}`,
    method,
    ...axiosConfigIn,
  })
}

/**
 * 处理异常
 * @param {*} error
 */
const httpErrorStatusHandle = (error) => {
  let message
  if (error?.response) {
    const msgByCode = new Map([
      [302, '接口重定向'],
      [400, '参数不正确！'],
      [401, '您未登录，或者登录已经超时，请先登录！'], // TODO跳转登录页
      [403, '您没有权限操作！'],
      // [404, `请求地址出错: ${error?.response?.config?.url}`], // 在正确域名下
      [408, '请求超时！'],
      [409, '系统已存在相同数据！'],
      [500, '服务器内部错误！'],
      [501, '服务未实现！'],
      [502, '网关错误！'],
      [503, '服务不可用！'],
      [504, '服务暂时无法访问，请稍后再试！'],
      [505, 'HTTP版本不受支持！'],
    ])
    message = msgByCode.get(error?.response?.status) || '异常问题，请联系管理员！'
  }
  if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message)
  if (error?.message?.includes('timeout')) message = '网络请求超时！'
  if (error?.message?.includes('Network'))
    message = window.navigator.onLine ? '服务端异常！' : '您断网了！'
  message &&
    ElMessage({
      type: 'error',
      message,
    })
}
/**
 * 关闭Loading层实例
 * @param {*} _options
 */
const closeLoading = (loading) => {
  if (loading && LoadingInstance._count > 0) LoadingInstance._count--
  if (LoadingInstance._count === 0) {
    LoadingInstance._target.close()
    LoadingInstance._target = null
  }
}
/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
const getPendingKey = (config) => {
  let { url, method, params, data } = config
  data = typeof data === 'object' ? JSON.stringify(data) : '' + data
  return [url, method, JSON.stringify(params), data].join('&')
}
/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
const addPending = (config) => {
  const pendingKey = getPendingKey(config)
  console.log(pendingKey, 'pendingKey')
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequestMap.has(pendingKey)) {
        pendingRequestMap.set(pendingKey, cancel)
      }
    })
}
/**
 * 删除重复的请求
 * @param {*} config
 */
const removePending = (config) => {
  const pendingKey = getPendingKey(config)
  if (pendingRequestMap.has(pendingKey)) {
    const cancelToken = pendingRequestMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingRequestMap.delete(pendingKey)
  }
}

export const get = (url, arg) => fetch(url, { ...arg, method: 'get' })
export const post = (url, arg) => fetch(url, { ...arg, method: 'post' })
