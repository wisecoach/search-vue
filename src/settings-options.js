module.exports = {
  theme_options: {
    standard: 'theme-standard',
    light: 'theme-light',
    dark: 'theme-dark'
  },
  chart_theme_options: {
    'theme-standard': 'macarons2',
    'theme-light': 'macarons2',
    'theme-dark': 'dark',
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
            path: 'search',
            component: 'hr/employee-manager/search',
            meta: {
              icon: "system",
              title: '搜索'
            }
          },
          {
            path: 'detail',
            meta: {
              icon: "system",
              title: '详细信息'
            },
            component: 'parent-view',
            children: [
              {
                path: '',
                meta: {
                  icon: "system",
                  title: '全部信息'
                },
                component: 'hr/employee-manager/search',
              },
              {
                path: 'career',
                meta: {
                  icon: "system",
                  title: '经历信息'
                },
                component: 'hr/employee-manager/search',
              },
            ]
          },
          {
            path: 'detail/:id',
            hidden: true,
            meta: {
              icon: "system",
              title: '详细信息'
            },
            component: 'parent-view',
            children: [
              {
                path: '',
                hidden: true,
                meta: {
                  icon: "system",
                  title: '详细信息'
                },
                component: 'hr/employee-manager/detail'
              },
              {
                path: 'career/:carid',
                hidden: true,
                meta: {
                  icon: "system",
                  title: '经历信息'
                },
                component: 'hr/employee-manager/career',
              },
            ]
          },
          {
            path: 'info-update',
            meta: {
              icon: "system",
              title: '信息修改'
            },
            component: 'hr/employee-manager/search',
          },
          {
            path: 'info-update/:id',
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
  },
  search_employee_options: {
    key_type: [
      {value: "NAME", label: "姓名"},
      {value: "MAJOR", label: "专业"},
      {value: "DEPARTMENT", label: "部门"},
    ],
    filter_type: [
      {value: 'BIRTH', label: '年龄'},
      {value: 'GENDER', label: '性别'},
      {value: 'SENIORITY', label: '工龄'},
      {value: 'DEGREE', label: '学历'},
      {value: 'OCCUPATION', label: '职业'},
    ],
    order_type: [
      {value: 'BIRTH', label: '年龄'},
      {value: 'DEGREE', label: '学历'},
    ]
  },
  role_name_mapper: {
    "ROLE_HR": "hr",
    "ROLE_MANAGER": "manager",
    "ROLE_ENTERPRISE": "enterprise",
    "ROLE_ANONYMOUS": null
  }
}
