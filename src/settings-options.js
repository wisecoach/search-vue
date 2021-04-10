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
            path: '',
            component: 'hr/employee-manager',
            meta: {
              icon: "system",
              title: '员工管理'
            }
          },
          {
            path: 'detail',
            meta: {
              icon: "system",
              title: '详细信息'
            },
            component: 'hr/employee-manager/search',
          },
          {
            path: 'detail/:id',
            hidden: true,
            meta: {
              icon: "system",
              title: '详细信息'
            },
            component: 'hr/employee-manager/detail',
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
      {value: 'ATTENDANCE', label: '出勤率'},
      {value: 'PERFORMANCE', label: '绩效'},
      {value: 'ATTITUDE', label: '工作态度'},
      {value: 'ABILITY', label: '工作能力'},
      {value: 'OCCUPATION', label: '职业'},
    ],
    order_type: [
      {value: 'BIRTH', label: '年龄'},
      {value: 'DEGREE', label: '学历'},
    ]
  }
}
