<template>
    <div class="row">

    <!-- BLOCK INI AKAN MENGHANDLE LOAD DATA PERPAGE, DENGAN DEFAULT ADALAH 10 DATA -->
        <div class="col-md-4 mb-2">
            <div class="d-flex">
                <label class="me-2">Showing</label>
                <!-- KETIKA SELECT BOXNYA DIGANTI, MAKA AKAN MENJALANKAN FUNGSI loadPerPage -->
                <select style="width:72px" class="form-select form-select-sm" v-model="meta.per_page" @change="loadPerPage">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <label class="ms-2">Entries</label>
            </div>
        </div>

        <!-- BLOCK INI AKAN MENG-HANDLE PENCARIAN DATA -->
        <div class="col-md-4 offset-md-4">
            <div class="d-flex float-right">
                <label class="me-2">Search</label>
                <!-- KETIKA ADA INPUTAN PADA KOLOM PENCARIAN, MAKA AKAN MENJALANKAN FUNGSI SEARCH -->
                <input type="text" class="form-control form-control-sm" @input="search">
            </div>
        </div>

    <!-- BLOCK INI AKAN MENGHASILKAN LIST DATA DALAM BENTUK TABLE MENGGUNAKAN COMPONENT TABLE DARI BOOTSTRAP VUE -->
        <div class="col-md-12">
            <!-- :ITEMS ADALAH DATA YANG AKAN DITAMPILKAN -->
            <!-- :FIELDS AKAN MENJADI HEADER DARI TABLE, MAKA BERISI FIELD YANG SALING BERKORELASI DENGAN ITEMS -->
            <!-- :sort-by.sync & :sort-desc.sync AKAN MENGHANDLE FITUR SORTING -->
           <div class="d-none">
              {{i = meta.from}}
           </div>
            <b-table responsive striped bordered outlined hover head-row-variant="dark" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" show-empty>
               <template #cell(no)>
                  {{ i++ }}.
                </template>
                <template v-slot:cell(status)="data">
                    <span class="status" v-if="data.item.confirmed == 1 " style="background:#35db23;">confirmed</span>
                    <span class="status" v-else style="background:#dc3545;">unconfirmed</span>
                </template>
                <template v-slot:cell(actions)="row">
                    <button v-if="row.item.confirmed == false" type="button" class="btn btn-success btn-circle me-1" @click="ConfirmData(row)"><i class="fas fa-check"></i></button>

                    <button type="button" class="btn btn-primary btn-circle me-1" @click="EditData(row)"><i class="fas fa-pen"></i></button>

                    <button type="button" class="btn btn-danger btn-circle" @click="DeleteData(row)"><i class="fas fa-trash"></i></button>
                </template>
            </b-table>
        </div>

      <!-- BAGIAN INI AKAN MENAMPILKAN JUMsAH DATA YANG DI-LOAD -->
        <div class="col-md-6">
            <p>Showing {{ meta.from }} to {{ meta.to }} of {{ meta.total }} items</p>
        </div>

    <!-- BLOCK INI AKAN MENJADI PAGINATION DARI DATA YANG DITAMPILKAN -->
        <div class="col-md-6">
        <!-- DAN KETIKA TERJADI PERGANTIAN PAGE, MAKA AKAN MENJALANKAN FUNGSI changePage -->
            <b-pagination
                pills
                v-model="meta.current_page"
                :total-rows="meta.total"
                :per-page="meta.per_page"
                align="right"
                @change="changePage"
                aria-controls="dw-datatable"
            ></b-pagination>
            <!-- MODAL INI AKAN DIBUKA JIKA deleteModal = TRUE -->
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
import _ from 'lodash' // IMPORT LODASH, DIMANA AKAN DIGUNAKAN UNTUK MEMBUAT DELAY KETIKA KOLOM PENCARIAN DIISI

export default {
  // PROPS INI ADALAH DATA YANG AKAN DIMINTA DARI PENGGUNA COMPONENT DATATABLE YANG KITA BUAT
  props: {
    // ITEMS STRUKTURNYA ADALAH ARRAY, KARENA BAGIAN INI BERISI DATA YANG AKAN DITAMPILKAN DAN SIFATNYA WAJIB DIKIRIMKAN KETIKA COMPONENT INI DIGUNAKAN
    items: {
      type: Array,
      required: true
    },
    // FIELDS JUGA SAMA DENGAN ITEMS
    fields: {
      type: Array,
      required: true
    },
    // ADAPUN META, TYPENYA ADALAH OBJECT YANG BERISI INFORMASI MENGENAL CURRENT PAGE, LOAD PERPAGE, TOTAL DATA, DAN LAIN SEBAGAINYA.
    meta: {
      required: true
    }
  },
  data () {
    return {
      // VARIABLE INI AKAN MENGHADLE SORTING DATA
      sortBy: null, // FIELD YANG AKAN DISORT AKAN OTOMATIS DISIMPAN DISINI
      sortDesc: false, // SEDANGKAN JENISNYA ASCENDING ATAU DESC AKAN DISIMPAN DISINI
      selected: null
    }
  },
  watch: {
    // KETIKA VALUE DARI VARIABLE sortBy BERUBAH
    sortBy (val) {
      // MAKA KITA EMIT DENGAN NAMA SORT DAN DATANYA ADALAH OBJECT BERUPA VALUE DARI SORTBY DAN SORTDESC
      // EMIT BERARTI MENGIRIMKAN DATA KEPADA PARENT ATAU YANG MEMANGGIL COMPONENT INI
      // SEHINGGA DARI PARENT TERSEBUT, KITA BISA MENGGUNAKAN VALUE YANG DIKIRIMKAN
      this.$emit('sort', {
        sortBy: this.sortBy,
        sortDesc: this.sortDesc
      })
    },
    // KETIKA VALUE DARI SORTDESC BERUBAH
    sortDesc (val) {
      // MAKA CARA YANG SAMA AKAN DIKERJAKAN
      this.$emit('sort', {
        sortBy: this.sortBy,
        sortDesc: this.sortDesc
      })
    }
  },
  methods: {
    // JIKA SELECT BOX DIGANTI, MAKA FUNGSI INI AKAN DIJALANKAN
    loadPerPage (val) {
      // DAN KITA EMIT LAGI DENGAN NAMA per_page DAN VALUE SESUAI PER_PAGE YANG DIPILIH
      this.$emit('per_page', this.meta.per_page)
    },
    // KETIKA PAGINATION BERUBAH, MAKA FUNGSI INI AKAN DIJALANKAN
    changePage (val) {
      // KIRIM EMIT DENGAN NAMA PAGINATION DAN VALUENYA ADALAH HALAMAN YANG DIPILIH OLEH USER
      this.$emit('pagination', val)
    },
    // KETIKA KOTAK PENCARIAN DIISI, MAKA FUNGSI INI AKAN DIJALANKAN
    // KITA GUNAKAN DEBOUNCE UNTUK MEMBUAT DELAY, DIMANA FUNGSI INI AKAN DIJALANKAN
    // 500 MIL SECOND SETELAH USER BERHENTI MENGETIK
    search: _.debounce(function (e) {
      // KIRIM EMIT DENGAN NAMA SEARCH DAN VALUE SESUAI YANG DIKETIKKAN OLEH USER
      this.$emit('search', e.target.value)
    }, 500),
    ConfirmData (row) {
      const data = row.item
      this.$emit('confirm', data)
    },
    EditData (row) {
      const data = row.item
      this.$emit('edit', data)
    },
    DeleteData (row) {
      this.selected = row.item.id
      this.$emit('delete', this.selected)
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
