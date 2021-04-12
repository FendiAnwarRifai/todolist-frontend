<template>
        <div class="col-lg">
        <div class="container shadow-lg p-4 pb-5 bg-body rounded">
            <div class="row p-4">
                <div class="col-md-5">
                    <div class="d-flex justify-content-center">
                        <div class=" profile d-flex justify-content-center align-items-center">
                        <img width="500px" src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256__340.png" alt="">
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <!-- <div class=" changeImage pb-5 mt-4">
                            <label for="photos" class="buttonImage">Choose photo</label>
                            <input class="form-control d-none" type="file" id="photos">
                        </div> -->
                    </div>
                </div>
                <div class="col-md-6">
                    <form @submit.prevent="updateData">
                    <div class="mb-3">
                        <label for="name" class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="name" v-model="name">
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">Username</label>
                        <input type="text" class="form-control" id="name" v-model="username">
                    </div>
                    <div class="col-12 mb-3">
                        <span class="status" v-if="confirmed == 1 " style="background:#35db23;">confirmed</span>
                        <span class="status" v-else style="background:#dc3545;">unconfirmed</span>
                    </div>
                    <div class="col-12 pt-4 d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary">Save Profile Data</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      id: '',
      name: '',
      username: '',
      confirmed: ''
    }
  },
  mounted: function () {
    this.loadData()
  },
  methods: {
    ...mapActions(['updateUsers']),
    loadData () {
      axios.get(`${process.env.VUE_APP_BASE_URL}/users/byLogin`)
        .then((result) => {
          const user = result.data.result
          this.id = user.id
          this.name = user.name
          this.username = user.username
          this.confirmed = user.confirmed
        })
    },
    updateData () {
      const payload = {
        userId: this.id,
        name: this.name,
        username: this.username
      }
      this.updateUsers(payload).then((res) => {
        this.loadData()
      })
        .catch((err) => {
          this.$swal.fire({
            title: 'Warning',
            text: `${err.response}`,
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
        })
    }
  }
}
</script>

<style scoped>
.profile{
    overflow: hidden;
    height: 250px;
    width: 250px;
    border-radius: 100%;
}
.buttonImage{
  font-family: "Roboto", sans-serif;
  outline: 0;
  font-weight: 700;
  background: #4460ed;
  width: 100%;
  border: 0;
  border-radius: 10px;
  padding: 14px 25px;
  color: #FFFFFF;
  font-size: 14px;
  cursor: pointer;
}
.buttonImage:hover{
    background-color: #4460edbb;
}
.status{
  width: max-content;
  padding:2px 16px 6px 16px;
  cursor:default;
  color:white;
  border-radius:4px;
  font-size:12px;
  border-radius:30px;
}
@media only screen and (max-width: 768px) {
  .profile{
    height: 200px;
    width: 200px;
    margin-bottom: 25px;
}
.profile img {
  width: 355px;
}
}
@media only screen and (max-width: 540px) {
  .profile{
    height: 170px;
    width: 170px;
}
.profile img {
  width: 310px;
}
}
</style>
