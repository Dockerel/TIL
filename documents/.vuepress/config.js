var CONST = require("./const");

module.exports = {
  title: `Today Dockerel Learned`,
  description: `Dockerel's Personal Wiki (Today I Learned)`,
  base: "/TIL/",
  dest: "build",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/logo.png",
      },
    ],
  ],
  themeConfig: {
    sidebar: [
      {
        title: "Backend",
        children: CONST.BackendList,
      },
      {
        title: "DomainDrivenArchitecture",
        children: CONST.DomainDrivenArchitectureList,
      },
      {
        title: "Java",
        children: CONST.JavaList,
      },
      {
        title: "OperatingSystem",
        children: CONST.OperatingSystemList,
      },
      {
        title: "PS",
        children: CONST.PSList,
      },
      {
        title: "Kubernetes",
        children: CONST.KubernetesList,
      },
    ],
    nav: [
      {
        text: "GitHub",
        link: "https://github.com/Dockerel/",
      },
      {
        text: "Blog",
        link: "https://dockerel.tistory.com/",
      },
    ],
  },
};
