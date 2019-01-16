import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Table = resolve => require(['@/views/Table'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const MolarMass = resolve => require(['@/views/MolarMass'], resolve)
const EquationBalance = resolve => require(['@/views/EquationBalance'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/table',
        component: Table
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/molar_mass',
        component: MolarMass
    },
    {
        path: '/equation_balance',
        component: EquationBalance
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
