import { def } from '@vue/shared'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    }
]


// find router kita
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router