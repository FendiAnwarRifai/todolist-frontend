<template>
    <div class="col-lg">
        <div class="container shadow-lg p-4 pb-5 bg-body rounded">
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

            <div class="col-md-5 shadow-lg p-4 mt-3 ms-3 me-3 bg-body rounded">
            <div class="header row">
                <div class="col-6">
                    <span style="width: max-content; padding: 2px 16px; cursor:default; background:#6379F4; color:white; border-radius:2px;">ini label</span>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <input class="form-check-input" id="1" type="checkbox" value="1" v-model="deleteData">
                </div>
            </div>
            <div class="bodys row">
                <div class="col-12">
                    <p class="mt-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt tenetur dicta exercitationem, nemo voluptatibus corporis nulla dolore necessitatibus asperiores aspernatur officiis nostrum doloribus ducimus, aut tempore aliquam. Impedit, et debitis.
                    </p>
                </div>
            </div>
            <div class="footers row">
                <div class="col-6">
                    <span style="width: max-content; padding: 2px 16px; cursor:default; background:#dc3545; color:white; border-radius:4px;">uncompleted</span>
                    <!-- <span style="width: max-content; padding: 2px 16px; cursor:default; background:#35db23; color:white; border-radius:2px;">done</span> -->
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button type="button" class="btn btn-primary btn-circle me-1"><i class="fas fa-pen"></i></button>
                    <button type="button" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            </div>

            <div class="col-md-5 shadow-lg p-4 mt-3 ms-3 me-3 bg-body rounded">
            <div class="header row">
                <div class="col-6">
                    <span style="width: max-content; padding: 2px 16px; cursor:default; background:#6379F4; color:white; border-radius:2px;">ini label</span>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <input class="form-check-input" id="2" type="checkbox" value="2" v-model="deleteData">
                </div>
            </div>
            <div class="bodys row">
                <div class="col-12">
                    <p class="mt-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt tenetur dicta exercitationem, nemo voluptatibus corporis nulla dolore necessitatibus asperiores aspernatur officiis nostrum doloribus ducimus, aut tempore aliquam. Impedit, et debitis.
                    </p>
                </div>
            </div>
            <div class="footers row">
                <div class="col-6">
                    <!-- <span style="width: max-content; padding: 2px 16px; cursor:default; background:#dc3545; color:white; border-radius:4px;">uncompleted</span> -->
                    <span style="width: max-content; padding: 2px 16px; cursor:default; background:#35db23; color:white; border-radius:2px;">done</span>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button type="button" class="btn btn-primary btn-circle me-1"><i class="fas fa-pen"></i></button>
                    <button type="button" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      deleteData: []
    }
  },
  methods: {
    check (value, id) {
      console.log(value, id)
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
</style>
