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
        path: '',
        hidden: false,
        component: 'layout',
        redirect: 'index',
        children: [
          {
            path: 'index',
            component: 'hr',
            meta: {
              icon: "home",
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
          icon: 'peoples'
        },
        hidden: false,
        component: 'layout',
        children: [
          {
            path: 'search',
            component: 'hr/employee/search',
            meta: {
              icon: "search",
              title: '搜索'
            }
          },
          {
            path: 'detail',
            meta: {
              icon: "document",
              title: '档案'
            },
            component: 'parent-view',
            children: [
              {
                path: '',
                meta: {
                  icon: "detail",
                  title: '详细信息'
                },
                component: 'hr/employee/search',
              },
              {
                path: 'career',
                meta: {
                  icon: "career",
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
              icon: "document",
              title: '档案'
            },
            component: 'parent-view',
            children: [
              {
                path: '',
                hidden: true,
                meta: {
                  icon: "detail",
                  title: '详细信息'
                },
                component: 'common/employee/detail'
              },
              {
                path: 'career/:carid',
                hidden: true,
                meta: {
                  icon: "system",
                  title: '经历信息'
                },
                component: 'common/employee/career',
              },
            ]
          },
          {
            path: 'info-update',
            meta: {
              icon: "edit",
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
              icon: 'message'
            },
            component: 'hr/employee/search'
          },
          {
            path: 'evaluate/:id',
            hidden: true,
            meta: {
              title: '评价',
              icon: 'message'
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
          icon: 'recruit'
        },
        component: 'layout',
        children: [
          {
            path: 'search',
            meta: {
              title: '搜索',
              icon: 'search'
            },
            component: 'hr/recruit/search'
          },
          {
            path: 'detail',
            meta: {
              icon: "document",
              title: '档案'
            },
            component: 'parent-view',
            children: [
              {
                path: '',
                meta: {
                  icon: "detail",
                  title: '详细信息'
                },
                component: 'hr/recruit/search',
              },
              {
                path: 'career',
                meta: {
                  icon: "career",
                  title: '经历信息'
                },
                component: 'hr/recruit/search',
              },
            ]
          },
          {
            path: 'detail/:id',
            hidden: true,
            meta: {
              icon: "document",
              title: '档案'
            },
            component: 'parent-view',
            children: [
              {
                path: '',
                hidden: true,
                meta: {
                  icon: "detail",
                  title: '详细信息'
                },
                component: 'common/employee/detail'
              },
              {
                path: 'career/:carid',
                hidden: true,
                meta: {
                  icon: "system",
                  title: '经历信息'
                },
                component: 'common/employee/career',
              },
            ]
          },
          {
            path: 'hire',
            meta: {
              title: '录用',
              icon: 'hire'
            },
            component: 'hr/employee/search'
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
              icon: "home",
              title: '首页'
            }
          },
        ]
      },
      {
        path: '/employee',
        meta: {
          title: '员工管理',
          icon: 'peoples'
        },
        component: "layout",
        children: [
          {
            path: 'search',
            meta: {
              icon: 'search',
              title: '搜索'
            }
          },
          {
            path: 'detail',
            meta: {
              icon: "document",
              title: '档案'
            },
            component: 'parent-view',
            children: [
              {
                path: '',
                meta: {
                  icon: "detail",
                  title: '详细信息'
                },
                component: 'hr/employee/search',
              },
              {
                path: 'career',
                meta: {
                  icon: "career",
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
              icon: "document",
              title: '档案'
            },
            component: 'parent-view',
            children: [
              {
                path: '',
                hidden: true,
                meta: {
                  icon: "detail",
                  title: '详细信息'
                },
                component: 'common/employee/detail'
              },
              {
                path: 'career/:carid',
                hidden: true,
                meta: {
                  icon: "system",
                  title: '经历信息'
                },
                component: 'common/employee/career',
              },
            ]
          },
          {
            path: 'attendance',
            meta: {
              icon: 'attendance',
              title: '考勤'
            }
          },
          {
            path: 'attendance/:id',
            hidden: true,
            meta: {
              icon: 'attendance',
              title: '考勤'
            }
          },
          {
            path: 'performance',
            meta: {
              icon: 'performance',
              title: '业绩'
            }
          },
          {
            path: 'performance/:id',
            hidden: true,
            meta: {
              icon: 'performance',
              title: '业绩'
            }
          },
          {
            path: 'evaluate',
            meta: {
              icon: 'message',
              title: '评价'
            }
          },
          {
            path: 'evaluate/:id',
            hidden: true,
            meta: {
              icon: 'message',
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
          icon: 'peoples',
          title: '员工管理'
        },
        children: [
          {
            path: 'hr',
            meta: {
              icon: "hr",
              title: "HR"
            }
          },
          {
            path: 'manager',
            meta: {
              icon: "manager",
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
              icon: "tree",
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
