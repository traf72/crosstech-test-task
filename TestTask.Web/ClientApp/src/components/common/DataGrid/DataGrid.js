import './DataGrid.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import NoDataComponent from './NoDataComponent';
import LoadingComponent from './LoadingComponent';

const DataGrid = (props) => {
    const { className, ...rest } = props;
    const resultClass = `${className} data-grid -highlight`;

    function getNoDataProps({ loading }) {
        return { loading };
    }

    return (
        <ReactTable
            previousText="Предыдущая"
            nextText="Следующая"
            loadingText="Загрузка..."
            noDataText="Нет данных"
            pageText="Страница"
            ofText="из"
            rowsText="строк"
            pageJumpText="перейти к странице"
            rowsSelectorText="строк на странице"
            minRows={1}
            className={resultClass}
            getNoDataProps={getNoDataProps}
            NoDataComponent={NoDataComponent}
            LoadingComponent={LoadingComponent}
            {...rest}
        />
    );
}

DataGrid.propTypes = {
    className: PropTypes.string,
}

DataGrid.defaultProps = {
    className: '',
}

export default DataGrid;