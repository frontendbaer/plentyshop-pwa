export const appConfiguration = {
  head: {
    viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
    htmlAttrs: {
      lang: process.env.DEFAULTLANGUAGE ?? 'en',
    },
    meta: [
      { name: 'shop-name', content: process.env.STORENAME || 'PlentyONE GmbH' },
      { name: 'description', content: process.env.METADESC || 'Demo shop for plentyShop PWA' },
      { name: 'keywords', content: process.env.METAKEYWORDS || 'PlentyONE, plentyshop, pwa' },
      { name: 'theme-color', content: '#0C7992' },
      { property: 'og:title', content: process.env.OGTITLE || 'plentyShop PWA Demo' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: process.env.OGIMAGE || '' },
      { property: 'og:url', content: process.env.API_ENDPOINT },
    ],
    link: [
      { rel: 'icon', href: '/_nuxt-plenty/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/_nuxt-plenty/favicon.ico' },
    ],
    title: process.env.STORENAME || 'plentyShop PWA',
  },
};
