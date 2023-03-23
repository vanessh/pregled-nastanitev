const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        //C:\Users\vanes\Desktop\Praksa\pregled-nastanitev\Pregled nastanitev\src\pages\CurrencyListPage.vue
        component: () => import("src/pages/CurrencyListPage.vue"),
        name: "CurrencyList"
      },
      {
        path: "/accommodations",
        component: () => import("src/pages/AccommodationsPage.vue"),
        name: "AccommodationsPage"
      }

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
