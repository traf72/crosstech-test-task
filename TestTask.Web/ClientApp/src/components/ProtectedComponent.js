import { connect } from 'react-redux';
import CheckAccess from '../decorators/CheckAccess'

const ProtectedComponent = ({ isAllowed, children }) => {
    return isAllowed ? children : null;
}

export default connect(state => {
    return { userRoles: state.auth.user.roles }
})(CheckAccess(ProtectedComponent));
