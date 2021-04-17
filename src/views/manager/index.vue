<template>
  <div class="index-page">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="user-info">
          <template slot="header">用户信息</template>
          <div class="user-avatar">
            <el-avatar :src="user.photo" :size="80"></el-avatar>
            <div class="user-name">{{user.name}}</div>
          </div>
          <el-divider/>
          <div class="user-base">
            <div><span>在职公司：</span>{{user.enterprise}}</div>
            <div><span>在职部门：</span>{{user.department}}</div>
            <div><span>职位：</span>部门主管</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <amount-line-chart />
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="头像裁剪" :visible.sync="dialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align: center">
          <vue-cropper
            ref="cropper"
            :img="option.img"
            :output-size="option.outputSize"
            :output-type="option.outputType"
            :info="option.info"
            :full="option.full"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :auto-crop-height="option.autoCropHeight"
            :auto-crop-width="option.autoCropWidth"
            :fixed="option.fixed"
            :fixed-box="option.fixedBox"
            :fixed-number="option.fixedNumber"
            :info-true="option.infoTrue">
          </vue-cropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finishCrop" :loading="loading">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AmountLineChart from '@/views/components/charts/amount-line-chart'
import 'vuex'
import {mapState} from "vuex";
import {changePhoto} from "@/api/upload";

export default {
  name: "index",
  components: {AmountLineChart},
  data() {
    return {
      loading: false,
      dialogVisible: false,
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMove: true,
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
    }
  },
  methods: {
    changeUpload(file, fileList){
      this.photoInfo = file
      this.$nextTick(() =>{
        this.option.img = URL.createObjectURL(file.raw)
        console.log(this.option.img)
        this.dialogVisible = true
      })
    },
    finishCrop(){
      this.uploading = true
      this.$refs.cropper.getCropBlob((data) => {
        this.user.photo = URL.createObjectURL(data)
        this.uploading = false
        this.dialogVisible = false
        const formData = new FormData()
        let file = new File([data], this.photoInfo.name)
        formData.append('file', file)
        changePhoto(formData).then(res=>{
          if (res.data.code === 100) {
            this.$message.success(res.data.msg)
          }else {
            this.$message.error(res.data.msg)
          }
        })
      })
    },
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>

.index-page {
}

.user-info {
  height: 450px;
  .user-avatar {
    text-align: center;
    height: 250px;

    .user-name {
      font-weight: bold;
      padding-top: 20px;
    }
  }

  .user-base {
    div {
      padding: 10px;

      span {
        display: inline-block;
        width: 150px;
      }
    }
  }
}

.cropper-content {
  .cropper {
    width: auto;
    height: 500px;
  }
}
</style>
