<template>
  <div v-if="employee">
    <el-form :model="employee" :rules="rules" label-width="80px" label-position="left">
      <el-card class="root-card">
      <el-row :gutter="20" style="margin-top:10px;">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>档案信息</span>
              </div>
              <div class="name-role">
                <el-col :span="16">
                  <el-form-item prop="name" label="姓名">
                    <el-input v-model="employee.name"></el-input>
                  </el-form-item>
                  <el-form-item prop="gender" label="性别">
                    <el-radio v-model="employee.gender" :label="0">女</el-radio>
                    <el-radio v-model="employee.gender" :label="1">男</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <div class="photo">
                    <div>
                      <el-upload
                        style="margin-right: 10px; border: 1px dotted; border-radius: 5px"
                        :show-file-list="false"
                        action="http://localhost:8081/upload/photo"
                        :auto-upload="false"
                        :on-change="changeUpload"
                      >
                        <el-image
                          v-if="origin_photo"
                          style="width: 100px;height: 100px;border-radius: 5px"
                          :src="origin_photo">
                        </el-image>
                        <i v-else style="width: 100px;height: 100px" class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </div>
                  </div>
                </el-col>
              </div>
              <el-divider></el-divider>
              <div class="tip">
                <div><span>温馨提示：</span>
                  <ol>
                    <li>档案的姓名、性别、出生日期是无法修改的哦！！！</li>
                    <li>如果学历是大学以下的，可以不填写毕业院校和主修专业</li>
                    <li>简历可以上传图片或者PDF文件哦</li>
                  </ol>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="16">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基本资料</span>
            </div>
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="出生日期" prop="birth">
                    <el-date-picker v-model="employee.birth" />
                  </el-form-item>
                  <el-form-item label="联系电话" prop="tel">
                    <el-input v-model="employee.tel">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="电子邮箱" prop="mail">
                    <el-input v-model="employee.mail">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="地址" prop="address">
                    <el-input v-model="employee.address">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="主修专业" prop="major">
                    <el-input v-model="employee.major">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="学历层次" prop="degree">
                    <el-select v-model="employee.degree" style="width: 100%">
                      <el-option v-for="(value, key) in degrees" :value="Number(key)" :label="value"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="毕业院校" prop="school">
                    <el-input v-model="employee.school">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="简历" prop="resume">
                    <el-upload
                      :show-file-list="false"
                      style="display: inline-block;float:right;"
                      :action="API_BASE + '/upload/resume'"
                      :before-upload="handleUploading"
                      :on-success="handleResumeUploadSucc"
                    >
                      <el-button type="text">上传简历</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
          </el-card>
        </el-col>
      </el-row>
      <div class="submit-button">
        <el-button @click="handleNewArchive" :disabled="uploading" type="primary">
          {{uploading?'正在上传...':'新建档案'}}
        </el-button>
      </div>
    </el-card>
    </el-form>
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
        <el-button type="primary" @click="finishCrop" :loading="uploading">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {API_BASE} from '@/utils/constants'
import {formatDate} from "@/utils/date";
import {degrees} from '@/utils/info-format'
import {createEmployeeInfo} from "@/api/info";
import {uploadPhoto} from '@/api/upload'
import {changeEmployeeInfo} from '@/api/info'

export default {
  name: "archive",
  data(){
    return{
      API_BASE,
      employee: {},
      origin_photo: null,
      degrees,
      uploading: false,
      dialogVisible: false,
      rules: {
        name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
        gender: [{required: true, message: '请选择性别', trigger: 'blur'}],
        birth: [{required: true, message: '请选择出生日期', trigger: 'blur'}],
        tel: [{required: true, message: '请输入电话', trigger: 'blur'}],
        mail: [{required: true, message: '请输入邮箱', trigger: 'blur'}],
        address: [{required: true, message: '请输入地址', trigger: 'blur'}],
        degree: [{required: true, message: '请选择学历', trigger: 'blur'}],
      },
      // 裁剪组件的基础配置option
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
    handleUploading(){
      this.uploading = true
    },
    changeUpload(file, fileList){
      this.photoInfo = file
      this.$nextTick(() =>{
        this.dialogVisible = true
        this.option.img = URL.createObjectURL(file.raw)
      })
    },
    finishCrop(){
      this.uploading = true
      this.$refs.cropper.getCropBlob((data) => {
        this.origin_photo = URL.createObjectURL(data)
        this.uploading = false
        this.dialogVisible = false
        const formData = new FormData()
        let file = new File([data], this.photoInfo.name)
        formData.append('file', file)
        uploadPhoto(formData).then(res=>{
          if (res.data.code === 100) {
            this.employee.photo = res.data.data
            this.$message.success(res.data.msg)
          }else {
            this.$message.error(res.data.msg)
          }
        })
      })
    },
    handleResumeUploadSucc(res){
      this.uploading = false
      if (res.code === 100) {
        this.$message.success(res.msg)
        this.employee.resume = res.data
      } else {
        this.$message.error(res.data.msg)
      }
    },
    handleNewArchive(){
      createEmployeeInfo(this.employee).then(res => {
        if (res.data.code === 100){
          this.$message.success(res.data.msg)
          if (res.data.data) {
            this.$router.push('/recruit/detail/' + res.data.data)
          }
        }else {
          this.$message.error(res.data.msg)
        }
      })
    },
    formatDate
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
* {
  font-size: 16px;
}

.root-card {
  padding-bottom: 30px;
}

.box-card {
  height: 400px;
}

.name-role {
  height:100px;
  font-size: 16px;

  .sender {
    height: 100px;
    line-height: 100px;
  }
}

.user-base {
  div {
    padding: 10px;

    span{
      display: inline-block;
      width: 150px;
    }
  }
}

.info-base {
  div {
    padding: 10px;
    width: 100%;

    span{
      display: inline-block;
      width: 300px;
    }
  }
}

.submit-button {
  padding-top: 40px;
  text-align: center;
}

.relation-item {
  padding: 10px;
}

.photo {
  width: 110px;
  height: 100px;
  float: right;

  div {
    width: 100px;
    height: 100%;
    line-height: 100px;
    display: inline-block;
    vertical-align: text-bottom;
  }
}

.photo-upload {
  width: 100px;
  height: 100px;
  line-height: 198px;
  display: inline-block;
  border: 1px dotted;
}

.cropper-content {
  .cropper {
    width: auto;
    height: 500px;
  }
}

.tip {
  ol {
    margin-left: 20px;

    li {
      font-size: 16px;
      padding-top: 10px;
    }
  }
}

</style>
