import en from './en'
import zh from './zh'
export default (locale, key, arg) => locale === 'zh-TW' ? zh(arg)[key] : en(arg)[key]