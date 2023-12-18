import { createStore } from "vuex";

export default createStore({
  // State: Holds the Vuex state - the single source of truth for application data
  state: {
    postList: [], // An array to hold the list of posts
  },

  // Getters: Compute derived state based on store state. Good for calculating values
  getters: {

  },

  // Mutations: Synchronous functions to directly mutate state
  mutations: {
    // Sets the list of posts to the Vuex state
    setPosts: (state, posts) => {
      state.postList = posts?.posts ?? []
    },/*
    createPost: (state, data) => {
      const { post } = data?.post
      if (post)
        state.postList[post.id] = post
    },
    deletePost: (state, data) => {
      const { id } = data?.id
      if (id) {
        state.postList = state.postList.splice[id, 1]
      }
        
    },
    updatePost: (state, data) => {
      const { id } = data?.id
      const { body } = data?.body
      if (id)
        state.postList[id].body = body
    },*/
    deleteAllPosts: (state) => {
      state.postList = []
    },/*
    getPost: (state, data) => {
      const post = data?.post
      if (post)
        state.postList[post.id] = post
    }*/
  },

  // Actions: Asynchronous operations that can commit mutations
  actions: {
    
  signupAction: (act, {email, password}) => {
    fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify({email: email, password: password}),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
  },
  // Commits a mutation to update the user's logged-in status
  loginAction: (act, {email, password}) => {
    // need to crypt pass
    fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify({email:email, password:password})
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('logged in');
        this.$router.push("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error login");
      });
  },
  logoutAction: (act) => {
    fetch("http://localhost:3000/auth/logout", {
          credentials: 'include', //  Don't forget to specify this if you need cookies
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('jwt removed');
        //console.log('jwt removed:' + auth.authenticated());
        this.$router.push("/login");
        //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error logout");
      });
  },
  createPostAction: (act, post) => {
    fetch("http://localhost:3000/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify({body: post.body}),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      //act.commit("createPost", data);
      //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
  },
  deletePostAction: (act, {postIndex}) => {
    fetch("http://localhost:3000/posts/delete/"+postIndex, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      //act.commit("deletePost", data)
      //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
  },
  updatePostAction: (act, {postIndex, body}) => {
    fetch("http://localhost:3000/posts/update/" + postIndex, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify({body: body}),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      //act.commit("updatePost", data)
      //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
  },
  // Action to commit the resetLikes mutation
  deleteAllPostsAction: act => {
    fetch("http://localhost:3000/posts/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      act.commit("deleteAllPosts");
      //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
  },
  getPostAction: (act, postIndex) => {
    fetch("http://localhost:3000/posts/get/"+postIndex, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
        })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      //act.commit("getPost", data);
      //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
  },
  getAllPostsAction: (act) => {
    fetch("http://localhost:3000/posts/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
        })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      act.commit("setPosts", data);
      //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log(e.message);
      });
  }
  },
  modules: {}, // Modules allow you to divide your store into modules
});
