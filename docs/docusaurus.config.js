module.exports = {
    title: 'Pesajs',
    tagline: 'Pesa SDK',
    url: 'https://openpesa.github.io/pesa-js/',
    baseUrl: '/node-pesa/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'openpesa',
    projectName: 'pesa-js',
    themeConfig: {
        navbar: {
            title: 'Pesa SDK',
            logo: {
                alt: 'My Site Logo',
                src: 'img/logo.svg',
            },
            items: [
                { href: 'https://openpesa.github.io/blog/', label: 'Blog', position: 'left' },
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
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Stack Overflow',
                            href: 'https://stackoverflow.com/questions/tagged/openpesa',
                        },
                        {
                            label: 'Telegram',
                            href: 'https://t.me/openpesa',
                        },
                        {
                            label: 'Twitter',
                            href: 'https://twitter.com/openepesa',
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
                    editUrl: 'https://github.com/openpesa/pesa-js/edit/main/',
                },
                blog: false,
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
};
