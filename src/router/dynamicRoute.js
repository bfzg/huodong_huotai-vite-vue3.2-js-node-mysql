import users from "@/components/user/users.vue"
import individual from "@/components/individual/individual.vue";
import comments from "@/components/comments/comments.vue";
import school from "@/components/school/school.vue";
//动态路由
const manage = [
    {
        path: "/users",
        name: "users",
        component: users
    },
    {
        path:"/individual",
        name:"individual",
        component:individual
            
     
    },
    {
        path:"/comments",
        name:"comments",
        component:comments
    },
    {
        path:"/school",
        name:"school",
        component:school
    }   
]

export default manage;