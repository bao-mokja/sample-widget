"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _lodash = require("lodash");

var _reactChartjs = require("react-chartjs-2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Main extends _react.default.Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      department: [],
      pieColors: [],
      departmentCount: []
    };
  }

  componentDidMount() {
    _axios.default.get('https://guarded-retreat-59643.herokuapp.com/project/getProjects').then(response => {
      const mapByDepartment = project => project.projectSponsorDepartment;

      const countPerDepartment = (0, _lodash.groupBy)(response.data.projects, mapByDepartment);
      /*const departmentNames = response.data.projects
      .map(project => project.projectSponsorDepartment) // get all media types
      .filter((department, index, array) => array.indexOf(department) === index); // filter out duplicates
       const count = departmentNames.map(department => ({
          name: department,
          count: response.data.projects.filter(item => item.projectSponsorDepartment === department).length
       }));*/

      const data = Object.values(countPerDepartment).map(project => project.length);
      const labels = Object.keys(countPerDepartment);
      const colors = [];

      for (let i = 0; i < data.length; i++) {
        colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
      }

      this.setState({
        department: labels,
        departmentCount: data,
        pieColors: colors,
        projects: response.data.projects
      });
    }).catch(err => {});
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactChartjs.Pie, {
      data: {
        labels: this.state.department,
        datasets: [{
          label: "# Project per department",
          backgroundColor: this.state.pieColors,
          data: this.state.departmentCount
        }]
      }
    }));
  }

}

var _default = Main;
exports.default = _default;