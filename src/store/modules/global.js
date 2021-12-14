const state = {
  project: {
    name: 'tradingradar.net',
    copyright: '2021',
    mobile: 768,
    cookiePolicy: {
      compareAfter: 3000,
      duration: 120,
      name: 'tradingradar-cookie-policy'
    }
  },
  author: {
    name: 'Marco',
    surname: 'Pavan',
    email: 'marcopavan.mp@gmail.com'
  },
  socials: [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com',
      class: 'icon-facebook2'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com',
      class: 'icon-linkedin'
    }
  ]
}

const getters = {
  getProject () { return state.project },
  getAuthor () { return state.author },
  getSocials () { return state.socials }
}

const mutations = {
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
