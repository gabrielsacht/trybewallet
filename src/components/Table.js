import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    return (
      <table>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir.</th>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

// Table.propTypes = {
//   currencyy: PropTypes.arrayOf(PropTypes.string).isRequired,
//   idTask: PropTypes.number.isRequired,
//   saveTaskData: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps)(Table);
