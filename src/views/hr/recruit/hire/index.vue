<template>
  <div v-if="employee">
    <el-form ref="form" :model="employee" :rules="rules" label-width="80px" label-position="left">
      <el-card class="root-card">
        <el-row :gutter="20" style="margin-top:10px;">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>录用信息填写</span>
                </div>
                <div class="name-role">
                  <el-col :span="12">
                    <div class="sender">员工姓名：{{employee.name}}</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="photo">
                      <div>
                        <el-upload
                          style="margin-right: 10px; border: 1px dotted; border-radius: 5px"
                          :show-file-list="false"
                          action="http://localhost:8081/upload/photo"
                          :auto-upload="false"
                          :on-change="changeUpload"
                        >
                          <i style="width: 100px;height: 100px" class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </div>
                      <div>
                        <el-image
                          style="width: 100px;height: 100px;margin-left: 20px;border-radius: 5px"
                          :src="origin_photo">
                        </el-image>
                      </div>
                    </div>
                  </el-col>
                </div>
                <el-divider></el-divider>
                <el-form-item label="员工编号" prop="innid">
                  <el-input v-model="employee.innid"></el-input>
                </el-form-item>
                <el-form-item label="职业" prop="occid">
                  <occupation-picker :check-strictly="false" @select="(val) => {this.employee.occid = val}"/>
                </el-form-item>
                <el-form-item label="部门" prop="depid">
                  <department-picker v-model="employee.depid" />
                </el-form-item>
              </el-card>
            </div>
          </el-col>
          <el-col :span="16">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>基本资料修改</span>
              </div>
                <el-row :gutter="30">
                  <el-col :span="12">
                    <el-form-item label="性别">
                      {{employee.gender==1?'男':'女'}}
                    </el-form-item>
                    <el-form-item label="出生日期">
                      {{formatDate(employee.birth, 'yyyy-MM-dd')}}
                    </el-form-item>
                    <el-form-item label="工龄">
                      {{employee.seniority && employee.seniority.toFixed(1) || 0.0}}年
                    </el-form-item>
                    <el-form-item label="联系电话">
                      <el-input v-model="employee.tel">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱">
                      <el-input v-model="employee.mail">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="地址">
                      <el-input v-model="employee.address">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="主修专业">
                      <el-input v-model="employee.major">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="学历层次">
                      <el-select v-model="employee.degree" style="width: 100%">
                        <el-option v-for="(value, key) in degrees" :value="Number(key)" :label="value"/>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="毕业院校">
                      <el-input v-model="employee.school">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="简历">
                      <a target="_blank" :href="employee.resume">查看简历</a>
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
          <el-button @click="handleHire" :disabled="uploading" type="primary">
            {{uploading?'正在上传...':'确认录用'}}
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
import {searchInfobyId, changeEmployeeInfo} from "@/api/info";
import {uploadPhoto} from '@/api/upload'
import {getEmployed} from '@/api/career'
import DepartmentPicker from "@/components/department-picker";
import OccupationPicker from '@/components/occupation-picker';

export default {
  name: "hire",
  components: {DepartmentPicker, OccupationPicker},
  data(){
    return{
      API_BASE,
      photoInfo: null,
      employee: null,
      origin_photo: null,
      new_photo: null,
      degrees,
      uploading: false,
      dialogVisible: false,
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
      rules: {
        depid: [{required: true, message: '请选择该员工要录入的部门', trigger: 'blur'}],
        occid: [{required: true, message: '请选择要录用的职业', trigger: 'blur'}],
        innid: [{required: true, message: '请输入该员工在您的企业内的员工编号', trigger: 'blur'}],
      }
    }
  },
  methods: {
    init(){
      this.getEmployee()
    },
    getEmployee(){
      searchInfobyId(this.$route.params.id).then(res => {
        if (res.data.code === 100) {
          this.employee = res.data.data
          this.origin_photo = this.employee.photo
          this.employee.photo = null
        }
      })
    },
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
            this.$message.success("文件上传成功")
          } else {
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
    handleHire(){
      this.$refs.form.validate(valid=>{
        if (!valid){
          return false
        }
        this.employee.empid = this.employee.id
        getEmployed({employee: this.employee, occid: this.employee.occid}).then(res => {
          if (res.data.code === 100) {
            this.$message.success(res.data.msg)
            this.handleUpdate()
          }else {
            this.$message.error(res.data.msg)
          }
        })
      })
    },
    handleUpdate(){
      changeEmployeeInfo(this.employee).then(res => {
        if (res.data.code === 100) {
          this.$router.push('/employee/detail/' + this.employee.id)
        }
      })
    },
    formatDate
  },
  computed: {
    hr() {
      return this.$store.state.user.user
    }
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
  height: 430px;
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
  width: 220px;
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

</style>
