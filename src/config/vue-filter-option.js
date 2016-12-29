import moment from 'moment'
export default {
  formatDate: function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
    return moment(value).format(formatString)
  },
  humanizeDateExtractly: function (value) {
    let m = moment(value)
    let now = moment()
    let diffYears = Math.abs(m.diff(now, 'years')) > 0
    if (diffYears > 0) {
      return m.format('YYYY-MM-DD HH:mm')
    } else {
      let diffDays = m.diff(now, 'days')
      if (diffDays < 0) {
        // 之前的日子人性化
        if (diffDays === -1) {
          return '昨天' + m.format('HH:mm')
        } else if (diffDays === -2) {
          return '前天' + m.format('HH:mm')
        } else {
          return m.format('MM-DD HH:mm')
        }
      } else if (diffDays > 0) {
        // 将来的日子人性化
        if (diffDays === 1) {
          return '明天' + m.format('HH:mm')
        } else if (diffDays === 2) {
          return '后天' + m.format('HH:mm')
        } else {
          return m.format('MM-DD HH:mm')
        }
      } else {
        return '今天' + m.format('HH:mm')
      }
    }
  },
  humanizeDate: function (value) {
    let m = moment(value)
    let now = moment()
    if (!m.isSame(now, 'year')) {
      return m.format('YYYY-MM-DD HH:mm')
    } else {
      let yesterday = moment().add(-1, 'days')
      let theDayBeforeYesterday = moment().add(-2, 'days')
      let tomorow = moment().add(1, 'days')
      let theDayAfterTomorow = moment().add(2, 'days')
      if (m.isSame(now, 'day')) {
        return '今天' + m.format('HH:mm')
      } else if (m.isSame(yesterday, 'day')) {
        return '昨天' + m.format('HH:mm')
      } else if (m.isSame(theDayBeforeYesterday, 'day')) {
        return '前天' + m.format('HH:mm')
      } else if (m.isSame(tomorow, 'day')) {
        return '明天' + m.format('HH:mm')
      } else if (m.isSame(theDayAfterTomorow, 'day')) {
        return '后天' + m.format('HH:mm')
      } else {
        return m.format('MM-DD HH:mm')
      }
    }
  }
}
