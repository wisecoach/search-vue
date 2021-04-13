<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px;">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>个人信息</span>
            </div>
            <div class="name-role">
              <div class="image-preview" style="float: left; width: 60px; height: 70px">
                <el-image
                  style="width: 70px; height: 70px"
                  :src="url"
                  :preview-src-list="srcList">
                </el-image>
              </div>
              <p class="sender">员工姓名 ： {{employee.name}}</p>
              <p class="registe-info">
                创建时间：{{employee.ctime}}
              </p>
            </div>
            <el-divider></el-divider>
            <div class="personal-relation">
              <div class="relation-item">联系电话：  <el-input  auto-complete="off" size="small" v-model="employee.tel" style="width: 75%;">{{employee.tel}}</el-input>
              </div>
            </div>
            <div class="personal-relation">
              <div class="relation-item">电子邮箱：  <el-input  auto-complete="off" size="small" v-model="employee.mail" style="width: 75%;">{{employee.mail}}</el-input>
              </div>
            </div>
            <div class="personal-relation">
              <div class="relation-item">在职状态:  <div style="float: right; padding-right:20px;">{{employee.hired}}</div></div>
            </div>
            <div class="personal-relation">
              <div class="relation-item">所属企业ID/企业内ID:  <div style="float: right; padding-right:20px;">{{employee.entid}} / {{employee.innid}}</div></div>
            </div>
            <div class="personal-relation">
              <div class="relation-item">HrID/部门ID:  <div style="float: right; padding-right:20px;">{{employee.hr.id}} / {{employee.depid}}</div></div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基本资料</span>
            </div>
            <div>
              <el-form label-width="80px" v-model="dataFrom" size="small" label-position="right">
                <div class="personal-relation">
                  <div class="relation-item">性别:  <div style="float: right; padding-right:20px;">{{employee.gender}}</div></div>
                </div>
                <div class="personal-relation">
                  <div class="relation-item">出生日期:  <div style="float: right; padding-right:20px;">{{employee.birth}}</div></div>
                </div>
                <div class="personal-relation">
                  <div class="relation-item">工龄：  <div style="float: right; padding-right:20px;">{{employee.seniority}}</div></div>
                </div>
                <div class="personal-relation">
                  <div class="relation-item">户籍地址：  <el-input  auto-complete="off" size="small" v-model="employee.address" style="width: 88%;">{{employee.address}}</el-input></div>
                </div>
                <div class="personal-relation">
                  <div class="relation-item">主修专业：  <el-input  auto-complete="off" size="small" v-model="employee.major" style="width: 88%;">{{employee.major}}</el-input></div>
                </div>
                <div class="personal-relation">
                  <div class="relation-item">学历层次：  <el-input  auto-complete="off" size="small" v-model="employee.degree" style="width: 88%;">{{employee.degree}}</el-input></div>
                </div>
                <div class="personal-relation">
                  <div class="relation-item">毕业院校：  <el-input  auto-complete="off" size="small" v-model="employee.school" style="width: 88%;">{{employee.school}}</el-input></div>
                </div>
                <div class="personal-relation">
                  <div class="relation-item">个人简历：
                    <div style="float: right"><el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                      <el-tooltip placement="top">
                        <div slot="content">仅限jpg/png/pdf文件，<br/>大小不超过2MB。</div>
                    <el-button size="small" type="primary" style="margin-right: 8px">上传简历</el-button></el-tooltip>
                  </el-upload></div>
                    </div>
                </div>
              </el-form>
            </div>
          </el-card>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  name: "info-update",
  props: {
    employee: {
      type: Object,
      default: {
        "id": 0,
        "ctime": null,
        "name": "NAME:0page1",
        "birth": "2021-04-08T09:00:47.704+00:00",
        "gender": 0,
        "seniority": null,
        "degree": 1,
        "school": null,
        "entid": null,
        "depid": null,
        "major": null,
        "tel": "17333072508",
        "hired": true,
        "photo": "",
        "address": "你猜我家在哪",
        "mail": "17333072508@qq.com",
        "resume": "",
        "enterprise": "果蔬文化有限公司",
        "department": "技术部",
        "hr": {
          "id": null,
          "ctime": null,
          "username": null,
          "enterprise": null,
          "name": null,
          "photo": null
        },
        "innid": "0"
      }
    }
  },
  data(){
    return{
      dataForm:{

      },
      //文件
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],

      //头像
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
    }
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.image-preview{
  width:300px;
  height:120px;
  float:left;
}
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
  height: 500px;
}

.name-role {
  width:350px;
  height:70px;
  font-size: 16px;
  padding: 5px;
  text-align:right;
}
.sender{
  text-align:right;
  padding-top: 20px;
}
.registe-info{
  text-align: right;
  padding-top:1px;
}
.personal-relation {
  font-size: 16px;
  padding: 0px 5px 13px;
  margin-right: 1px;
  width: 100%
}

.relation-item {
  padding: 2px;
}
.dialog-footer{
  padding-top:10px ;
  padding-left: 10%;
}
//布局样式区
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.info-updated-left{
  float: left;
}

.info-updated-right{
  float: right;
}

</style>
