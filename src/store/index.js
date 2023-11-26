import { createStore } from "vuex";

export default createStore({
  state: {
    postList: [],
  },
  getters: {
    loggedIn: state => {
      return state.activeAccount.name ? true : false;
    }
  },
  mutations: {
    setPosts: (state, posts) => {
      state.postList = posts;
    },
    setUserLoggedIn(state, payload) {
      state.user = payload;
      state.isLoggedIn = true; 
    },
    addLike: (state, postIndex) => {
      state.postList[postIndex].likes += 1;
    },
    resetLikes: state => {
      state.postList.forEach(post => post.likes = 0)
    }
  },
  actions: {
    fetchPosts: async function ({ commit }) {
      try {
          const response = await fetch("https://gist.githubusercontent.com/koodikirjutaja/eb5d36442a1ff84bde1f4aec5b41ad21/raw");
          if (response.ok) {
              const data = await response.json();
              const transformedPosts = data.Posts.map(post => {
                  if (post.image) {
                      post.image = post.image.replace('res/images', '/images');
                  }
                  if (post.pfp) {
                      post.pfp = '/' + post.pfp.replace('res/', '');
                  }
                  // Initialize likes to 0 if not already set
                  post.likes = post.likes || 0;
                  return post;
              });
              commit('setPosts', transformedPosts);
          } else {
              console.error('Error fetching posts: Response not OK');
          }
      } catch (error) {
          console.error('Error fetching posts:', error);
      }
  },
  loginAction({ commit }, payload) {
    // Perform login logic here, like an API call

    // Assuming login is successful, commit a mutation
    commit('setUserLoggedIn', payload);

    // Handle API response and errors as needed
  },
    addLikeAction: (act, postIndex) => {
      act.commit("addLike", postIndex);
    },
    resetLikesAction: act => {
      act.commit("resetLikes")
    }
  },
  modules: {},
});
