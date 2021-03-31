module.exports = {
  theme_options: {
    standard: 'theme-standard',
    light: 'theme-light',
    dark: 'theme-dark'
  },
  role_routes: {
    'hr': [
      {
        name: 'index',
        path: '',
        hidden: false,
        component: 'layout',
        redirect: 'index',
        meta: {
          icon: "system",
          title: '首页'
        },
        children: [
          {
            path: 'index',
            component: 'hr',
            meta: {
              icon: "system",
              title: '首页'
            }
          }
        ]
      },
      {
        name: 'employee',
        path: '/employee',
        hidden: false,
        component: 'layout',
        children: [
          {
            name: 'employee-manage',
            path: '',
            component: 'hr/employee-manager',
            meta: {
              icon: "system",
              title: '员工管理'
            }
          }
        ]
      }
    ]
  }
}
