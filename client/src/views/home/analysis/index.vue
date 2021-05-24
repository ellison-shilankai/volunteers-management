<template>
  <div id="analysis">
    <div id="constitute" style="width: 800px; height: 400px"></div>
    <div id="time" style="width: 800px; height: 400px"></div>
    <h1>最受欢迎的活动类型及活动</h1>
    <div id="main" style="width: 800px; height: 600px"></div>
  </div>
</template>
<script>
import Api from "@/api";
export default {
  name: "analysis",
  data() {
    return {
      userList: {
        admin: [],
        volunteer: [],
        organizer: [],
      },
      orgListNumber: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      actList: {
        Number: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        total: 10,
        // 三个0分别代表社区服务，爱国介绍，其他的数量
        type: [0, 0, 0],
      },
      userActList: {
        Number: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        total: 10,
        actName: [],
        volunteer: [],
      },
    };
  },
  created() {},
  mounted() {
    this.drawChart();
  },
  methods: {
    async drawChart() {
      await this.getUserList();
      await this.getOrgList();
      await this.getActivityList();
      await this.getUserAct();
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      let myChartConstitute = this.$echarts.init(
        document.getElementById("constitute")
      );
      let myTime = this.$echarts.init(document.getElementById("time"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "志愿者活动管理网站用户组成",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "组成部分",
            type: "pie",
            radius: "50%",
            data: [
              { value: this.userList.volunteer.length, name: "志愿者" },
              { value: this.userList.admin.length, name: "管理员" },
              { value: this.userList.organizer.length, name: "志愿者组织" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      let option1 = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          data: [
            "社区服务",
            "爱国建设",
            "其他",
            this.userActList.actName[0],
            this.userActList.actName[1],
            this.userActList.actName[2],
            this.userActList.actName[3],
          ],
        },
        series: [
          {
            name: "活动类型",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            label: {
              position: "inner",
              fontSize: 14,
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.actList.type[0], name: "社区服务" },
              { value: this.actList.type[1], name: "爱国建设" },
              { value: this.actList.type[2], name: "其他", selected: true },
            ],
          },
          {
            name: "活动名",
            type: "pie",
            radius: ["45%", "60%"],
            labelLine: {
              length: 30,
            },
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#F6F8FC",
              borderColor: "#8C8D8E",
              borderWidth: 1,
              borderRadius: 4,

              rich: {
                a: {
                  color: "#6E7079",
                  lineHeight: 22,
                  align: "center",
                },
                hr: {
                  borderColor: "#8C8D8E",
                  width: "100%",
                  borderWidth: 2,
                  height: 0,
                },
                b: {
                  color: "#4C5058",
                  fontSize: 14,
                  fontWeight: "bold",
                  lineHeight: 33,
                },
                per: {
                  color: "#fff",
                  backgroundColor: "#4C5058",
                  padding: [3, 4],
                  borderRadius: 4,
                },
              },
            },
            data: [
              {
                value: this.userActList.volunteer[0],
                name: this.userActList.actName[0],
              },
              {
                value: this.userActList.volunteer[1],
                name: this.userActList.actName[1],
              },
              {
                value: this.userActList.volunteer[2],
                name: this.userActList.actName[2],
              },
              {
                value: this.userActList.volunteer[3],
                name: this.userActList.actName[3],
              },
            ],
          },
        ],
      };
      let option2 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["参加活动", "组织成立", "活动发布"],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "活动发布",
            min: 0,
            max: this.actList.total,
            interval: 5,
            axisLine: {
                lineStyle: {
                    color: '#5470C6'
                }
            },
            axisLabel: {
              formatter: "{value} 人",
            },
          },
          {
            type: "value",
            name: "参加活动",
            min: 0,
            max: this.userActList.total,
            interval: 5,
            axisLine: {
                lineStyle: {
                    color: 'rgba(237, 241, 11, 1)'
                }
            },
            axisLabel: {
              formatter: "{value} 人",
            },
          },
        ],
        series: [
          {
            name: "活动发布",
            type: "bar",
            data: this.actList.Number,
          },
          {
            name: "组织成立",
            type: "bar",
            data: this.orgListNumber,
          },
          {
            name: "参加活动",
            type: "line",
            yAxisIndex: 1,
            data: this.userActList.Number,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChartConstitute.setOption(option);
      myChart.setOption(option1);
      myTime.setOption(option2);
    },
    async getUserList() {
      const { data: res } = await Api.getUserList();
      res.userList.forEach((item) => {
        if (item.status === "volunteer") {
          this.userList.volunteer.push(item);
        } else if (item.status === "organizer") {
          this.userList.organizer.push(item);
        } else {
          this.userList.admin.push(item);
        }
      });
    },
    async getOrgList() {
      const { data: res } = await Api.getOrganizeList();
      res.orgList.forEach((item) => {
        this.orgListNumber[this.formatDate(item.createdAt)]++;
      });
    },
    formatDate(time) {
      // 获取单元格数据
      let data = time;
      if (data == null) {
        return null;
      }
      let dt = new Date(data);
      //真实月份需加一
      return dt.getMonth();
    },
    //获取活动
    async getActivityList() {
      const { data: res } = await Api.getActivityList();
      res.activities.forEach((item) => {
        this.actList.Number[this.formatDate(item.createdAt)]++;
        if (item.type === "社区服务") {
          this.actList.type[0]++;
        } else if (item.type === "爱国建设") {
          this.actList.type[1]++;
        } else {
          this.actList.type[2]++;
        }
      });
      this.actList.total = res.activities.length;
    },
    //获取参加人数
    async getUserAct() {
      const { data: res } = await Api.getUserAct();
      let obj = {};
      res.info.forEach((item) => {
        this.userActList.Number[this.formatDate(item.createdAt)]++;
        if (!obj[item.actName]) {
          obj[item.actName] = 1;
        } else {
          obj[item.actName]++;
        }
      });
      this.userActList.total = res.info.length;
      // this.userActList.actName.sort((a,b) => {
      //   return a-b
      let temp = Object.keys(obj).sort(function (a, b) {
        return obj[b] - obj[a];
      });
      for (let k in temp) {
        // this.userActList.actName[temp[k]] = obj[temp[k]]
        this.userActList.actName.push(temp[k]);
        this.userActList.volunteer.push(obj[temp[k]]);
      }
      // console.log(this.userActList.actName)
      // console.log(JSON.stringify(this.userActList.actName))
      // temp = temp.sort(function(a,b){return this.userActList.actName[a]-this.userActList.actName[b]});
    },
  },
};
</script>
