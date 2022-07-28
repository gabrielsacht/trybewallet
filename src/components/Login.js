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
    };
  }

  handleClick = () => {
    const { history, saveUser } = this.props;
    const { email } = this.state;
    saveUser(email);
    history.push('/');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <form>
        <fieldset>
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

          <button type="button" onClick={ this.handleClick }>
            Entrar
          </button>
        </fieldset>
      </form>
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
