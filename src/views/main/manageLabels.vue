<template>
    <div class="col-lg">
        <div class="container shadow-lg p-4 pb-5 bg-body rounded">
            <div class="row mb-4">
                <div class="col-6">
                    <h3>Manages Labels</h3>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createLabels">tambah Label</button>

                    <div class="modal fade" id="createLabels" tabindex="-1" aria-labelledby="createDataLabels" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="createDataLabels">Create Label</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="create" class="row g-3" @submit.prevent="createLabel">
                            <div class="col-12">
                                <label for="label" class="form-label">Label</label>
                                <input type="text" v-model="dataCreated.label" class="form-control" id="label" placeholder="insert label">
                            </div>
                            <div class="col-md-12">
                                <label for="description" class="form-label">Description</label>
                                <b-form-textarea id="description" v-model="dataCreated.desc" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                            </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button class="btn btn-primary" type="submit" form="create">Create</button>
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
                        <app-datatable
                            :items="items"
                            :fields="fields"
                            :meta="meta"
                            @per_page="handlePerPage"
                            @pagination="handlePagination"
                            @search="handleSearch"
                            @sort="handleSort"
                            @edit="handleEdit"
                            @delete="handleDelete"
                        />

                    <b-modal id="modal-center" v-model="modalEditShow" centered title="Edit Data">
                        <form id="update" class="row g-3" @submit.prevent="updateData">
                            <div class="col-12">
                                <label for="label" class="form-label">Label</label>
                                <input type="text" v-model="label" class="form-control" id="label" placeholder="insert label">
                            </div>
                            <div class="col-md-12">
                                <label for="description" class="form-label">Description</label>
                                <b-form-textarea id="description" v-model="desc" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                            </div>
                        </form>
                        <template v-slot:modal-footer>
                              <div>
                                  <b-button class="me-2" variant="secondary" size="sm" @click="modalEditShow=false">
                                      Close
                                  </b-button>
                                  <b-button  variant="primary" size="sm" type="submit" form="update">
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
        { key: 'label', label: 'Label', sortable: true },
        { key: 'desc', label: 'Description', sortable: true },
        { key: 'actions', sortable: false }
      ],
      items: [],
      meta: [],
      current_page: 1,
      per_page: 10,
      search: '',
      sortBy: 'createdAt',
      sortByDesc: false,
      modalEditShow: false,
      dataCreated: { label: '', desc: '' },
      labelIdEdit: '',
      label: '',
      desc: ''
    }
  },
  components: {
    'app-datatable': Datatable
  },
  mounted: function () {
    this.loadPostsData()
  },
  methods: {
    ...mapActions(['createLabels', 'updateLabels']),
    loadPostsData () {
      axios.get(`${process.env.VUE_APP_BASE_URL}/labels`, {
        params: {
          page: this.current_page,
          per_page: this.per_page,
          q: this.search,
          sortby: this.sortBy,
          sortbydesc: this.sortByDesc ? 'DESC' : 'ASC'
        }
      })
        .then((res) => {
          if (res.data.result.length === 0) {
            this.current_page = this.current_page - 1
            return this.loadPostsData()
          }
          const getData = res.data
          this.items = getData.result
          console.log(getData)
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
    createLabel () {
      if (Object.keys(this.dataCreated).length === 2 && this.dataCreated.label.length > 0 && this.dataCreated.desc.length > 0) {
        const payload = {
          label: this.dataCreated.label,
          desc: this.dataCreated.desc
        }
        this.createLabels(payload).then((res) => {
          this.loadPostsData()
          this.dataCreated = { label: '', desc: '' }
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
      this.labelIdEdit = val.id
      this.label = val.label
      this.desc = val.desc
    },
    updateData () {
      const payload = {
        id: this.labelIdEdit,
        label: this.label,
        desc: this.desc
      }
      this.updateLabels(payload).then((res) => {
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
          axios.delete(`${process.env.VUE_APP_BASE_URL}/labels/delete/${val}`)
            .then((result) => {
              this.$swal.fire(
                'Deleted!',
                'Your data has been deleted.',
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

</style>
