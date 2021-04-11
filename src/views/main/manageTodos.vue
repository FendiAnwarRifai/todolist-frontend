<template>
    <div class="col-lg">
        <div style="border-radius:20px" class="container shadow-lg p-4 pb-5 bg-body">
            <div class="row">
                <div class="col-6">
                    <button class="btn btn-primary">tambah data</button>
                </div>
                <div class="col-6 d-flex justify-content-end" v-if="deleteData.length > 0 ">
                    <span class="btn btn-danger btn-sm me-2">Deleted</span>
                    <span style="color:#6379F4;">OR</span>
                    <span class="btn btn-success btn-sm ms-2 me-3">Completed</span>
                </div>
            </div>
        <div class="row d-flex justify-content-center">

            <div style="background-color: #f5f5f5; border-radius:20px" class="col-md-5 shadow-lg p-4 mt-3 ms-3 me-3" v-for="data in loadAllLabels" :key="data.id">
            <div class="header row">
                <div class="col-6">
                    <span class="status" style="background:#6379F4;">ini label</span>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <input class="form-check-input" :id="data.id" type="checkbox" :value="data.id" v-model="deleteData">
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
                    <button type="button" class="btn btn-primary btn-circle me-1"><i class="fas fa-pen"></i></button>
                    <button type="button" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></button>
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
export default {
  data () {
    return {
      deleteData: [],
      loadAllLabels: [],
      current_page: 1,
      per_page: 4,
      rows: ''
    }
  },
  mounted: function () {
    this.loadAllData()
  },
  watch: {
    current_page: function (val) {
      this.loadAllData()
    }
  },
  methods: {
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
          this.loadAllLabels = res.data.result
          this.rows = res.data.rows
        }).catch((err) => {
          console.log(err)
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
