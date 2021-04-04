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
          },
          {
            path: '/info-update/:id',
            meta: {
              icon: "system",
              title: '信息修改'
            },
            component: 'hr/employee-manager/info-update',
          }
        ]
      },
      {
        name: 'employee',
        path: '/employee',
        meta: {
          title: '在职员工管理',
          icon: 'system'
        },
        hidden: false,
        component: 'layout',
        children: [
          {
            path: '/search',
            component: 'hr/employee-manager/search',
            meta: {
              icon: "system",
              title: '搜索'
            }
          },
          {
            path: '',
            component: 'hr/employee-manager',
            meta: {
              icon: "system",
              title: '员工管理'
            }
          },
          {
            path: '/info-update',
            meta: {
              icon: "system",
              title: '信息修改'
            },
            component: 'hr/employee-manager/search',
          },
          {
            path: '/info-update/:id',
            hidden: true,
            meta: {
              icon: "system",
              title: '信息修改'
            },
            component: 'hr/employee-manager/info-update',
          }
        ]
      }
    ]
  }
}
