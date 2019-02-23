import './Employees.scss';
import React, { Component } from 'react';
import DataGrid from '../common/DataGrid';
import Button from '../common/Button';
import { connect } from 'react-redux';
import { fetch, selector } from '../../ducks/Employees';
import { allActions as pageLoaderActions } from '../../ducks/PageLoader';

const columns = [
    {
        Header: 'Имя',
        accessor: 'firstName',
        minWidth: 150,
        maxWidth: 350,
    },
    {
        Header: 'Отчество',
        accessor: 'patronymic',
        minWidth: 150,
        maxWidth: 350,
    },
    {
        Header: 'Фамилия',
        accessor: 'lastName',
        minWidth: 150,
        maxWidth: 350,
    },
    {
        Header: 'Пол',
        accessor: 'sex',
        width: 120,
    },
    {
        Header: 'Должность',
        accessor: 'position.name',
        minWidth: 150,
        maxWidth: 250,
    },
    {
        Header: 'Дата рождения',
        accessor: 'birthDate',
        width: 110,
        Cell: e => <span>{e.original.birthDate.toLocaleDateString()}</span>,
    },
    {
        Header: 'Телефон',
        accessor: 'phone',
        width: 160,
    },
];

class Employees extends Component {
    componentDidMount() {
        this.props.fetch();
    }

    render() {
        return (
            <DataGrid
                data={this.props.employees.data}
                columns={columns}
                loading={!this.props.employees.loadComplete}
                showPageSizeOptions={false}
                showPagination={false}
            />
        );
    }
}

export default connect(state => {
    return { employees: selector(state.employees) };
}, { ...pageLoaderActions, fetch }
)(Employees);