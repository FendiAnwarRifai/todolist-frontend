<template>
  <div class="col-lg">
    <div style="border-radius:20px" class="container shadow-lg p-4 pb-5 bg-body">
      <div class="row">
        <div class="col-6">
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createTasks">tambah Task</button>

          <div class="modal fade" id="createTasks" tabindex="-1" aria-labelledby="createDataTasks" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="createDataTasks">Create Task</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form id="create" class="row g-3" @submit.prevent="createTask">
                    <div class="col-12">
                      <label class="mb-2">Label</label>
                      <select class="form-select" v-model="dataCreated.labelId">
                        <option  v-for="labels in loadAllLabels" :key="labels.id" :value="labels.id">{{labels.label}}</option>
                      </select>
                    </div>
                    <div class="col-md-12">
                      <label for="task" class="form-label">Task</label>
                      <b-form-textarea id="task" v-model="dataCreated.task" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
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
        <div class="col-6 d-flex justify-content-end" v-if="selectIdData.length > 0 ">
          <span @click="deleteSelected" class="btn btn-danger btn-sm me-2">Deleted</span>
          <span style="color:#6379F4;">OR</span>
          <span @click="completeSelected" class="btn btn-success btn-sm ms-2 me-3">Completed</span>
        </div>
      </div>
      <div class="row d-flex justify-content-center">

        <div style="background-color: #f5f5f5; border-radius:20px" class="col-md-5 shadow-lg p-4 mt-3 ms-3 me-3" v-for="data in loadAllTask" :key="data.id">
          <div class="header row">
            <div class="col-6">
              <span class="status" style="background:#6379F4;">{{data.label.label}}</span>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <input class="form-check-input" :id="data.id" type="checkbox" :value="data.id" v-model="selectIdData">
            </div>
          </div>
          <div class="bodys row">
            <div class="col-12">
              <p class="mt-4 shadow-sm p-3 m-4 bg-body rounded">
                {{data.task}}
              </p>
            </div>
          </div>
          <div class="footers row">
            <div class="col-6">
              <span v-if="data.completed === true" class="status" style="background:#35db23;">done</span>
              <span v-else class="status" style="background:#dc3545;">uncompleted</span>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <button @click="handleEdit(data)" type="button" class="btn btn-primary btn-circle me-1"  data-bs-toggle="modal" data-bs-target="#editTasks"><i class="fas fa-pen"></i></button>
              <button @click="deleted(data.id)" type="button" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
        <div class="modal fade" id="editTasks" tabindex="-1" aria-labelledby="editDataTasks" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editDataTasks">Edit Task</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="updated" class="row g-3" @submit.prevent="saveEdited">
                  <div class="col-12">
                    <label class="mb-2">Label</label>
                    <select class="form-select" v-model="labelId">
                      <option  v-for="labels in loadAllLabels" :key="labels.id" :value="labels.id">{{labels.label}}</option>
                    </select>
                  </div>
                  <div class="col-md-12">
                    <label class="form-label">Task</label>
                    <b-form-textarea v-model="task" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                  </div>
                  <div class="col-md-12">
                    <label for="" class="mb-2">Status</label><br>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" id="done" :value="true" v-model="completed" :checked="completed == true ? true : false">
                      <label class="form-check-label" for="done">Done</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" id="uncom" :value="false" v-model="completed" :checked="completed == false ? true : false">
                      <label class="form-check-label" for="uncom">Uncompleted</label>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button class="btn btn-primary" type="submit" form="updated">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <b-pagination
        pills
        v-model="current_page"
        :per-page="per_page"
        :total-rows="rows"
        aria-controls="itemList"
        align="right"
        ></b-pagination>
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
      selectIdData: [],
      loadAllLabels: [],
      loadAllTask: [],
      current_page: 1,
      per_page: 4,
      rows: '',
      dataCreated: { labelId: '', task: '' },
      todosId: '',
      labelId: '',
      task: '',
      completed: null
    }
  },
  mounted: function () {
    this.loadAllData()
    this.getAllLabels()
  },
  watch: {
    current_page: function (val) {
      this.loadAllData()
    }
  },
  methods: {
    ...mapActions(['createTodos', 'updateTodos']),
    loadAllData () {
      axios.get(`${process.env.VUE_APP_BASE_URL}/todos`, {
        params: {
          page: this.current_page,
          per_page: this.per_page
        }
      })
        .then((res) => {
          if (res.data.result.length === 0) {
            this.current_page = this.current_page - 1
            return this.loadAllData()
          }
          this.loadAllTask = res.data.result
          this.rows = res.data.rows
        }).catch((err) => {
          console.log(err)
        })
    },
    getAllLabels () {
      axios.get(`${process.env.VUE_APP_BASE_URL}/labels/view`)
        .then((res) => {
          this.loadAllLabels = res.data.result
        })
    },
    createTask () {
      console.log()
      if (Object.keys(this.dataCreated).length === 2 && this.dataCreated.labelId.toString().length > 0 && this.dataCreated.task.length > 0) {
        const payload = {
          label_id: this.dataCreated.labelId,
          task: this.dataCreated.task
        }
        this.createTodos(payload).then((res) => {
          this.loadAllData()
          this.dataCreated = { labelId: '', task: '' }
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
      this.todosId = val.id
      this.labelId = val.label_id
      this.task = val.task
      this.completed = val.completed
    },
    saveEdited () {
      const payload = {
        id: this.todosId,
        label_id: this.labelId,
        task: this.task,
        completed: this.completed
      }
      this.updateTodos(payload).then((res) => {
        this.loadAllData()
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
    deleted (val) {
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
          axios.delete(`${process.env.VUE_APP_BASE_URL}/todos/delete/${val}`)
            .then((result) => {
              this.$swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.loadAllData()
            })
        }
      })
    },
    deleteSelected () {
      const payload = {
        id: this.selectIdData.toString()
      }
      this.$swal.fire({
        title: 'Are you sure you are deleting the selected data?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`${process.env.VUE_APP_BASE_URL}/todos/delSelected`, payload)
            .then((result) => {
              this.$swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.selectIdData = []
              this.loadAllData()
            })
        }
      })
    },
    completeSelected () {
      const payload = {
        id: this.selectIdData.toString()
      }
      this.$swal.fire({
        title: 'mark as done?',
        text: 'the task status will be changed to complete!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, completed it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`${process.env.VUE_APP_BASE_URL}/todos/completeSelected`, payload)
            .then((result) => {
              this.$swal.fire(
                'Success!',
                'task has been completed',
                'success'
              )
              this.selectIdData = []
              this.loadAllData()
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
}
.btn-circle.btn-lg {
  width: 50px;
  height: 50px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.33;
  border-radius: 25px;
}
.btn-circle.btn-xl {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  font-size: 24px;
  line-height: 1.33;
  border-radius: 35px;
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
</style>
