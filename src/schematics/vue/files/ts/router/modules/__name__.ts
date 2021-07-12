const meta = {
  module: "<%= lowerCase(name) %>"
};

export default [
  {
    path: `/<%= lowerCase(name) %>`,
    redirect: "/<%= lowerCase(name) %>/page/1"
  },
  {
    path: `/<%= lowerCase(name) %>/page`,
    redirect: "/<%= lowerCase(name) %>/page/1"
  },
  {
    path: `/<%= lowerCase(name) %>/page/:page`,
    name: "<%= lowerCase(name) %>",
    component: () =>
      import(
        /* webpackChunkName: "<%= lowerCase(name) %>" */ "@/modules/<%= lowerCase(name) %>/views/index.vue"
      ),
    meta: {
      ...meta
    }
  },
  {
    path: `/<%= lowerCase(name) %>/create`,
    name: "<%= lowerCase(name) %>/create",
    component: () =>
      import(
        /* webpackChunkName: "<%= lowerCase(name) %>/create" */ "@/modules/<%= lowerCase(name) %>/views/create.vue"
      ),
    meta: {
      ...meta,
      action: "create"
    }
  },
  {
    path: `/<%= lowerCase(name) %>/edit/:id`,
    name: "<%= lowerCase(name) %>/edit",
    component: () =>
      import(
        /* webpackChunkName: "<%= lowerCase(name) %>/edit" */ "@/modules/<%= lowerCase(name) %>/views/edit.vue"
      ),
    meta: {
      ...meta,
      action: "edit"
    }
  }
];
