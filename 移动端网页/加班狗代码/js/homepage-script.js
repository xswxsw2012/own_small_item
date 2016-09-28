
var maincourse = Vue.extend({
	template: '#list1',
})
var hotcourse = Vue.extend({
	template: '#list2',
})
var coldcourse = Vue.extend({
	template: '#list3',
})
var hotwater = Vue.extend({
	template: '#list4',
})
var dessert = Vue.extend({
	template: '#list5',
})

var router = new VueRouter()

router.map({
	'/maincourse':{component: maincourse},
	'/hotcourse':{component: hotcourse},
	'/coldcourse':{component: coldcourse},
	'/hotwater':{component: hotwater},
	'/dessert':{component: dessert}
})

router.redirect({
	'/': '/maincourse'
})

var App = Vue.extend({})
router.start(App,'#idpbmiddle')