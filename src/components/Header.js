import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrencies as getCurrenciesAction,
  saveCash as saveCashAction } from '../redux/actions/index';

class Header extends Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  componentDidUpdate() {
    this.renderCash();
  }

  renderCash = () => {
    const { expenses, saveCash } = this.props;
    const valuees = [];
    if (expenses.length === 0) saveCash(0);
    else {
      expenses.forEach((item) => {
        const { currency, value, exchangeRates } = item;
        const mult = exchangeRates[currency].ask;
        const valueTratado = (value * mult).toFixed(2);
        valuees.push(valueTratado);
      });
      const sum = valuees.reduce((partialSum, a) => Number(partialSum) + Number(a));
      saveCash(sum);
    }
  }

  render() {
    const { email, cash } = this.props;
    return (
      <header>
        <div className="heading">
          <span
            data-testid="email-field"
          >
            {email}
          </span>
          <span data-testid="total-field">
            { Number(cash).toFixed(2) }
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  cash: state.wallet.cash,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesAction()),
  saveCash: (cash) => dispatch(saveCashAction(cash)),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  saveCash: PropTypes.func.isRequired,
  cash: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
