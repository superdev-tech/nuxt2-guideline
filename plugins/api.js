/* eslint-disable no-console */
import axios from 'axios'
import qs from 'qs'

const Func = {
  getInstance({ method, url, data, accessToken, isForm }) {
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    if (isForm) {
      headers = {}
    }

    const instance = {
      method,
      url,
      headers,
    }
    if (accessToken) {
      instance.headers.Authorization = `Bearer ${accessToken}`
    }

    if (method.toUpperCase() === 'GET') {
      instance.params = data || null
    } else if (isForm) {
      instance.data = data
    } else {
      instance.data = data ? qs.stringify(data) : null
      console.log({ ins: instance.data })
    }
    return instance
  },
  setToken({ app, access }) {
    if (access) {
      app.$cookiz.set('access_token', access)
    }
  },
}

// how to use in .vue : this.$api({ method, path, data, isForm })
export default ({ app, store }, inject) => {
  inject('api', async ({ method, path, data, isForm }) => {
    if (!process.server) {
      store._vm.$nextTick(() => {
        store._vm.$nuxt.$loading.start()
      })
    }

    const accessToken = app.$cookiz.get('access_token')
    const url = app.$config.api.url + path
    const mainInstance = Func.getInstance({
      method,
      url,
      data,
      accessToken,
      isForm,
    })
    let result = null
    try {
      const mainRes = await axios(mainInstance)
      result = { ...mainRes.data }
    } catch (mainCatch) {
      result = { ...mainCatch.data }
    }

    return new Promise((resolve) => {
      if (!process.server) {
        store._vm.$nextTick(() => {
          store._vm.$nuxt.$loading.finish()
        })
      }
      resolve(result)
    })
  })

  inject('login', async ({ username, password }) => {
    const instance = Func.getInstance({
      method: 'post',
      url: `${app.$config.api.url}/token/`,
      data: { username, password },
    })

    let result = null
    try {
      const loginRes = await axios(instance)
      result = {
        ok: true,
        status: loginRes.status,
        message: loginRes.statusText,
        result: loginRes.data,
      }

      if (result.status === 200) {
        Func.setToken({
          app,
          access: loginRes.data.access,
        })
      }
    } catch ({ response }) {
      result = {
        ok: false,
        status: response.status,
        message: response.statusText,
        result: response.data,
      }
    }

    console.log({ result })

    return new Promise((resolve) => {
      resolve(result)
    })
  })

  inject('logout', () => {
    app.$cookiz.removeAll()
    window.location.href = '/'
  })
}
