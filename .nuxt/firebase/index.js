import createApp from './app.js'

import authService from './service.auth.js'
import databaseService from './service.database.js'

const appConfig = {"apiKey":"AIzaSyDsKl4zOr5yfcZMZ7qUBnyk20hXZTOVkCc","authDomain":"timemanagement-aed5b.firebaseapp.com","projectId":"timemanagement-aed5b","storageBucket":"timemanagement-aed5b.appspot.com","messagingSenderId":"932640212870","appId":"1:932640212870:web:079fc6010eb518c78b4e07","measurementId":"G-YFQV9JRETH"}

export default async (ctx, inject) => {
  const { firebase, session } = await createApp(appConfig, ctx)

  let servicePromises = []

  if (process.server) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
    databaseService(session, firebase, ctx, inject),

    ]
  }

  if (process.client) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
      databaseService(session, firebase, ctx, inject),

    ]
  }

  const [
    auth,
    database
  ] = await Promise.all(servicePromises)

  const fire = {
    auth: auth,
    database: database
  }

    inject('fireModule', firebase)
    ctx.$fireModule = firebase

  inject('fire', fire)
  ctx.$fire = fire
}

function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value
  if (typeof window !== "undefined" && window.$nuxt) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.$nuxt.$options[injectKey] = value
  }
}