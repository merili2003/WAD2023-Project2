import { createStore } from "vuex";

export default createStore({
  state: {
    postList: [
      {
          "pfp": "../images/pfp.png",
          "body": "ancient photo captured by my granny",
          "date": "Dec 24, 1530",
          "image": "../images/starfall.jpg",
          "alt-image": "Starfall",
          "likes" : 0
      },
      {
          "pfp": "../images/pfp.png",
          "body": "proof that the best photos are taken with the nokia 5110",
          "date": "Jan 01, 2030",
          "image": "../images/milky_way.jpg",
          "alt-image": "Milky Way",
          "likes" : 0
      },
      {
          "pfp": "../images/pfp.png",
          "body": "apparently they don't sell water on Mars?",
          "date": "Oct 60, 3000",
          "image": "",
          "alt-image": "",
          "likes" : 0
      },
      {
          "pfp": "../images/pfp.png",
          "body": "anyone know where this at?<br>#lost #pleasehelp",
          "date": "Aug 05, -11,732,259,674",
          "image": "../images/cosmos.avif",
          "alt-image": "Cosmos",
          "likes" : 0
      },
      {
          "pfp": "../images/pfp.png",
          "body": "#iwadabest",
          "date": "Oct 02, 2023",
          "image": "",
          "alt-image": "",
          "likes" : 0
      },
      {
          "pfp": "../images/pfp.png",
          "body": "#selfie",
          "date": "May 15, 2022",
          "image": "../images/space6.png",
          "alt-image": "Astronaut found life",
          "likes" : 0
      },
      {
          "pfp": "../images/pfp.png",
          "body": "Life aboard the International Space Station.",
          "date": "Jul 04, 2022",
          "image": "../images/space7.png",
          "alt-image": "Space Station",
          "likes" : 0
      },
      {
          "pfp": "../images/pfp.png",
          "body": "One small step for man, one giant leap for mankind.",
          "date": "Sep 10, 2021",
          "image": "../images/space8.png",
          "alt-image": "Moon Landing",
          "likes" : 0
      },
      {
          "pfp": "../images/pfp.png",
          "body": "Close-up view of a stunning star cluster.",
          "date": "Feb 14, 2022",
          "image": "../images/space9.png",
          "alt-image": "Star Cluster",
          "likes" : 0
      },
      {
          "pfp": "../images/pfp.png",
          "body": "Deep space exploration reveals the universe's mysteries.",
          "date": "Mar 21, 2023",
          "image": "",
          "alt-image": "Deep quote",
          "likes" : 0
      },
      {
          "pfp": "../images/pfp.png",
          "body": "#work #BoredOfThisEarth",
          "date": "Apr 01, 2023",
          "image": "",
          "alt-image": "",
          "likes" : 0
      },
      {
          "pfp": "../images/pfp.png",
          "body": "A comet passing by, trailing a magnificent tail.",
          "date": "Jun 30, 2023",
          "image": "../images/space12.jpg",
          "alt-image": "Comet Tail",
          "likes" : 0
      }
  ],
  activeAccount : {
    "pfp" : "../images/pfp.png",
    "name" : "",
    "mail" : ""
  }
  },
  getters: {
    loggedIn: state => {
      return state.activeAccount.name ? true : false;
    }
  },
  mutations: {
    logIn: (state, {name, mail}) => {
      state.activeAccount.name = name;
      state.activeAccount.mail = mail;
    },
    logOut: state => {
      state.activeAccount.name = "";
      state.activeAccount.mail = "";
    },
    addLike: (state, postIndex) => {
      state.postList[postIndex].likes += 1;
    },
    resetLikes: state => {
      state.postList.forEach(post => post.likes = 0)
    }
  },
  actions: {
    loginAction: (act, {name, mail}) => {
      act.commit("logIn", {name, mail})
    },
    logoutAction: act => {
      act.commit("logOut")
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
