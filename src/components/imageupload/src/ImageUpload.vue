<template>
  <div class="mint-cell">
    <div class="mint-cell-wrapper">
      <div class="mint-cell-title upload-title">
        <span class="mint-cell-text">{{title}}</span>
        <span class="mint-cell-label">{{helper}}<slot name="cellLabel"></slot></span>
      </div>
      <div class="upload-value">
        <div v-for="(item, index) in imageList" :key="index"  class="upload-preview">
          <img :src="item.imageBaseUrl" width="120" height="120" style="border-radius: 8px;box-sizing: border-box;" @click="previewImage(index)">
          <a class="upload-del" @click="removeImage(index)">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8177" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" fill="#e0322c"><path d="M512 96C281.118 96 96 281.118 96 512c0 230.872 185.118 416 416 416 230.87 0 416-185.128 416-416C928 281.118 742.872 96 512 96zM720.004 661.762l-58.24 58.234L512 570.234l-149.762 149.762-58.242-58.234L453.762 512l-149.766-149.762 58.242-58.232L512 453.762l149.762-149.756 58.24 58.232L570.238 512 720.004 661.762z" p-id="8178"></path></svg>
          </a>
        </div>
        <div class="upload-add" v-show="imageList.length < limit" @click="cancelUpload">
         <vue-core-image-upload
          class="upload-add-btn"
          :crop="false" 
          :isXhr="isXhr"
          inputAccept="image/*"
          :credentials="false"
          :max-file-size="10240000"
          @imageuploaded="imageUploaded"
          @imagechanged="imageChanged"
          @imageuploading="imageuploading"
          @errorhandle="imageError"
          :data="imageData()"
          :multiple="multiple"
          :multiple-size="limit"
          inputOfFile='file'
          url="//upload-z1.qiniu.com">
          <div :style="{width: uploadPercent}"  class="progress" v-if="uploading"></div>
          <div class="image-mask" v-if="uploading"></div>
          <img v-if="uploading" :src="tempImage" width="120" height="120" style="border-radius: 8px;box-sizing: border-box;" />
          <div class="upload-add-icon">
						<img :src="require('@/assets/upload_add.png')" />
					</div>
					<p class="upload-text">上传出借凭证（记录、合同）照片或截图</p>
				</vue-core-image-upload>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import config from '@/config/config'
  import compressImage from '@/utils/compressImage'
  import VueCoreImageUpload from 'vue-core-image-upload'
  import moment from 'moment'
  export default {
    name: 'image-upload',
    data () {
      return {
        imageList: [],
        uploading: false,
        tempImage: '',
        uploadPercent: '0',
        isXhr: true,
        fileType: '.jpg'
      }
    },
    props: {
      'title': String,
      'limit': {type: Number, default: 50},
      'min': {type: Number, default: 0},
      'show': Array,
      'helper': String,
      'imgType': String,
      'modules': String,
      'token': String,
      'multiple': Boolean
    },
    methods: {
      imageChanged (file) {
        const type = file.type
        this.fileType = '.' + type.split('/')[1]
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = e => {
          const imageBaseUrl = e.currentTarget.result
          compressImage(imageBaseUrl).then((baseUrl) => {
            this.tempImage = baseUrl
            this.uploadPercent = '90%'
          })
        }
      },
      imageuploading () {
        this.uploading = true
        this.uploadPercent = '10%'
      },
      imageUploaded (res) {
        if (res.code === '200') {
          var imageRespose = res.data.image_id
          this.uploadPercent = '100%'
          if (imageRespose) {
            this.imageList.push({
              'imageId': imageRespose,
              'imageBaseUrl': this.tempImage
            })
            this.$emit('input', this.imageList.map(item => item.imageId))
						console.log(this.imageList)
            this.$vux.toast.show({
							width: 'auto',
							type: 'success',
							text: '图片上传成功'
						})
            this.clearImage()
          }
        } else {
          this.clearImage()
          var errorMsg = res.error
					this.$vux.toast.show({
						width: 'auto',
						type: 'cancel',
						text: errorMsg || '图片上传失败，请重试'
					})
        }
      },
      imageError (error) {
        this.clearImage()
        console.log(error)
        this.$vux.toast.show({
					width: 'auto',
					type: 'cancel',
					text: '图片上传失败，请重试'
				})
      },
      previewImage (index) {
        
      },
      clearImage () {
        this.uploading = false
        this.tempImage = ''
        this.uploadPercent = '0'
      },
      cancelUpload () {
        /*if (!this.uploading) {
          return
        }
        this.clearImage()*/
      },
      removeImage (index) {
        this.uploading = false
        this.imageList.splice(index, 1)
        this.$emit('input', this.imageList.map(item => item.imageId))
      },
      imageData () {
        const nameDate = moment().format('YYYYMMDD_hmmss')
        const randomKey = Math.round((Math.random() * 1000))
        const name = config.defaultParam.terminalType + '_' + this.imgType + '_' + this.modules + '_' + nameDate + randomKey + this.fileType
        return {
          'name': name,
          'chunk': 0,
          'x:terminaltype': config.defaultParam.terminalType,
          'chunks': 1,
          'key': name,
          'token': this.token,
          'x:modelname': this.modules
        }
      }
    },
    watch: {
      show: function (val) {
        if (Array.isArray(val) && val.length > 0) {
          val.forEach((item, index) => {
            this.$set(this.imageList, index, item)
          })
        }
      }
    },
    components: {
      VueCoreImageUpload
    }
  }
</script>
<style lang="css">
  .upload-value{
    padding: 10px 0;
    box-sizing: border-box;
  }
  .g-core-image-upload-btn{
    float: left;
    position: relative;
  }
  .upload-title{
    width: auto;
    flex: none !important;
    font-size: 15px;
  }
  .upload-preview{
    float: left;
		width: 120px;
		height: 120px;
    position: relative;
    border-radius: 8px;
    box-sizing: border-box;
    border: 1px solid #bbbbbb;
    margin: 0 5px 5px 0; 
  }
  .upload-del{
    position: absolute;
    top: -8px;
    right: -10px;
    z-index: 99;
    width: 24px;
    height: 24px;
  }
  .upload-add{
    width: auto;
    height: 120px;
    border-radius: 2px;
		background:#f2f2f2;
    box-sizing: border-box;
    margin: 0 3px 3px 0; 
  }
  .upload-add-btn{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .helper-text{
    text-align: right;
    padding: .2rem .8rem;
    color: #999999;
    font-size: .6rem;
  }
  .progress{
    height: 2px; 
    background: #26a2ff;
    position: absolute;
    bottom: .2rem;
    left: 0;
    width: 0;
    transition: width 3s;
    z-index: 999;
  }
  .image-mask{
    background: #000000;
    filter:alpha(Opacity=30);
    opacity: 0.3;
    width: 100%;
    position: absolute;
    height: 100%;
    z-index: 10;
    border-radius: 8px;
  }
	.upload-text{
		text-align:center;
		position:absolute;
		width:100%;
		font-size:12px;
		color:#999;
		left:0;
		bottom:20px;
	}
	.upload-add-icon{
		width:32px;
		height:32px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -16px;
		margin-top: -24px;
	}
	.upload-add-icon > img{
		width:100%;
		height:100%;
	}
</style>