import './Charts.scss';
import React, { Component } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchReport, EMPLYEES_COUNT_BY_SEX } from '../../ducks/Reports';
import { sex as sexEnum } from '../../enums'

const allReports = [EMPLYEES_COUNT_BY_SEX];

class Charts extends Component {
    componentDidMount() {
        allReports.forEach(r => this.props.fetchReport(r));
    }

    renderSpinner() {
        return <Spinner color="primary" />;
    }

    renderSexChart() {
        const chart = this.props.charts[EMPLYEES_COUNT_BY_SEX];

        const data = Object.keys(chart.data).map(k => ({ name: sexEnum[k], value: chart.data[k] }));
        const colors = ['#0088FE', '#00C49F'];

        return (
            <div className="charts-chart">
                <h4>Разрез по полам</h4>
                {chart.loadComplete && (
                    <PieChart width={400} height={400}>
                        <Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={100} outerRadius={80} fill="#8884d8" label>
                            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                )}
                {!chart.loadComplete && this.renderSpinner()}
            </div>
        );
    }

    render() {
        return (
            <div className="charts">
                {this.renderSexChart()}
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