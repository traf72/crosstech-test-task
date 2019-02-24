import './Employees.scss';
import React, { Component } from 'react';
import DataGrid from '../common/DataGrid';
import Button from '../common/Button';
import ProtectedComponent from '../ProtectedComponent';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { newEmployee, editEmployee } from '../../routes';
import { connect } from 'react-redux';
import { fetch, deleteEmployee, selector } from '../../ducks/Employees';
import { allActions as pageLoaderActions } from '../../ducks/PageLoader';

class Employees extends Component {
    columns = [
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
        {
            Header: '',
            accessor: '',
            width: 45,
            Cell: e => (
                <ProtectedComponent allowedRoles={['Admin']}>
                    <Link to={editEmployee.buildUrl({ id: e.original.id })}>
                        <FontAwesomeIcon icon="edit" />
                    </Link>
                    {/* eslint-disable-next-line */}
                    <a href="#" className="ml-1" onClick={() => this.deleteEmp(e.original.id)}><FontAwesomeIcon icon="trash-alt" /></a>
                </ProtectedComponent>
            ),
        },
    ];

    componentDidMount() {
        this.props.fetch();
    }

    deleteEmp(id) {
        if (window.confirm('Сотрудник будет удалён, продолжить?')) {
            this.props.deleteEmployee(id);
        }
    }

    render() {
        return (
            <div className="employee-list">
                <ProtectedComponent allowedRoles={['Admin']}>
                    <Link to={newEmployee.url}>
                        <Button color="primary" icon="plus" className="mb-3">Добавить</Button>
                    </Link>
                </ProtectedComponent>

                <DataGrid
                    data={this.props.employees.data}
                    columns={this.columns}
                    loading={!this.props.employees.loadComplete}
                    showPageSizeOptions={false}
                    showPagination={false}
                />
            </div>
        );
    }
}

export default connect(state => {
    return {
        employees: selector(state.employees),
    };
}, { ...pageLoaderActions, fetch, deleteEmployee }
)(Employees);