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
        children: [
          {
            path: 'index',
            component: 'hr',
            meta: {
              icon: "system",
              title: '首页'
            }
          },
        ]
      },
      {
        name: 'employee',
        path: '/employee',
        meta: {
          title: '员工管理',
          icon: 'system'
        },
        hidden: false,
        component: 'layout',
        children: [
          {
            path: 'search',
            component: 'hr/employee/search',
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
                  title: '个人信息'
                },
                component: 'hr/employee/search',
              },
              {
                path: 'career',
                meta: {
                  icon: "system",
                  title: '经历信息'
                },
                component: 'hr/employee/search',
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
                  title: '个人信息'
                },
                component: 'hr/employee/detail'
              },
              {
                path: 'career/:carid',
                hidden: true,
                meta: {
                  icon: "system",
                  title: '经历信息'
                },
                component: 'hr/employee/career',
              },
            ]
          },
          {
            path: 'info-update',
            meta: {
              icon: "system",
              title: '信息修改'
            },
            component: 'hr/employee/search',
          },
          {
            path: 'info-update/:id',
            hidden: true,
            meta: {
              icon: "system",
              title: '信息修改'
            },
            component: 'hr/employee/info-update',
          },
          {
            path: 'evaluate',
            meta: {
              title: '评价',
              icon: 'system'
            },
            component: 'hr/employee/search'
          },
          {
            path: 'evaluate/:id',
            hidden: true,
            meta: {
              title: '评价',
              icon: 'system'
            },
            component: 'hr/employee/evaluate'
          },
        ]
      },
      {
        name: 'recruit',
        path: '/recruit',
        meta: {
          title: '招聘管理',
          icon: 'system'
        },
        children: [
          {
            path: 'search',
            meta: {
              title: '搜索',
              icon: 'system'
            }
          },
          {
            path: 'hire',
            meta: {
              title: '录用',
              icon: 'system'
            }
          },
          {
            path: 'hire/:id',
            hidden: true,
            meta: {
              title: '录用',
              icon: 'ststem'
            }
          }
        ]
      }
    ],
    'manager': [
      {
        name: 'index',
        path: '',
        hidden: false,
        component: 'layout',
        redirect: 'index',
        children: [
          {
            path: 'index',
            meta: {
              icon: "system",
              title: '首页'
            }
          },
        ]
      },
      {
        path: '/employee',
        meta: {
          icon: 'system',
          title: '员工管理'
        },
        component: "layout",
        children: [
          {
            path: 'search',
            meta: {
              icon: 'system',
              title: '搜索'
            }
          },
          {
            path: 'attendance',
            meta: {
              icon: 'system',
              title: '考勤'
            }
          },
          {
            path: 'attendance/:id',
            hidden: true,
            meta: {
              icon: 'system',
              title: '考勤'
            }
          },
          {
            path: 'performance',
            meta: {
              icon: 'system',
              title: '业绩'
            }
          },
          {
            path: 'performance/:id',
            hidden: true,
            meta: {
              icon: 'system',
              title: '业绩'
            }
          },
          {
            path: 'evaluate',
            meta: {
              icon: 'system',
              title: '评价'
            }
          },
          {
            path: 'evaluate/:id',
            hidden: true,
            meta: {
              icon: 'system',
              title: '评价'
            }
          },
        ],
      }
    ],
    'enterprise': [
      {
        name: 'index',
        path: '',
        hidden: false,
        component: 'layout',
        redirect: 'index',
        children: [
          {
            path: 'index',
            meta: {
              icon: "system",
              title: '首页'
            }
          },
        ]
      },
      {
        path: '/employee',
        component: 'layout',
        meta: {
          icon: 'system',
          title: '员工管理'
        },
        children: [
          {
            path: 'hr',
            meta: {
              icon: "system",
              title: "HR"
            }
          },
          {
            path: 'manager',
            meta: {
              icon: "system",
              title: "部门主管"
            }
          }
        ]
      },
      {
        path: "/department",
        hidden: false,
        component: "layout",
        children: [
          {
            path: '',
            meta: {
              icon: "system",
              title: '部门管理'
            }
          }
        ]
      }
    ]
  },
  search_options: {
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
    search_recruit_options: {
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
  },
  role_name_mapper: {
    "ROLE_HR": "hr",
    "ROLE_MANAGER": "manager",
    "ROLE_ENTERPRISE": "enterprise",
    "ROLE_ANONYMOUS": null
  }
}
