<template>
<div>
    <div class="background"></div>
    <div class="container">
        <div class="login-page">
        <div class="form shadow-lg bg-body rounded">
            <form class="login-form">
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <button>login</button>
            <p class="message">don't have an account? <a href="#">Create an account</a></p>
            </form>
        </div>
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.background{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #6379f4;;
}
.login-page {
  width: 360px;
  padding: 14% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
}
.form input {
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
