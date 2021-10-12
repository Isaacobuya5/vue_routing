import { createApp } from 'vue';
import { createRouter, createWebHistory, onBeforeRouteLeave} from "vue-router"

import App from './App.vue';
import TeamList from "./components/teams/TeamsList.vue";
import UsersList from "./components/users/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue"
const router = createRouter({
    history: createWebHistory(), // use built in history mechanism
    routes: [
        {
            path: '/',
            redirect: '/teams'
        },
        {
            name: 'teams',
            path: '/teams',
            component: TeamList,
            // children: [ // nested routes
            //     {
            //         path: ':teamId',
            //         component: TeamMembers,
            //         // props:true ells vue that dynamic parts e.g. teamId should be passed as props -> makes it more reusable
            //     },
            // ]
            // alias: '/'
            // components: {
                // default: TeamList, <router-view></router-view>
                // footer: TeamsFooter
            // } <router-view name="footer"></router-view> - render multiple routes on the same level
        },
        {
            path: '/users',
            component: UsersList
        },
        {
            name: 'team-members',
            path: '/teams/:teamId',
            component: TeamMembers,
            // props:true ells vue that dynamic parts e.g. teamId should be passed as props -> makes it more reusable
        },
        {
            path: '/:notFound(.*)',
            redirect: '/teams'
        }
    ],
    // linkActiveClass: 'router-link-active'
    scrollBehavior(to, from, savedPosition) {
        //to and from are route objects
        // scroll position i had when i left the page previously
        if (savedPosition) {
            return savedPosition
        }
        return {left: 0, top: 0}
        // console.log(to, from, savedPosition)
    }
});

const app = createApp(App)

router.beforeEach(function(to, from, next) {
    console.log("Global for each")
    console.log(to, from);
    //passing false to next cancels navigation
    // we can also pass a string we want to navigate to e.g navigation
    // if (to.name === 'team-members') {
        // next();
// } else {
    // next({name: 'team-members',params: { teamId: 't2' }})}})
    //}

    next();

})

// adding to a single route
// {
//     path: '/users',
//     components: {
//         default: UsersList,
//         footer: UsersFooter
//     },
//     beforeEnter(to, from , next) {
//         next();
//     }
// }

// can also be done in the component itself
{/* <script>
    beforeRouteEnter(to, from, next) { 
        next();
    }

    beforeRouteUpdate(to, from, next) { // called whenever this component is about to be reused as aresult of change in route
        next()
        // can be used as an alternative to watch
    }
</script> */}

//router.afterEach(to, from) { // runs once navigation has been confirmed
    // could be good for sending analytics and logging
    
// }

// guard triggered when user wants to leave the page
//we could use unmounted() as an alternative but runs after navigation has been confirmed thus we can cancel navigation
// e.g. maybe we want to warn user of unsaved changes before they leave the page
// beforeRouteLeave(to, from, next) { // use as a hook in a component
// if (this.savedChanges) {
//     next();
// } else {
//     const userWntsToLeave = confirm("Are us sure you want to leave")
//     next(userWntsToLeave)
// }
// }

// using route meta fields
// {
//     name: 'teams',
//     path: '/teams',
//     meta: {
//         needsAuth: true
//     }
// }

// router.beforeEach(to, from, next) {
//     if (to.meta.needsAuth) {
//         // if auth
//         next();
//     } else {
//         // perform action
//     }
// }
// organize your work
//pages
//components
// router.js
app.use(router)

app.mount('#app');
