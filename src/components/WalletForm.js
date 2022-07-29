import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveTaskData as saveTaskDataAction } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currency: 'USD',
      expenses: [],
      exchangeRates: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetTask = this.fetTask.bind(this);
  }

  addTask = async () => {
    const response = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    // delete response.USDT;
    this.setState({ exchangeRates: response }, () => this.fetTask());
  }

  fetTask = () => {
    const { value, description, method, tag, currency, exchangeRates } = this.state;
    const { idTask, saveTaskData } = this.props;
    const data = {
      id: idTask,
      value,
      description,
      method,
      tag,
      currency,
      exchangeRates,
    };
    saveTaskData(data);
    this.setState((prevState) => ({
      expenses: [...prevState.expenses, data],
    }), () => this.setState({
      value: '',
      description: '',
    }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { currencyy } = this.props;
    const { value, description, method, tag, currency } = this.state;
    return (
      <fieldset>
        <label htmlFor="value">
          value:
          {' '}
          <input
            data-testid="value-input"
            type="number"
            name="value"
            onChange={ this.handleChange }
            value={ value }
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
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <label htmlFor="currency">
          {' '}
          currency:
          {' '}
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            { currencyy.map((coin) => (
              <option key={ coin } value={ coin }>{ coin }</option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          {' '}
          Pagamento:
          {' '}
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro"> Dinheiro </option>
            <option value="Cartão de crédito"> Cartão de crédito </option>
            <option value="Cartão de débito"> Cartão de débito </option>
          </select>
        </label>

        <label htmlFor="tag">
          {' '}
          Categoria:
          {' '}
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação"> Alimentação </option>
            <option value="Lazer"> Lazer </option>
            <option value="Trabalho"> Trabalho </option>
            <option value="Transporte"> Transporte </option>
            <option value="Saúde"> Saúde </option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.addTask }
        >
          Adicionar despesa
        </button>
      </fieldset>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyy: state.wallet.currencies,
  idTask: state.wallet.expenses.length,
});

const mapDispatchToProps = (dispatch) => ({
  saveTaskData: (task) => dispatch(saveTaskDataAction(task)),
});

WalletForm.propTypes = {
  currencyy: PropTypes.arrayOf(PropTypes.string).isRequired,
  idTask: PropTypes.number.isRequired,
  saveTaskData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
