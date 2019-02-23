import './DatePicker.scss';
import React from 'react';
import BootstrapInput from '../../../decorators/BootstrapInput';
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);
setDefaultLocale('ru');

const DatePicker = props => {
    return (
        <ReactDatePicker dateFormat="dd.MM.yyyy" {...props} />
    );
};

export default BootstrapInput(DatePicker);