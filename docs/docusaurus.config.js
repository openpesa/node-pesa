module.exports = {
  title: 'Pesajs',
  tagline: 'Pesa SDK',
  url: 'https://openpesa.github.io/pesa-js/',
  baseUrl: '/pesa-js/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'openpesa', // Usually your GitHub org/user name.
  projectName: 'pesa-js', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Pesa SDK',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {href: 'https://openpesa.github.io/blog/', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/openpesa/pesa-js/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Quick Guide',
              to: '/',
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/openepsa',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/openpesa',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/openepssa',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://openpesa.github.io/blog/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/openpesa/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Openpesa, Org. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
        routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog:false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
