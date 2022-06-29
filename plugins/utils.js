/* eslint-disable */
import _ from 'lodash'

export default ({ app, store }, inject) => {
  // how to use in .vue : this.$isMobile()
  inject('isMobile', () => {
    return app.vuetify.framework.breakpoint.smAndDown
  })

  inject('isIpad', () => {
    return app.$vuetify.framework.breakpoint.mdAndDown
  })

  inject('getDateTimeNews', (date, timeUnit = 'น.') => {
    const dateAndMonth = app.$moment(date).format('Do MMM')
    const year = app.$moment(date).format('YY')
    const yearThai = (Number(year) + 43).toString().substring(-2)
    const time = app.$moment(date).format('HH:mm')
    return `${dateAndMonth} ${yearThai} ${time} ${timeUnit}`
  })
}
