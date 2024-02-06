const sidebarList =  [
  {
    text: '指南',
    items: [
      {
        text: '介绍',
        link: '/guide/'
      },
      {
        text: '演示',
        link: '/guide/show'
      }
    ]
  },
  {
    text: '组件',
    items: [
      {
        text: 'DragArea',
        link: '/basicComponents/DragArea'
      },
      {
        text: 'DragElem',
        link: '/basicComponents/DragElem'
      },
      {
        text: 'DropArea',
        link: '/basicComponents/DropArea'
      }
    ]
  }
]

export const config = {
  title: 'Drag&Drop Transformer',
  description: '工具栏元素拖放至画布后，赋予其可自定义的丰富功能',
  head: [['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }]],
  themeConfig: {
    logo: '/images/logo.svg',
    algolia: {
      apiKey: 'your_api_key',
      indexName: 'index_name'
    },
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/basicComponents/DragArea' }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/vangleer' }],
    sidebar: {
      '/guide/': sidebarList,
      '/basicComponents/': sidebarList
    }
  }
}

export default config
