import './SignIn.scss';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Label, Input, CustomInput } from 'reactstrap';
import Button from '../common/Button';
import EnsureUserLoaded from '../../decorators/EnsureUserLoaded';
import { connect } from 'react-redux';
import { signIn, fetchUser } from '../../ducks/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { home as homeRoute } from '../../routes';

class SignIn extends Component {
    state = {
        login: 'admin',
        password: 'Qw123456!',
        rememberMe: true,
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onRememberMeChanged = e => {
        this.setState({ rememberMe: !e.target.checked });
    }

    onSubmit = e => {
        e.preventDefault();

        const { login, password, rememberMe } = this.state;
        this.props.signIn(login, password, rememberMe);
    }

    renderLoginButtonContent = () => {
        return this.props.auth.signInInProgress
            ? (
                <React.Fragment>
                    Подождите...
                    <FontAwesomeIcon className="float-right" icon="circle-notch" size="lg" spin />
                </React.Fragment>
            )
            : 'Войти';
    }

    render() {
        const { auth } = this.props;
        if (auth.user) {
            return <Redirect to={homeRoute.url} />;
        }

        return (
            <div className="signin-page">
                <Form className="signin-page-form" onSubmit={this.onSubmit}>
                    <h3 className="mb-3 font-weight-normal">Вход</h3>

                    <Label for="userLogin" className="sr-only">Логин</Label>
                    <Input id="userLogin" name="login" className="user-login" value={this.state.login} onChange={this.onChange}
                        placeholder="Логин" required autoFocus
                        disabled={auth.signInInProgress}
                    />

                    <Label for="userPassword" className="sr-only">Пароль</Label>
                    <Input type="password" name="password" id="userPassword" value={this.state.password} onChange={this.onChange}
                        className="user-password" placeholder="Пароль" required autoComplete="off"
                        disabled={auth.signInInProgress}
                    />

                    <div className="checkbox mb-2">
                        <Label>
                            <CustomInput type="checkbox" name="rememberMe" id="rememberMe" label="Чужой компьютер"
                                checked={!this.state.rememberMe} onChange={this.onRememberMeChanged}
                                disabled={auth.signInInProgress}
                            />
                        </Label>
                    </div>

                    <Button size="lg" color="primary" className="btn-block" type="submit" disabled={auth.signInInProgress}>
                        {this.renderLoginButtonContent()}
                    </Button>
                </Form>
            </div>
        );
    }
}

export default connect(state => {
    return {
        auth: state.auth,
    }
}, { signIn, fetchUser })(EnsureUserLoaded(SignIn));