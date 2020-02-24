<template>
  <q-stepper
    ref="stepper"
    v-model="step"
    contracted
    animated
    active-color="light-blue"
    done-color="green"
  >
    <q-step
      :name="1"
      title="name"
      icon="settings"
      :done="step > 1"
    >
      <q-input
        filled
        v-model="displayName"
        label="ニックネーム"
        type="text"
        hint="後から変更できます"
        counter
        maxlength="15"
        lazy-rules
        :rules="[ val =>(0 < (val).length && (val).length < (16) ) || '1文字以上、15文字以内']"
        @keyup.enter="displayName.length > 0 ? $refs.stepper.next() : null"
      >
      </q-input>

    </q-step>

    <q-step
      :name="2"
      title="photo"
      icon="photo"
      :done="step > 2"
    >
      <vue-cropper
        v-if="option.img"
        class="crop-radius"
        ref="cropper"
        outputType="png"
        :img="option.img"
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
        style="width: 90%;padding-top: 90%; margin: 0 auto"
      ></vue-cropper>
      <div v-if="option.img" class="text-center text-body1 text-weight-medium q-pt-xs">{{ $q.platform.is.mobile ? '画面をピンチして拡大・縮小' : 'マウスホイールで拡大・縮小'  }}</div>
      <input type="file" id="image" accept="image/png, image/jpeg, image/gif, image/jpg" @change="readImg($event)" style="display: none">
      <q-btn icon="photo" size="1.17rem" @click="input" label="アイコン画像を選択" color="light-blue" class="full-width q-my-md"/>
    </q-step>

    <q-step
      :name="3"
      title="confirm"
      icon="check_box"
      class="text-center"
    >
      <q-img :src="croppedImg" style="width: 60%;max-width: 200px;border-radius: 50%;border: 1px solid grey"/>
      <div class="text-body1 q-pt-sm">{{ displayName }}</div>

    </q-step>

    <template v-slot:navigation>
      <q-stepper-navigation class="flex">
        <q-btn v-if="step > 1" flat color="grey" class="col-grow q-mr-sm" @click="$refs.stepper.previous()" label="Back" />
        <q-btn v-if="step === 1" @click="$refs.stepper.next()" color="light-blue" class="col-grow" label="NEXT" :disable="displayName.length === 0 "/>
        <q-btn v-if="step === 2" @click="cropAndNext" color="light-blue" class="col-grow" label="NEXT"/>
        <q-btn v-if="step === 3" color="light-blue" class="col-grow" label="規約に同意して利用開始" :loading="loadingBtn" @click="register"/>
      </q-stepper-navigation>
    </template>

  </q-stepper>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  name: 'RegistrationFormStepper',
  components: { VueCropper },
  data () {
    return {
      step: 1,
      displayName: this.$store.state.auth.oauthUser.displayname,
      croppedImg: null,
      checkbox: false,
      loadingBtn: false,
      option: {
        img: this.$store.state.auth.oauthUser.avatar || '/statics/images/icons/icons8/icons8-kawaii-egg-100.png'
      }
    }
  },
  methods: {
    input () {
      document.getElementById('image').click()
    },
    validateFileSize (base64) { // https://softwareengineering.stackexchange.com/questions/288670/know-file-size-with-a-base64-string
      const maxSize = 3 * 1000 * 1000 // 3mb
      return (base64.length < (maxSize * 1.37) + 814)
    },
    readImg (e) {
      const file = e.target.files[0]
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
    cropAndNext () {
      this.$refs.cropper.getCropData((data) => {
        if (this.validateFileSize(data)) {
          this.croppedImg = data // base64
          this.step += 1
        } else {
          alert('too large image')
        }
      })
    },
    register () {
      this.loadingBtn = true
      const payload = {
        displayname: this.displayName,
        avatar_base64: this.croppedImg
      }
      this.$store.dispatch('auth/Register', { payload: payload })
        .then((userDetail) => {
          this.$store.dispatch('auth/CheckAuthState')
          this.$router.push({ name: 'top' })
        }).catch((err) => {
          console.log(err)
          alert(err.message)
          this.loadingBtn = false
        })
    }
  }
}
</script>

<style>
  /* モバイルsafari / chromeで radius が効かないバグ有り */
  .crop-radius .cropper-view-box {
    border-radius: 50%;
  }
</style>
