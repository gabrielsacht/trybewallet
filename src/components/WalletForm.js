import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { currency } = this.props;
    return (
      <fieldset>
        <label htmlFor="valor">
          Valor:
          {' '}
          <input
            data-testid="value-input"
            type="number"
            name="valor"
            // value={ valor }
          />
        </label>

        <label htmlFor="description">
          {' '}
          Descrição:
          {' '}
          <input
            data-testid="description-input"
            type="text"
            name="description"
            // value={ description }
          />
        </label>
        <label htmlFor="coin">
          {' '}
          Moeda:
          {' '}
          <select
            data-testid="currency-input"
            name="coin"
          >
            { currency.map((coin) => (
              <option key={ coin } value={ coin }>{ coin }</option>
            ))}
          </select>
        </label>

        <label htmlFor="payment">
          {' '}
          Pagamento:
          {' '}
          <select data-testid="method-input" name="payment">
            <option> Dinheiro </option>
            <option> Cartão de crédito </option>
            <option> Cartão de débito </option>
          </select>
        </label>

        <label htmlFor="category">
          {' '}
          Categoria:
          {' '}
          <select data-testid="tag-input" name="category">
            <option> Alimentação </option>
            <option> Lazer </option>
            <option> Trabalho </option>
            <option> Transporte </option>
            <option> Saúde </option>
          </select>
        </label>
      </fieldset>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
});

WalletForm.propTypes = {
  currency: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
