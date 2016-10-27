export default {
  type: 'day',
  week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  format: 'YYYY-MM-DD',
  placeholder: '您的出行日期',
  inputStyle: {
    'display': 'inline-block',
    'padding': '0.1rem',
    'width': '8rem',
    'line-height': '1.29rem',
    'font-size': '0.935rem',
    'border': 'none',
    'color': '#5F5F5F'
  },
  color: {
    header: '#ccc',
    headerText: '#f00'
  },
  buttons: {
    ok: '确定',
    cancel: '取消'
  },
  overlayOpacity: 0.5, // 0.5 as default
  dismissible: true // as true as default
}
