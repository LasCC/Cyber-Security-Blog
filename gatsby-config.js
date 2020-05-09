module.exports = {
  siteMetadata: {
    title: `Ludovic COULON - Cyber Security Blog`,
    name: `Ludovic COULON`,
    siteUrl: `https://ludovic-cyber-sec.web.app`,
    description: `Blog that gathers different articles about computer security and writup of challenges I've done..`,
    image: `./src/meta.png`,
    hero: {
      heading: `A place to drop off things that I find interesting and that others might enjoy...`,
      maxWidth: 680,
    },
    social: [
      {
        name: `github`,
        url: `https://github.com/LasCC`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/ludovic-coulon-b361ba183/`,
      },
      {
        name: `youtube`,
        url: `https://www.youtube.com/channel/UCkDvlI9LUuwZ4GKFUbP_Ovg`,
      },
      {
        name: `mailto`,
        url: `mailto:coulonludovicc@gmail.com`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ludovic COULON - Blog`,
        short_name: `Cyber security blog`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {},
    },
  ],
};
