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
              component: 'hr/emplyee-manager',
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
