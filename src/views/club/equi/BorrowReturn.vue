<template>
  <div id="borrow-return">
    <div class="form-header">
      <div style="width: 80%;float:left;">
        <el-input placeholder="请输入内容" v-model="search_input" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择查询条件">
            <el-option label="设备名称" value="0"></el-option>
            <el-option label="借出人" value="1"></el-option>
            <el-option label="状态" value="2"></el-option>
            <el-option label="全部" value="3"></el-option>
          </el-select>
          <el-button slot="append" @click="onSearch" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-button @click="toggleSelection()">取消选择</el-button>
      <!-- <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :default-sort="{prop: 'time_of_return', order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="设备名称" width="120"></el-table-column>
      <el-table-column prop="lender" label="借出人" width="80"></el-table-column>
      <el-table-column prop="lender_phone" label="联系方式" width="100"></el-table-column>
      <el-table-column prop="lender_time" label="借出时间" sortable width="180"></el-table-column>
      <el-table-column prop="time_of_return" label="归还时间" sortable width="180"></el-table-column>
      <el-table-column prop="num" label="数量" width="80"></el-table-column>
      <el-table-column prop="use" label="用途" width="120"></el-table-column>
      <el-table-column prop="administrator" label="管理员" width="120"></el-table-column>
      <el-table-column prop="status" label="状态" width="80"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改设备信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="借出人" :label-width="formLabelWidth">
          <el-input v-model="form.lender"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.lender_phone"></el-input>
        </el-form-item>
        <el-form-item label="借出时间" :label-width="formLabelWidth">
          <el-date-picker v-model="form.lender_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="归还时间" :label-width="formLabelWidth">
          <el-date-picker v-model="form.time_of_return" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="用途" :label-width="formLabelWidth">
          <el-input v-model="form.use"></el-input>
        </el-form-item>
        <el-form-item label="管理员" :label-width="formLabelWidth">
          <el-input v-model="form.administrator"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "BorrowReturn",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        lender: "",
        lender_phone: "",
        lender_time: "",
        num: "",
        use: "",
        time_of_return: "",
        administrator: "",
        status: "",
        id: ""
      },
      options: [
        {
          value: "0",
          label: "0-失败"
        },
        {
          value: "1",
          label: "1-审核通过"
        },
        {
          value: "2",
          label: "2-审核中"
        },
        {
          value: "3",
          label: "3-借出中"
        },
        {
          value: "4",
          label: "4-已归还"
        },
        {
          value: "5",
          label: "5-损坏"
        },
        {
          value: "6",
          label: "6-丢失"
        }
      ],
      formLabelWidth: "80px",
      search_input: "",
      select: "",
      tableData: [
        {
          name: "",
          lender: "",
          lender_phone: "",
          lender_time: "",
          num: "",
          use: "",
          time_of_return: "",
          administrator: "",
          status: "",
          id: ""
        }
      ],
      multipleSelection: [],
      select_index: ""
    };
  },
  methods: {
    handleEdit(index) {
      this.dialogFormVisible = true;
      this.select_index = index;
      this.form = this.tableData[index];
    },
    onEdit() {
      let club = sessionStorage.getItem("club");
      club = JSON.parse(club);
      let token = club["token"];
      let updateRec = axios.create();
      updateRec
        .post(
          this.$global.PHP_HOST + "/club/updaterec",
          {
            name: this.form.name,
            lender: this.form.lender,
            lender_phone: this.form.lender_phone,
            lender_time: Date.parse(this.form.lender_time),
            num: this.form.num,
            use: this.form.use,
            time_of_return: Date.parse(this.form.time_of_return),
            administrator: this.form.administrator,
            status: this.form.status,
            id: this.form.id
          },
          {
            headers: {
              token: token
            }
          }
        )
        .then(res => {
          if (res["data"]["message"] == "更新成功") {
            alert(res["data"]["message"]);
            this.tableData[this.select_index] = res["data"]["data"];
            this.dialogFormVisible = false;
          } else {
            alert(res["data"]["message"]);
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    handleDelete(index, row) {
      console.log(index, row["id"]);
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // let club = sessionStorage.getItem('club')
          // club = JSON.parse(club)
          // let token = club['token']
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onSearch() {
      let club = sessionStorage.getItem("club");
      club = JSON.parse(club);
      let token = club["token"];
      let getByConf = axios.create();
      getByConf
        .post(
          this.$global.PHP_HOST + "/club/getrecbyconf",
          {
            c_id: club["id"],
            flag: this.select,
            condition: this.search_input
          },
          {
            headers: {
              token: token
            }
          }
        )
        .then(res => {
          res = res["data"]["data"];
          this.tableData = Object.entries(res);
          for (let index = 0; index < this.tableData.length; index++) {
            this.tableData[index] = this.tableData[index][1];
          }
        })
        .catch(err => {
          console.log(err.response);
          alert(err.response["data"]["message"]);
        });
    }
  },
  created() {
    let club = sessionStorage.getItem("club");
    club = JSON.parse(club);
    let c_id = club["id"];
    let getInfo = axios.create();
    getInfo
      .post(
        this.$global.PHP_HOST + "/club/getrecord",
        {
          c_id: c_id
        },
        {
          headers: {
            token: club["token"]
          }
        }
      )
      .then(res => {
        res = res["data"]["data"];
        this.tableData = Object.entries(res);
        for (let index = 0; index < this.tableData.length; index++) {
          this.tableData[index] = this.tableData[index][1];
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  }
};
</script>
<style>
</style>