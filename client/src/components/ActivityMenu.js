import React from 'react';

import ActivityContainer from './ActivityContainer';
import TransactionForm from './forms/TransactionForm';

class ActivityMenu extends React.Component {
  state = { transactions: [], budgetLeft: 0 };

  componentDidMount() {
    this.fetchTransactions();
    this.fetchBudget();
  }

  fetchTransactions = async () => {
    const response = await fetch('/api/transaction/all', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    const data = await response.json();
    this.setState({ transactions: data });
  }

  fetchBudget = async () => {
    const response = await fetch('/api/user/budget', {
      headers: { Authorization: localStorage.getItem('token') }
    });
    const data = await response.json();
    this.setState({ budgetLeft: data });
  }

  handleModal = () => {
    this.props.setModalTitle('New Transaction');
    this.props.setModalContent(<TransactionForm toggleModal={this.props.toggleModal} fetchTransactions={this.fetchTransactions} fetchBudget={this.fetchBudget} />);
    this.props.toggleModal();
  }

  render() {
    const {transactions , budgetLeft} = this.state;
    
    return (
      <div className="center">
        <h5>Budgets Left: ${this.state.budgetLeft}</h5>
        <button onClick={this.handleModal} id="newTransaction" className="btn" >
        New Transaction
        </button>
        <ActivityContainer 
        transactions={this.state.transactions} 
        setModalTitle = {this.props.setModalTitle} 
        setModalContent = {this.props.setModalContent} 
        toggleModal = {this.props.toggleModal}/>
      </div>
    );
  }
}

export default ActivityMenu;