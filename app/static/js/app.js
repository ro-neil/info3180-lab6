/* Add your Application JavaScript */

const Home = {
  name: 'Home',
  template: `
      <div class="home text-center">
        <img src="/static/images/logo.png" alt="VueJS Logo">
        <h1>{{ welcome }}</h1>
      </div>
  `,
  data(){
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
};

const NewsList = {
  name: 'NewsList',
  template: `
      <div class="news">
        <h2>News</h2>
        <div class="form-inline d-flex justify-content-center">
          <div class="form-group mb-2">
            <label class="sr-only" for="search">Search</label>
            <input type="search" name="search" v-model="searchTerm" id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter search term here" />
            <button class="btn mb-2 search-btn" @click="searchNews">Search</button> 
          </div>
        </div>
        
        <ul class="news__list card-columns">
          <li v-for="article in articles" class="news__item card">
            <div class="card-header">
              <h5>{{ article.title }}</h5>
            </div>
            <div class="card-body">
              <img :src="article.urlToImage" alt="article image">
              <p class='article-desc'>{{ article.description }}</p>
            </div>
          </li>
        </ul>
      </div>
  `,

  created(){
    let self = this;
    fetch('https://newsapi.org/v2/top-headlines?country=us',
    {
      headers: {
        'Authorization': 'Bearer <your-api-token>'
    }})
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      self.articles = data.articles;
    });
  },

  methods: {
    searchNews() {
      let self = this;
      let fetchString = 'https://newsapi.org/v2/everything?q=' + self.searchTerm + '&language=en';
      if(self.searchTerm == ''){
        fetchString = 'https://newsapi.org/v2/top-headlines?country=us';
      }
      fetch(fetchString,
      {
        headers: {
          'Authorization': 'Bearer <your-api-token>'  
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        self.articles = data.articles;
      });
    }
  },

  data(){
    return {
      articles: [],
      searchTerm: ''
    }
  }
}

const Login = {
  name: 'Login',
  template: `
      <div class="login text-center">
        <h1>{{ welcome }}</h1>
      </div>
  `,
  data(){
    return {
      welcome: '<Login form goes here>'
    }
  }
};

/* CREATE APP */
const app = Vue.createApp({
  components: {
    'home': Home,
    'news-list': NewsList,
    'login': Login
  },
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
});

app.component('app-header', {
  name: 'AppHeader',
  template: `
      <header>
          <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
            <a class="navbar-brand" href="#">WeBB News</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/news" class="nav-link">News</router-link>
                </li>
              </ul>
              <router-link to="/login" class="user-account">
                <img src="static/images/user.svg" id='user-img' data-toggle="tooltip" data-placement="top" title="User Account" alt="user icon">
              </router-link>
            </div>
          </nav>
      </header>    
  `,
  data: function() {
    return {};
  }
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
      <footer>
          <div class="container">
              <p>Copyright &copy {{ year }} Vue Inc.</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
          year: (new Date).getFullYear()
      }
  }
})

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/news', component: NewsList },
    { path: '/login', component: Login },
  ]
});

app.use(router)
app.mount('#app');