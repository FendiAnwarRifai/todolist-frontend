<template>
    <div class="col-lg">
        <div class="container shadow-lg p-4 pb-5 bg-body rounded">
            <div class="row mb-4">
                <div class="col-6">
                    <h3>Manages Users</h3>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createUsers">tambah Users</button>

                    <div class="modal fade" id="createUsers" tabindex="-1" aria-labelledby="createUsersLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="createUsersLabel">Create Users</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="createDataUsers" class="row g-3" @submit.prevent="createData">
                            <div class="col-12">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" @keyup="checkName" v-model="dataCreated.name" class="form-control" id="name" placeholder="insert name">
                                <div class="error">{{errorName}}</div>
                            </div>
                            <div class="col-md-12">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" @keyup="checkUsername" v-model="dataCreated.username" class="form-control" id="username" placeholder="Username">
                                <div class="error">{{errorUsername}}</div>
                            </div>
                            <div class="col-md-12">
                                <label for="password" class="form-label">Password</label>
                                <input :type="type" @keyup="checkPassword" v-model="dataCreated.password" class="form-control" id="password" placeholder="Password">
                                <div class="error">{{errorPassword}}</div>
                            </div>
                            <div style="font-size:13px" class="form-check mb-2 ms-2" @click="showPassword">
                            <input class="form-check-input" type="checkbox" id="pw" v-model="show">
                            <label class="form-check-label" for="pw">
                                Show Password
                            </label>
                            </div>
                            <div class="col-md-12">
                                <label for="" class="mb-2">Role</label><br>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="admin" value="0" v-model="dataCreated.role">
                                    <label class="form-check-label" for="admin">Admin</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="user" value="1" v-model="dataCreated.role">
                                    <label class="form-check-label" for="user">User</label>
                                </div>
                            </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button class="btn btn-primary" type="submit" form="createDataUsers">Create</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                        <!-- COMPONENT YANG SUDAH KITA BUAT, MENGHARAPKAN 3 BUAH PROPS, YAKNI ITEMS, FIELDS DAN META. KETIGA DATA YANG DIMINTA OLEH PROPS INI AKAN KITA KIRIMKAN -->
                            <!-- ADAPUN CARA MENGAMBIL VALUE DARI EMIT YANG SUDAH KITA BUAT ADALAH DENGAN MENAMBAHKAN @ DAN DIIKUTI DENGAN NAMA EMITNYA -->
                            <!-- DAN PARAMETER SETELAH SAMA DENGAN DARI EMIT ADALAH FUNGSI UNTUK MENERIMA VALUENYA -->
                            <app-datatable
                                :items="items"
                                :fields="fields"
                                :meta="meta"
                                @per_page="handlePerPage"
                                @pagination="handlePagination"
                                @search="handleSearch"
                                @sort="handleSort"
                                @confirm="handleConfirm"
                                @edit="handleEdit"
                                @delete="handleDelete"
                            />

                        <b-modal id="modal-center" v-model="modalEditShow" centered title="Edit Data">
                            <form id="editUsers" class="row g-3" @submit.prevent="updateData">
                            <div class="col-12">
                                <label for="names" class="form-label">Name</label>
                                <input type="text" v-model="name" class="form-control" id="names" placeholder="insert name">
                            </div>
                            <div class="col-md-12">
                                <label for="usernames" class="form-label">Username</label>
                                <input type="text" v-model="username" class="form-control" id="usernames" placeholder="Username">
                            </div>
                            <div class="col-md-12">
                                <label for="" class="mb-2">Role</label><br>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="admins" value="0" v-model="role" :checked="role == '0' ? true : false">
                                    <label class="form-check-label" for="admins">Admin</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="users" value="1" v-model="role" :checked="role == '1' ? true : false">
                                    <label class="form-check-label" for="users">User</label>
                                </div>
                            </div>
                            </form>
                            <template v-slot:modal-footer>
                                <div>
                                    <b-button class="me-2" variant="secondary" size="sm" @click="modalEditShow=false">
                                        Close
                                    </b-button>
                                    <b-button  variant="primary" size="sm" type="submit" form="editUsers">
                                        Save Changes
                                    </b-button>
                                </div>
                            </template>
                        </b-modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Datatable from '../../components/Datatable'
import axios from 'axios'
import { mapActions } from 'vuex'
export default {

  data () {
    return {
      fields: [
        { key: 'no', label: 'No', sortable: false },
        { key: 'name', label: 'Nama', sortable: true },
        { key: 'username', label: 'Username', sortable: true },
        { key: 'status', class: 'text-center', label: 'Status', sortable: false },
        { key: 'actions', class: 'text-center', label: 'Action', sortable: false }
      ],
      items: [],
      meta: [],
      current_page: 1,
      per_page: 10,
      search: '',
      sortBy: 'createdAt',
      sortByDesc: false,
      modalEditShow: false,
      idUserEdit: '',
      name: '',
      username: '',
      role: null,
      checked: true,
      dataCreated: {},
      errorName: '',
      errorUsername: '',
      errorPassword: '',
      type: 'password',
      show: null
    }
  },
  components: {
    'app-datatable': Datatable
  },
  mounted: function () {
    this.loadPostsData()
  },
  methods: {
    ...mapActions(['createUsers', 'updateUsers', 'confirmUsers']),
    showPassword () {
      setTimeout(() => {
        if (this.show === true) {
          this.type = 'text'
        } else if (this.show === false) {
          this.type = 'password'
        }
      }, 100)
    },
    loadPostsData () {
      axios.get(`${process.env.VUE_APP_BASE_URL}/users`, {
        params: {
          page: this.current_page,
          per_page: this.per_page,
          q: this.search,
          sortby: this.sortBy,
          sortbydesc: this.sortByDesc ? 'ASC' : 'DESC'
        }
      })
        .then((res) => {
          if (res.data.result.length === 0) {
            this.current_page = this.current_page - 1
            return this.loadPostsData()
          }
          const getData = res.data
          this.items = getData.result
          this.meta = {
            total: getData.rows,
            current_page: this.current_page,
            per_page: this.per_page,
            from: getData.from,
            to: getData.to
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    handlePerPage (val) {
      this.per_page = val
      this.current_page = 1
      this.loadPostsData()
    },
    handlePagination (val) {
      this.current_page = val
      this.loadPostsData()
    },
    handleSearch (val) {
      this.search = val
      this.current_page = 1
      this.loadPostsData()
    },
    handleSort (val) {
      this.sortBy = val.sortBy
      this.sortByDesc = val.sortDesc
      this.loadPostsData()
    },
    handleConfirm (val) {
      const payload = {
        userId: val.id,
        confirmed: true
      }
      this.confirmUsers(payload).then((res) => {
        this.loadPostsData()
      })
    },
    checkName (e) {
      if (e.target.value.length < 5) {
        this.errorName = 'Name at least 5 characters'
      } else {
        this.errorName = ''
      }
    },
    checkUsername (e) {
      if (e.target.value.length < 8) {
        this.errorUsername = 'Username at least 8 characters'
      } else {
        this.errorUsername = ''
      }
    },
    checkPassword (e) {
      if (e.target.value.length < 8) {
        this.errorPassword = 'Password at least 8 characters'
      } else {
        this.errorPassword = ''
      }
    },
    createData () {
      if (this.errorName.length === 0 && this.errorUsername.length === 0 && this.errorPassword.length === 0 && Object.keys(this.dataCreated).length === 4) {
        const payload = {
          name: this.dataCreated.name,
          username: this.dataCreated.username,
          password: this.dataCreated.password,
          role: this.dataCreated.role
        }
        this.createUsers(payload).then((res) => {
          this.loadPostsData()
          this.dataCreated = {}
        })
          .catch((err) => {
            this.$swal.fire({
              title: 'Warning',
              text: `${err.response}`,
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
    },
    handleEdit (val) {
      this.modalEditShow = true
      this.idUserEdit = val.id
      this.name = val.name
      this.username = val.username
      this.role = val.role
    },
    updateData () {
      const payload = {
        userId: this.idUserEdit,
        name: this.name,
        username: this.username,
        role: this.role
      }
      this.updateUsers(payload).then((res) => {
        this.loadPostsData()
        this.modalEditShow = false
      })
        .catch((err) => {
          this.$swal.fire({
            title: 'Warning',
            text: `${err.response}`,
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
        })
    },
    handleDelete (val) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${process.env.VUE_APP_BASE_URL}/users/delete/${val}`)
            .then((result) => {
              this.$swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.loadPostsData()
            })
        }
      })
    }
  }
}
</script>
<style scoped>
.error{
    color:red;
    font-size: 14px;
    margin-bottom: -8px;
    margin-top: 8px;
}
</style>
