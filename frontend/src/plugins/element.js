import Vue from 'vue'
import { Form, FormItem, Button, Select, Option, TimePicker, InputNumber } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/zh-TW'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(TimePicker)
Vue.use(InputNumber)
