import Vue from 'vue'
import { Card, Divider, Link, Form, FormItem, Button, Select, Option, TimePicker, Slider, Scrollbar, Loading } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/zh-TW'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.use(Card)
Vue.use(Divider)
Vue.use(Link)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(TimePicker)
Vue.use(Slider)
Vue.use(Scrollbar)
Vue.use(Loading.directive);
