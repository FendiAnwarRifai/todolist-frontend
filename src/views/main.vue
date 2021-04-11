<template>
  <content>
    <header class="shadow p-3 mb-4" style="background:#6379f4;">
      <div class="headerContent">
        <div class="leftHeader">
          <h4>Tasker</h4>
        </div>
      </div>
    </header>
    <div class="me-4 ms-4 mb-4">
      <div class="row content">
      <div class="col-lg-3">
        <!-- tablet navbar -->
        <div class="row">
          <nav class="col" id="navbar">
            <ul class="shadow-lg p-3 bg-white inline">
              <li class="">
                <router-link to="dashboard">
                  <i class="fas fa-th-large me-2"></i>
                  <span>Dashboard</span>
                </router-link>
              </li>
              <li class="">
                <router-link to="transaction">
                  <i class="fas fa-arrow-up me-2"></i>
                  <span>Transfer</span>
                </router-link>
              </li>
              <li class="">
                <router-link to="topup">
                  <i class="fas fa-plus me-2"></i>
                  <span>Top Up</span>
                </router-link>
              </li>

              <li class="">
                <router-link to="profile">
                  <i class="far fa-user me-2"></i>
                  <span>Profile</span>
                </router-link>
              </li>

              <li>
                <a>
                  <i class="fas fa-sign-out-alt me-2"></i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <!-- end tablet navbar -->

        <!-- mobile  navbar -->
        <div class="row">
          <nav id="navbarMobile">
            <ul class="shadow-lg p-3 bg-white inline">
              <li class="">
                <router-link to="dashboard">
                  <i class="fas fa-th-large"></i>
                </router-link>
              </li>
              <li class="">
                <router-link to="transaction">
                  <i class="fas fa-arrow-up"></i>
                </router-link>
              </li>
              <li class="">
                <router-link to="topup">
                  <i class="fas fa-plus"></i>
                </router-link>
              </li>

              <li class="">
                <router-link to="">
                  <i class="far fa-user"></i>
                </router-link>
              </li>

              <li>
                <a>
                  <i class="fas fa-sign-out-alt"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <!-- end mobile navbar -->

        <nav class="shadow-lg p-3 bg-white navbars">
          <div @click="currentPage" :class="[currentsPage == 'users' ? 'active': '' ,'menu'] ">
            <li class=" mb-4 mt-4 ps-4">
              <router-link to="users">
                <i class="fas fa-users me-3"></i>
                <span>Users</span>
              </router-link>
            </li>
          </div>
          <div @click="currentPage" :class="[currentsPage == 'labels' ? 'active': '' ,'menu'] ">
            <li class=" mb-4 mt-4 ps-4">
              <router-link to="labels">
                <i class="fas fa-tags me-3"></i>
                <span>Labels</span>
              </router-link>
            </li>
          </div>
          <div @click="currentPage" :class="[currentsPage == 'tasks' ? 'active': '' ,'menu'] ">
            <li class=" mb-4 mt-4 ps-4">
              <router-link to="tasks">
                <i class="fas fa-tasks me-3"></i>
                <span>Tasks</span>
              </router-link>
            </li>
          </div>
          <div @click="currentPage" :class="[currentsPage == 'profile' ? 'active': '' ,'menu'] ">
            <li class=" mt-4 ps-4">
              <router-link to="profile">
                <i class="far fa-user me-3"></i>
                <span>Profile</span>
              </router-link>
            </li>
          </div>
          <div class="menu logout">
            <li class="mb-3 ps-4">
              <a @click="handleLogout">
                <i class="fas fa-sign-out-alt me-3"></i>
                <span>Logout</span>
              </a>
            </li>
          </div>
        </nav>
      </div>
      <router-view />
      </div>
    </div>
    <footer>
      <div class="row">
        <div class="col-md copyright">2021 Tasker. All right reserved.</div>
        <div class="col-md contactFooter">
          <span class="footerNumber">+62 859 6424 9369</span>
          <span class="footerEmail">fendianwar36@gmail.com</span>
        </div>
      </div>
    </footer>
  </content>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      currentsPage: ''
    }
  },
  mounted: function () {
    this.currentPage()
  },
  computed: {},
  methods: {
    handleLogout () {},
    currentPage () {
      this.currentsPage = this.$route.name
    }
  }
}
</script>

<style scoped>
#navbar,
#navbarMobile {
  display: none;
}
/*class navbar left*/
.navbars {
  position: relative;
  height: max-content !important;
  border-radius: 20px;
}
.navbars i {
  font-size: 22px;
}
.navbars span {
  font-size: 15px;
}
li {
  list-style-type: none;
}
.menu:hover,
.active {
  border-left: 4px solid #6379f4;
  margin-left: -16px;
  padding-left: 12px;
}
.menu:hover a,
.active a{
  text-decoration: none;
  color: #6379f4 !important;
  font-weight: bold;
}

a {
  color: #3a3d42;
  text-decoration: none;
  cursor: pointer;
}
.logout {
  margin-top: 390px;
}
/*end navbar left*/

body {
  font-size: 16px;
  background-color: #fafcff;
}

/*header content*/
.headerContent {
  width: 100%;
  padding-right: 115px;
  padding-left: 115px;
}
content header {
  display: flex;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.leftHeader {
  color: #ffffff;
  float: left;
  padding-top: 10px;
}

footer {
  padding: 15px 90px 15px 115px;
  color: white;
  background: #6379f4;
}

.contactFooter {
  text-align: right;
}
.footerNumber {
  margin-right: 20px;
}
/*rsesponsive tablet*/
@media only screen and (max-width: 990px) {
  .headerContent {
    padding-right: 0px;
    padding-left: 0px;
  }

    #navbar {
    display: block;
  }
  .navbars {
    display: none;
  }
  .active {
    border-left: 0px;
  }
  .inline li:hover a,
  .active a {
    text-decoration: none;
    color: #6379f4;
    font-weight: bold;
  }
  .inline {
    position: relative;
    height: max-content !important;
    border-radius: 20px;
    text-align: center;
  }
  .inline li {
    display: inline;
    padding-right: 12px;
    padding-left: 30px;
  }

  footer {
    font-size: 12px;
    padding: 20px;
    text-align: center;
  }
  .footerNumber {
    float: left;
  }
}

/*responsive mobile*/
@media only screen and (max-width: 767px) {
    .active {
    margin-left: 0;
  }
  #navbar {
    display: none;
  }
  #navbarMobile {
    position: fixed;
    display: block;
    bottom: -16px;
    z-index: 5;
    left: 0;
    right: 0;
  }
  .inline {
    border-radius: 0;
  }
  .inline li {
    font-size: 18px;
    padding-left: 25px;
  }
  .inline i {
    color: #6c757d;
  }
  .active i,
  .inline i:hover {
    color: #6379f4;
  }
  footer {
    margin-bottom: 62px;
  }
}
</style>
