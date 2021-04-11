<template>
        <div class="col-lg">
        <div class="container shadow-lg p-4 pb-5 bg-body rounded">
            <div class="row p-4">
                <div class="col-md-5">
                    <div class="d-flex justify-content-center">
                        <div class=" profile d-flex justify-content-center align-items-center">
                        <img width="400px" src="https://www.w3schools.com/w3css/img_lights.jpg" alt="">
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <div class=" changeImage pb-5 mt-4">
                            <label for="photos" class="buttonImage">Choose photo</label>
                            <input class="form-control d-none" type="file" id="photos">
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <form>
                    <div class="mb-3">
                        <label for="name" class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="name">
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">Username</label>
                        <input type="text" class="form-control" id="name">
                    </div>
                    <div class="mb-3">
                        <label for="" class="mb-2">Role</label><br>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                            <label class="form-check-label" for="inlineRadio1">1</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                            <label class="form-check-label" for="inlineRadio2">2</label>
                        </div>
                    </div>
                    <div class="col-12 mb-3">
                        <span>Status Account: </span>
                        <!-- <span style="width: max-content; padding:2px 16px 6px 16px; cursor:default; background:#dc3545; color:white; border-radius:4px;">Active</span> -->
                    <span style="width: max-content; padding:2px 16px 6px 16px; cursor:default; background:#35db23; color:white; border-radius:2px;">Active</span>
                    </div>
                    <div class="col-12 pt-4 d-flex justify-content-end">
                        <button class="btn btn-primary">Save Profile Data</button>
                    </div>
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
</style>
