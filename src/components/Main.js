import React from 'react';
import axios from 'axios';
import { groupBy } from 'lodash';
import {Pie} from 'react-chartjs-2'


class Main extends React.Component{
    constructor(){
        super();
        this.state = {
            projects: [],
            department: [],
            pieColors: [],
            departmentCount: []
        }
    }

    componentDidMount(){
        axios
          .get('https://guarded-retreat-59643.herokuapp.com/project/getProjects')
    
          .then(response => {

            const mapByDepartment = project => project.projectSponsorDepartment;
            const countPerDepartment = groupBy(response.data.projects, mapByDepartment); 

            /*const departmentNames = response.data.projects
            .map(project => project.projectSponsorDepartment) // get all media types
            .filter((department, index, array) => array.indexOf(department) === index); // filter out duplicates

            const count = departmentNames.map(department => ({
                name: department,
                count: response.data.projects.filter(item => item.projectSponsorDepartment === department).length
             }));*/
            const data = Object.values(countPerDepartment).map(project => project.length);
            const labels = Object.keys(countPerDepartment); 
            
            const colors=[];

            for(let i=0;i<data.length;i++){
                colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
            }
           
            this.setState({ 
                department: labels,
                departmentCount: data,
                pieColors: colors,
                projects: response.data.projects
            });
          })
          .catch((err)=> {})
      }

    render() {
        return (
            <div>
                <Pie
                    data={{
                        labels: this.state.department,
                        datasets: [{
                        label: "# Project per department",
                        backgroundColor: this.state.pieColors,
                        data: this.state.departmentCount,
                        }]
                    }}
                />
            </div>
        );
    }
}



export default Main;