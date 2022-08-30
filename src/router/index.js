import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import EventDetails from "../views/event/Details.vue";
import EventRegister from "../views/event/Register.vue";
import EventEdit from "../views/event/Edit.vue";
import EventLayout from "../views/event/Layout.vue";
import NotFound from "../views/NotFound.vue";
import NetworkError from "../views/NetworkError.vue";
import NProgress from "nprogress";
import EventService from "@/services/EventService";
import GStore from "@/store";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page || 1) }),
  },
  {
    path: "/about-us",
    name: "About",
    alias: "/about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },

  {
    path: "/events/:id",
    name: "EventLayout",
    component: EventLayout,
    props: true,
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
        meta: {
          requireAuth: true,
        },
      },
    ],
    beforeEnter: async (to) => {
      try {
        const response = await EventService.getEvent(to.params.id);
        GStore.event = response.data;
      } catch (error) {
        if (error.response && error.response.status == 404) {
          return {
            // <--- Return
            name: "404Resource",
            params: { resource: "event" },
          };
        } else {
          return { name: "NetworkError" }; // <--- Return
        }
      }
    },
  },

  {
    path: "/event/:afterEvent(.*)",
    redirect: (to) => {
      return { path: `/events/${to.params.afterEvent}` };
    },
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    redirect: () => {
      return {
        name: "404Resource",
        params: {
          resource: "page",
        },
      };
    },
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

router.beforeEach((to, from) => {
  NProgress.start();
  const notAuthorized = true;
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = "Sorry, you are not authorized to view this page";

    setTimeout(() => {
      GStore.flashMessage = "";
    }, 3000);

    if (from.href) {
      // <--- If this navigation came from a previous page.
      return false;
    } else {
      // <--- Must be navigating directly
      return { path: "/" }; // <--- Push navigation to the root route.
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
