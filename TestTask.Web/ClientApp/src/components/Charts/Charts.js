import './Charts.scss';
import React, { Component } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchReport, EMPLOYEES_COUNT_BY_SEX, EMPLOYEES_COUNT_BY_DECADES } from '../../ducks/Reports';
import { sex as sexEnum } from '../../enums'

const width = 400;
const height = 400;
const allReports = [EMPLOYEES_COUNT_BY_SEX, EMPLOYEES_COUNT_BY_DECADES];

class Charts extends Component {
    componentDidMount() {
        allReports.forEach(r => this.props.fetchReport(r));
    }

    renderChart(title, loadComplete, renderFunc) {
        return (
            <div style={{width, height}} className="charts-chart d-inline-block text-center">
                <h5>{title}</h5>
                {loadComplete && renderFunc()}
                {!loadComplete && <Spinner color="primary" />}
            </div>
        );
    }

    renderEmployeesBySexChart() {
        const chart = this.props.charts[EMPLOYEES_COUNT_BY_SEX];
        const data = Object.keys(chart.data).map(k => ({ name: sexEnum[k], value: chart.data[k] }));
        const colors = ['#0088FE', '#00C49F'];

        const renderFunc = () => {
            return (
                <PieChart width={width} height={height}>
                    <Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={100} outerRadius={80} fill="#8884d8" label>
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)}
                    </Pie>
                    <Tooltip />
                </PieChart>
            );
        }

        return this.renderChart('Разрез по полам', chart.loadComplete, renderFunc);
    }

    renderEmployeesByDecadesChart() {
        const chart = this.props.charts[EMPLOYEES_COUNT_BY_DECADES];
        const data = Object.keys(chart.data).map(k => ({ name: k, value: chart.data[k] }));

        const renderFunc = () => {
            return (
                <PieChart width={width} height={height}>
                    <Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={100} outerRadius={80} fill="#8884d8" label />
                    <Tooltip />
                </PieChart>
            );
        }

        return this.renderChart('Разрез по десятилетиям рождения', chart.loadComplete, renderFunc);
    }

    render() {
        return (
            <div className="charts">
                {this.renderEmployeesBySexChart()}
                {this.renderEmployeesByDecadesChart()}
            </div>
        );
    }
}

export default connect(state => {
    return {
        charts: state.reports
    };
}, { fetchReport }
)(Charts);