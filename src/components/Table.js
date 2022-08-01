import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteTask as deleteTaskAction,
  editCall as editCallAction } from '../redux/actions/index';

class Table extends Component {
  bringCoinName = (id) => {
    const { expenses } = this.props;
    const dispesa = expenses.find((item) => item.id === id);
    const moeda = dispesa.currency;
    return dispesa.exchangeRates[moeda].name;
  }

  bringCambio = (id) => {
    const { expenses } = this.props;
    const dispesa = expenses.find((item) => item.id === id);
    const moeda = dispesa.currency;
    const cambio = Number(dispesa.exchangeRates[moeda].ask);
    return cambio.toFixed(2);
  }

  bringValorConvertido = (id) => {
    const { expenses } = this.props;
    const dispesa = expenses.find((item) => item.id === id);
    const moeda = dispesa.currency;
    const valor = Number(dispesa.value);
    const cambio = Number(dispesa.exchangeRates[moeda].ask);
    return (valor * cambio).toFixed(2);
  }

  deleteTaskBtn = ({ target }) => {
    const { expenses, deleteTask } = this.props;
    const newExpenses = expenses.filter((item) => item.id !== Number(target.id));
    // console.log(newExpenses);
    if (newExpenses.length === 0) deleteTask([]);
    else deleteTask(newExpenses);
  }

  editTaskBtn = ({ target }) => {
    const { editCall } = this.props;
    editCall(Number(target.id));
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
          { expenses.lenght !== 0 && (
            expenses.map((dispesa) => (
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
                <td>
                  <button
                    id={ dispesa.id }
                    data-testid="delete-btn"
                    type="button"
                    onClick={ this.deleteTaskBtn }
                  >
                    excluir
                  </button>
                  <button
                    id={ dispesa.id }
                    data-testid="edit-btn"
                    type="button"
                    onClick={ this.editTaskBtn }
                  >
                    editar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (task) => dispatch(deleteTaskAction(task)),
  editCall: (id) => dispatch(editCallAction(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTask: PropTypes.func.isRequired,
  editCall: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
