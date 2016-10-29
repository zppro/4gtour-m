export const password = {
  messages: {
    en: field => `The ${field} must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`,
    zh_CN: field => `${field} 必须包含至少：一个小写字符，一个数字，一个特殊字符（比如：. _ & ? 等等）`
  },
  validate: value => {
    var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})')
    return strongRegex.test(value)
  }
}

export const chinesePhone = {
  messages: {
    en: field => `The ${field} must contain match chinese phone format`,
    zh_CN: field => `${field} 必须是一个有效的手机号码 `
  },
  validate: value => {
    var chinesePhoneRegex = new RegExp('^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$')
    return chinesePhoneRegex.test(value)
  }
}
