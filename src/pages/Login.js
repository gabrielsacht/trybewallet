import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUserData as saveUserDataAction } from '../redux/actions/index';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      valid: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = () => {
    const { history, saveUser } = this.props;
    const { email } = this.state;
    saveUser(email);
    history.push('/carteira');
  }

  validate = () => {
    const { email, password } = this.state;
    const pswd = password.split('');
    const SIX = 6;
    console.log(pswd);
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) && pswd.length >= SIX) {
      return (true);
    }
    return (false);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.setState({ valid: this.validate() });
    });
  }

  render() {
    const { email, password, valid } = this.state;
    return (
      <div id="login">
        <form className="card">
          <div className="card-header">
            <h2>Login</h2>
          </div>
          <div className="card-content">
            <label htmlFor="email">
              e-mail:
              <input
                type="email"
                name="email"
                data-testid="email-input"
                placeholder="e-mail"
                value={ email }
                onChange={ this.handleChange }
                required
              />
            </label>

            <label htmlFor="password">
              senha:
              <input
                type="password"
                name="password"
                data-testid="password-input"
                placeholder="senha"
                minLength={ 6 }
                value={ password }
                onChange={ this.handleChange }
                required
              />
            </label>

            <button
              id="btn-submit"
              type="button"
              onClick={ this.handleClick }
              disabled={ !valid }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (email) => (
    dispatch(saveUserDataAction(email))
  ),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
