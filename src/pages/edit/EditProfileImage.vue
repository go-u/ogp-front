<template>
  <q-page style="max-width: 680px; margin: 0 auto">
    <q-card-section class="q-pt-lg">
      <vue-cropper
        class="crop-radius"
        v-if="$route.name==='edit-avatar'"
        ref="cropper"
        :img="option.img"
        outputType="png"
        :fixed="true"
        :fixedNumber="[1, 1]"
        :fixedBox="true"
        :canMove="true"
        :canMoveBox="false"
        :autoCrop="true"
        :autoCropWidth="180"
        :autoCropHeight="180"
        :high="true"
        :info="false"
        :infoTrue="false"
        :enlarge="1"
        style="width: 300px; height: 300px;margin: 0 auto"
      ></vue-cropper>
      <vue-cropper
        v-if="$route.name==='edit-header'"
        ref="cropper"
        :img="option.img"
        outputType="png"
        :fixed="true"
        :fixedNumber="[2, 1]"
        :fixedBox="true"
        :canMove="true"
        :canMoveBox="false"
        :autoCrop="true"
        :autoCropWidth="900"
        :autoCropHeight="450"
        :high="true"
        :info="true"
        :infoTrue="true"
        :enlarge="3"
        style="width: 300px; height: 150px;margin: 0 auto"
      ></vue-cropper>
      <div v-if="option.img" class="text-center text-body1 text-weight-medium q-pt-xs">{{ $q.platform.is.mobile ? '画面をピンチして拡大・縮小' : 'マウスホイールで拡大・縮小'  }}</div>
      <input type="file" id="image" accept="image/png, image/jpeg, image/gif, image/jpg" @change="readImg($event)" style="display: none">
    </q-card-section>

    <q-card-section class="flex justify-around q-px-md">
      <q-btn icon="img:https://img.icons8.com/color/96/000000/image.png" size="1.17rem" @click="input" :label="option.img ? '画像を変更' : '画像を選ぶ'" class="full-width q-my-md text-black"/>
    </q-card-section>

    <q-card-actions class="row q-pa-md">
      <q-btn class="bg-white col-grow" @click="$router.go(-1)">Close</q-btn>
      <q-btn icon="sync" v-close-popup class="col-grow" color="light-blue" :loading="loading" :disabled="option.img===''" @click="upload">Update</q-btn>
    </q-card-actions>

  </q-page>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  name: 'EditProfileImage',
  components: { VueCropper },
  data () {
    return {
      loading: false,
      dialog: false,
      croppedImg: null,
      // crop: {},
      option: {
        img: ''
      }
    }
  },
  methods: {
    input () {
      document.getElementById('image').click()
    },
    validateFileSize (base64) {
      const maxSize = 3 * 1000 * 1000 // 3mb
      return (base64.length < (maxSize * 1.37) + 814)
    },
    backBtn: function () {
      this.$refs.cropper.remove()
      this.$router.go(-1)
    },
    readImg (e) {
      const file = e.target.files[0]
      if (file === undefined) { // 画像を選択し直したが、結局ファイルを指定しなかった場合 file === undefinedとなる
        return false
      }
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('対応していない画像ファイルです')
        return false
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        if (typeof e.target.result === 'object') {
          this.option.img = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          this.option.img = e.target.result
        }
      }
      reader.readAsArrayBuffer(file)
    },
    upload () {
      return new Promise((resolve, reject) => {
        this.$refs.cropper.getCropData((data) => {
          if (this.validateFileSize(data)) {
            this.croppedImg = data
            this.loading = true
            let action = 'user/UpdateAvatar'
            if (this.$route.name === 'edit-header') {
              action = 'user/UpdateHeader'
            }
            const payload = { image: this.croppedImg }
            this.$store.dispatch(action, { payload: payload })
              .then(() => {
                this.loading = false
                this.$router.push({ name: 'tab-profile' })
                alert('updated!')
                location.reload()
              }).finally((res) => {
                console.log(res)
                this.loading = false
              })
          } else {
            alert('too large image')
          }
        })
      })
    }
  }
}
</script>
