import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckAccess from '../decorators/CheckAccess'

const ProtectedComponent = ({ isAllowed, children }) => {
    return isAllowed ? children : null;
}

ProtectedComponent.propTypes = {
    isAllowed: PropTypes.bool,
}

export default connect(state => {
    return { userRoles: state.auth.user.roles }
})(CheckAccess(ProtectedComponent));
