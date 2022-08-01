import React from 'react';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

export default class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <WalletForm />
        <Table />
      </>
    );
  }
}
