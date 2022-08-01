import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  bringCoinName = (id) => {
    const { expenses } = this.props;
    const dispesa = expenses[id];
    const moeda = dispesa.currency;
    return dispesa.exchangeRates[moeda].name;
  }

  bringCambio = (id) => {
    const { expenses } = this.props;
    const dispesa = expenses[id];
    const moeda = dispesa.currency;
    const cambio = Number(dispesa.exchangeRates[moeda].ask);
    return cambio.toFixed(2);
  }

  bringValorConvertido = (id) => {
    const { expenses } = this.props;
    const dispesa = expenses[id];
    const moeda = dispesa.currency;
    const valor = Number(dispesa.value);
    const cambio = Number(dispesa.exchangeRates[moeda].ask);
    return (valor * cambio).toFixed(2);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir.</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((dispesa) => (
            <tr key={ dispesa.id }>
              <td>
                {dispesa.description}
              </td>
              <td>
                {dispesa.tag}
              </td>
              <td>
                {dispesa.method}
              </td>
              <td>
                {Number(dispesa.value).toFixed(2)}
              </td>
              <td>
                {this.bringCoinName(dispesa.id)}
              </td>
              <td>
                {this.bringCambio(dispesa.id)}
              </td>
              <td>
                {this.bringValorConvertido(dispesa.id)}
              </td>
              <td>
                Real
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Table);
