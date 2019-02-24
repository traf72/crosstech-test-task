import './Edit.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Col, FormGroup, Label, Input } from 'reactstrap';
import InputMask from '../common/InputMask';
import Button from '../common/Button/';
import Select from '../common/Select';
import DatePicker from '../common/DatePicker';
import ValidationMessage from '../common/ValidationMessage';
import { SEX, POSITIONS, fetchCatalog } from '../../ducks/Catalog';
import { saveEmployee, employeeNewSelector, employeeFullSelector, fetchEmployee, newEmployee, employeeCatalogs } from '../../ducks/Employee';
import { showWarningAlert } from '../../ducks/Alert';
import { allActions as pageLoaderActions } from '../../ducks/PageLoader';
import { phoneMask } from '../../constants';
import { requireValidator, phoneValidator } from '../../libs/validators';

export class Edit extends Component {
    static getDerivedStateFromProps(props, state) {
        if (state.loadComplete) {
            return null;
        }

        const { employee } = props;

        let loadComplete = employee.loadComplete;
        if (state.loadComplete == null) {
            loadComplete = loadComplete && employee.isActual;
        }

        if (!loadComplete) {
            return { loadComplete };
        }

        return {
            loadComplete: true,
            employee,
        }
    }

    state = {
        employee: {},
        loadComplete: null,
        isFormSubmitted: false,
    }

    componentDidMount() {
        if (this.state.loadComplete) {
            return;
        }

        this.props.showPageLoader();

        if (this.isNewEmployee()) {
            this.props.newEmployee();
        } else {
            this.props.fetchEmployee(this.props.id);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((!prevState.loadComplete && this.state.loadComplete)
            || (prevProps.employee.saveInProgress && !this.props.employee.saveInProgress)) {
            this.props.hidePageLoader();
        }
    }

    isNewEmployee() {
        return !this.props.id;
    }

    getEmployeeToSave = () => {
        const { id, lastName, firstName, patronymic, sex, birthDate, position, phone } = this.state.employee;
        return { id, lastName, firstName, patronymic, sex, birthDate, position, phone };
    }

    filterNotRussianSymbols(e) {
        if (!/[А-Яа-яЁё-]/.test(e.key)) {
            e.preventDefault();
        }
    }

    handleStateChange = (key, value) => {
        this.setState(state => {
            const employee = {
                ...state.employee,
                [key]: value
            }
            return {
                ...state,
                employee: { ...employee }
            }
        });
    }

    isInputInvalid = (inputStateKey, validators, inputErrorKey) => {
        if (!this.state.isFormSubmitted) {
            return false;
        }

        const errorKey = inputErrorKey || this.getInputErrorKey(inputStateKey);
        for (let validate of validators) {
            this[errorKey] = validate(this.state.employee[inputStateKey]);
            if (this[errorKey]) {
                this.isFormValid = false;
                return true;
            }
        }
    }

    getInputErrorKey(inputStateKey) {
        return `${inputStateKey}_error`;
    }

    getInputErrorMessage = (inputStateKey, inputErrorKey) => {
        const errorKey = inputErrorKey || this.getInputErrorKey(inputStateKey);
        return this[errorKey];
    }

    onSubmit = e => {
        e.preventDefault();
        this.isFormValid = true;
        this.setState({ isFormSubmitted: true }, () => {
            if (this.isFormValid) {
                this.props.showPageLoader(true);
                this.props.saveEmployee(this.getEmployeeToSave());
            } else {
                this.props.showWarningAlert('Не все поля корректно заполнены', 2.5);
            }
        });
    }

    render() {
        if (!this.state.loadComplete) {
            return null;
        }

        return (
            <Form className="employee-edit" onSubmit={this.onSubmit} autoComplete="off" noValidate>
                <FormGroup row>
                    <Label for="firstName" sm={2}>Имя*</Label>
                    <Col sm={6} lg={3}>
                        <Input id="firstName"
                            value={this.state.employee.firstName}
                            onChange={e => this.handleStateChange('firstName', e.target.value)}
                            onKeyPress={this.filterNotRussianSymbols}
                            invalid={this.isInputInvalid('firstName', [requireValidator('Введите имя')])}
                        />
                        <ValidationMessage className="validation-message-under">{this.getInputErrorMessage('firstName')}</ValidationMessage>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="patronymic" sm={2}>Отчество*</Label>
                    <Col sm={6} lg={3}>
                        <Input id="patronymic"
                            value={this.state.employee.patronymic}
                            onChange={e => this.handleStateChange('patronymic', e.target.value)}
                            onKeyPress={this.filterNotRussianSymbols}
                            invalid={this.isInputInvalid('patronymic', [requireValidator('Введите отчетсво')])}
                        />
                        <ValidationMessage className="validation-message-under">{this.getInputErrorMessage('patronymic')}</ValidationMessage>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="lastName" sm={2}>Фамилия*</Label>
                    <Col sm={6} lg={3}>
                        <Input id="lastName"
                            value={this.state.employee.lastName}
                            onChange={e => this.handleStateChange('lastName', e.target.value)}
                            onKeyPress={this.filterNotRussianSymbols}
                            invalid={this.isInputInvalid('lastName', [requireValidator('Введите фамилию')])}
                        />
                        <ValidationMessage className="validation-message-under">{this.getInputErrorMessage('lastName')}</ValidationMessage>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="sex" sm={2}>Пол*</Label>
                    <Col sm={6} lg={3}>
                        <Select
                            inputId="sex"
                            value={this.state.employee.sex}
                            onChange={item => this.handleStateChange('sex', item)}
                            options={this.props.catalogs[SEX].data}
                            catalog
                            invalid={this.isInputInvalid('sex', [requireValidator('Выберите пол')])}
                        />
                        <ValidationMessage className="validation-message-under">{this.getInputErrorMessage('sex')}</ValidationMessage>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="position" sm={2}>Должность*</Label>
                    <Col sm={6} lg={3}>
                        <Select
                            inputId="position"
                            value={this.state.employee.position}
                            onChange={item => this.handleStateChange('position', item)}
                            options={this.props.catalogs[POSITIONS].data}
                            catalog
                            invalid={this.isInputInvalid('position', [requireValidator('Выберите должность')])}
                        />
                        <ValidationMessage className="validation-message-under">{this.getInputErrorMessage('position')}</ValidationMessage>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="birthDate" sm={2}>Дата рождения*</Label>
                    <Col sm={6} lg={3}>
                        <DatePicker
                            id="birthDate"
                            minDate={new Date(1940, 0, 1)}
                            maxDate={new Date(2005, 11, 31)}
                            selected={this.state.employee.birthDate}
                            onChange={value => this.handleStateChange('birthDate', value)}
                            invalid={this.isInputInvalid('birthDate', [requireValidator('Введите дату рождения')])}
                        />
                        <ValidationMessage className="validation-message-under">{this.getInputErrorMessage('birthDate')}</ValidationMessage>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="phone" sm={2}>Телефон*</Label>
                    <Col sm={6} lg={3}>
                        <InputMask mask={phoneMask} id="phone" value={this.state.employee.phone}
                            onChange={e => this.handleStateChange('phone', e.target.value)}
                            invalid={this.isInputInvalid('phone', [requireValidator('Введите Телефон'), phoneValidator()])}
                        />
                        <ValidationMessage className="validation-message-under">{this.getInputErrorMessage('phone')}</ValidationMessage>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={8} lg={5}>
                        <Button className="float-right" color="primary" icon="save" type="submit">Сохранить</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
};

Edit.propTypes = {
    id: PropTypes.number,
    employee: PropTypes.object.isRequired,
}

export default connect(
    (state, ownProps) => {
        const employee = ownProps.id ? employeeFullSelector(state, ownProps.id) : employeeNewSelector(state);
        const catalogs = employeeCatalogs.reduce((obj, name) => {
            obj[name] = state.catalogs[name];
            return obj;
        }, {});

        return { employee, catalogs };
    },
    { ...pageLoaderActions, fetchEmployee, saveEmployee, newEmployee, fetchCatalog, showWarningAlert }
)(Edit);
