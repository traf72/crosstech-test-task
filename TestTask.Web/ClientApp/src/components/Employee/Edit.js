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
import {
    saveEmployee, isNewEmployeeReadySelector, isEmployeeReadySelector, employeeCatalogsSelector,
    employeeNewSelector, employeeFullSelector, fetchEmployee, newEmployee
} from '../../ducks/Employee';
import { showWarningAlert } from '../../ducks/Alert';
import { allActions as pageLoaderActions } from '../../ducks/PageLoader';
import { phoneMask } from '../../constants';
import { requireValidator, phoneValidator, dateRangeValidator } from '../../libs/validators';

const birthDateLimitStart = new Date(1940, 0, 1);
const birthDateLimitEnd = new Date(2005, 11, 31);

export class Edit extends Component {
    constructor(props) {
        super(props);

        const loadComplete = this.isNewEmployee() ? props.loadComplete : false;
        this.state = {
            employee: loadComplete ? props.employee : {},
            loadComplete,
            isFormSubmitted: false,
        }
    }

    componentDidMount() {
        if (this.state.loadComplete) {
            return;
        }

        this.ensureDataLoaded();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.setState({
                loadComplete: false,
                employee: {},
            });

            this.ensureDataLoaded();
            return;
        }

        if (!this.state.loadComplete && !prevProps.loadComplete && this.props.loadComplete) {
            this.props.hidePageLoader();
            this.setState({
                loadComplete: true,
                employee: this.props.employee,
            });
        }

        if (prevProps.saveInProgress && !this.props.saveInProgress) {
            this.props.hidePageLoader();
        }
    }

    ensureDataLoaded() {
        this.props.showPageLoader();
        if (this.isNewEmployee()) {
            this.props.newEmployee();
        } else {
            this.props.fetchEmployee(this.props.id);
        }
    }

    isNewEmployee() {
        return !this.props.id;
    }

    getEmployeeToSave = () => {
        const employee = this.state.employee;
        return {
            id: employee.id,
            firstName: employee.firstName,
            patronymic: employee.patronymic,
            lastName: employee.lastName,
            sex: employee.sex.id,
            position: { id: employee.position.id },
            birthDate: employee.birthDate,
            phone: employee.phone,
        };
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
                            minDate={birthDateLimitStart}
                            maxDate={birthDateLimitEnd}
                            selected={this.state.employee.birthDate}
                            onChange={value => this.handleStateChange('birthDate', value)}
                            invalid={this.isInputInvalid('birthDate', [requireValidator('Введите дату рождения'), dateRangeValidator(birthDateLimitStart, birthDateLimitEnd)])}
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
    employee: PropTypes.object,
}

export default connect(
    (state, ownProps) => {
        let isReadySelector;
        let employeeSelector;
        if (ownProps.id) {
            isReadySelector = isEmployeeReadySelector;
            employeeSelector = employeeFullSelector;
        } else {
            isReadySelector = isNewEmployeeReadySelector;
            employeeSelector = employeeNewSelector;
        }

        const isReady = isReadySelector(state);
        if (!isReady) {
            return { loadComplete: false };
        }

        return {
            loadComplete: true,
            saveInProgress: state.employee && state.employee.saving,
            employee: employeeSelector(state),
            catalogs: employeeCatalogsSelector(state),
        }
    },
    { ...pageLoaderActions, fetchEmployee, saveEmployee, newEmployee, fetchCatalog, showWarningAlert }
)(Edit);
