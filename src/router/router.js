function pages(page) {
    return () => import(`@pages/${page}.vue`);
}

function views(page) {
    return () => import(`@views/${page}.vue`);
}

const routes = [
    {
        path: "/",
        redirect: "./datasource"
    },
    {
        path: "/datasource",
        name: "datasource",
        component: pages("DataSource")
    },
    {
        path: "/synchrotasks",
        name: "synchrotasks",
        component: pages("SynchroTasks")
    }
];

export default routes;
