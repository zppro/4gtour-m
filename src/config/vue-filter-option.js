import moment from 'moment'
export default {
  formatDate: function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
    return moment(value).format(formatString)
  }
}
