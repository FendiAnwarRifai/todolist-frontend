<template>
<div>
    <div class="background"></div>
    <div class="container">
        <div class="register-page">
        <div class="form shadow-lg bg-body rounded">
            <h3 class="mb-4">Register</h3>
            <form class="register-form" @submit.prevent="registerData">
            <input class="input" @keyup="checkName" type="text" v-model="name" placeholder="name"/>
            <div class="error">{{errorName}}</div>
            <input class="input" @keyup="checkUsername" type="text" v-model="username" placeholder="username"/>
            <div class="error">{{errorUsername}}</div>
            <input class="input" @keyup="checkPassword" :type="type" v-model="password" placeholder="password"/>
            <div class="error">{{errorPassword}}</div>
            <div class="form-check mb-2" @click="showPassword">
            <input class="form-check-input" type="checkbox" id="pw" v-model="checked">
            <label class="form-check-label" for="pw">
                Show Password
            </label>
            </div>
            <button type="submit">Register</button>
            <p class="message">already have an account? <router-link to="/">Login</router-link></p>
            </form>
        </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      name: '',
      errorName: '',
      username: '',
      errorUsername: '',
      password: '',
      errorPassword: '',
      type: 'password',
      checked: false
    }
  },
  mounted: function () {},
  computed: {},
  methods: {
    ...mapActions(['register']),
    showPassword () {
      setTimeout(() => {
        if (this.checked === true) {
          this.type = 'text'
        } else if (this.checked === false) {
          this.type = 'password'
        }
      }, 100)
    },
    checkName (e) {
      if (e.target.value.length < 5) {
        this.errorName = 'at least 5 characters'
      } else {
        this.errorName = ''
      }
    },
    checkUsername (e) {
      if (e.target.value.length < 8) {
        this.errorUsername = 'at least 8 characters'
      } else {
        this.errorUsername = ''
      }
    },
    checkPassword (e) {
      if (e.target.value.length < 8) {
        this.errorPassword = 'at least 8 characters'
      } else {
        this.errorPassword = ''
      }
    },
    registerData () {
      if (this.errorName.length === 0 && this.errorUsername.length === 0 && this.errorPassword.length === 0 && this.name.length > 0 && this.username.length > 0 && this.password.length > 0) {
        const payload = {
          name: this.name,
          username: this.username,
          password: this.password
        }
        this.register(payload)
          .then((res) => {
            this.$swal.fire({
              title: 'Success',
              text: 'Register successfully',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            this.$router.push({ path: '/' })
          })
          .catch((err) => {
            this.$swal.fire({
              title: 'Warning',
              text: `${err.response.data.message}`,
              icon: 'warning',
              confirmButtonText: 'Ok'
            })
          })
      } else {
        this.$swal.fire({
          title: 'Warning',
          text: 'Isi Data Dengan Benar!!',
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
      }
    }
  }
}
</script>

<style scoped>
.error{
    color:red;
    font-size: 14px;
    margin-bottom: 8px;
    margin-top: -8px;
}
.background{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #6379f4;;
}
.register-page {
  width: 360px;
  padding: 10% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;

}
h3, .message {
    text-align: center;
}
.form .input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form-check-label{
    color: #7a7a7a;
    font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4460ed;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #526df2;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #6379f4;
  text-decoration: none;
}
</style>
