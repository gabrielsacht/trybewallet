import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import WalletForm from '../components/WalletForm';
import { getCurrencies as getCurrenciesAction } from '../redux/actions/index';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { email } = this.props;
    return (
      <>
        <header>
          <span
            data-testid="email-field"
          >
            {email}
          </span>
          <span data-testid="total-field">
            {' '}
            despesa total: 0
            {' '}
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
        <WalletForm />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesAction()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
