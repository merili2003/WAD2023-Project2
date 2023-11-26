import { createStore } from "vuex";

export default createStore({
  // State: Holds the Vuex state - the single source of truth for application data
  state: {
    postList: [], // An array to hold the list of posts
  },

  // Getters: Compute derived state based on store state. Good for calculating values
  getters: {
    // Determines if a user is logged in based on the presence of their name
    loggedIn: state => {
      return state.activeAccount.name ? true : false;
    }
  },

  // Mutations: Synchronous functions to directly mutate state
  mutations: {
    // Sets the list of posts to the Vuex state
    setPosts: (state, posts) => {
      state.postList = posts;
    },
    // Sets the user's logged-in status in the Vuex state
    setUserLoggedIn(state, payload) {
      state.user = payload;
      state.isLoggedIn = true; 
    },
    // Increments the likes count for a specific post
    addLike: (state, postIndex) => {
      state.postList[postIndex].likes += 1;
    },
    // Resets the likes for all posts
    resetLikes: state => {
      state.postList.forEach(post => post.likes = 0)
    }
  },

  // Actions: Asynchronous operations that can commit mutations
  actions: {
    // Fetches posts asynchronously and commits the mutation to update the state
    fetchPosts: async function ({ commit }) {
      try {
          const response = await fetch("https://gist.githubusercontent.com/koodikirjutaja/eb5d36442a1ff84bde1f4aec5b41ad21/raw");
          if (response.ok) {
              const data = await response.json();
              const transformedPosts = data.Posts.map(post => {
                  // Adjust image paths and ensure likes are initialized
                  if (post.image) {
                      post.image = post.image.replace('res/images', '/images');
                  }
                  if (post.pfp) {
                      post.pfp = '/' + post.pfp.replace('res/', '');
                  }
                  post.likes = post.likes || 0; // Initialize likes
                  return post;
              });
              commit('setPosts', transformedPosts); // Commit the posts to the state
          } else {
              console.error('Error fetching posts: Response not OK');
          }
      } catch (error) {
          console.error('Error fetching posts:', error);
      }
  },
  // Commits a mutation to update the user's logged-in status
  loginAction({ commit }, payload) {
    commit('setUserLoggedIn', payload);
  },
  // Action to commit the addLike mutation
  addLikeAction: (act, postIndex) => {
    act.commit("addLike", postIndex);
  },
  // Action to commit the resetLikes mutation
  resetLikesAction: act => {
    act.commit("resetLikes")
  }
  },
  modules: {}, // Modules allow you to divide your store into modules
});
