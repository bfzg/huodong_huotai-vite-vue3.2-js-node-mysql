import { createRouter, createWebHashHistory  } from "vue-router";
import home from "@/view/home.vue";
import login from "@/view/login.vue";
import welcome from "@/components/welcome.vue";
// import users from "@/components/user/users.vue"
// import individual from "@/components/individual/individual.vue";
// import comments from "@/components/comments/comments.vue";
// import school from "@/components/school/school.vue";
const routes = [
    { path: "/", redirect: "/login" },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        name: 'home',
        path: '/home',
        component: home,
        redirect:"/welcome",
        children:[
            {
                path:"/welcome",
                name:"welcome",
                component:welcome
            },
            // {
            //     path: "/users",
            //     name: "users",
            //     component: users
            // },
            // {
            //     path:"/individual",
            //     name:"individual",
            //     component:individual
                    
             
            // },
            // {
            //     path:"/comments",
            //     name:"comments",
            //     component:comments
            // },
            // {
            //     path:"/school",
            //     name:"school",
            //     component:school
            // }   
        ]
    },
   
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})


//全局路由守卫

router.beforeEach((to, from, next) => {
    if (to.path == "/login") {
        next();
        return;
    }
    //获取token
    const tokenStr = JSON.parse(window.sessionStorage.getItem('token'));
    if (!tokenStr) return next('/login');
    next();
})

//TODO 难点动态路由刷新后会丢失 2023-3-11 没解决


export default router