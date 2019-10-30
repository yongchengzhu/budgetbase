import React from 'react';

import SideNav from './SideNav';
import SideMenu from './SideMenu';
import ActivityMenu from './ActivityMenu';
import Modal from './Modal';
import BudgetContainer from './BudgetContainer';

class Dashboard extends React.Component {
  state = { balance: 0, transactions: [], budgets: [], showModal: false, modalContent: null, modalTitle: null, modalSubmit: null }

  componentDidMount() {
    this.fetchTransactions();
    this.fetchBalance();
    this.fetchBudgets();
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  setModalContent = content => {
    this.setState({ modalContent: content });
  }

  setModalTitle = title => {
    this.setState({ modalTitle: title })
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

  fetchBalance = async () => {
    const response = await fetch('/api/user/balance', {
      headers: { Authorization: localStorage.getItem('token') }
    });
    const data = await response.json();
    this.setState({ balance: data });
    console.log(this.state.balance);
  }

  fetchBudgets = async () => {
    const response = await fetch('/api/budget/', {
      headers: { Authorization: localStorage.getItem('token') }
    });
    let data = await response.json();
    while (data.length < 3) data.push({});
    this.setState({ budgets: data });
  }

  render() {
    return (
      <div>
        <Modal title={this.state.modalTitle} 
          modalSubmit={this.state.modalSubmit} 
          showModal={this.state.showModal} 
          toggleModal={this.toggleModal}
        >
          {this.state.modalContent}
        </Modal>
        <div className ="row">
          <div className="col s12 m1 side-nav-container">
            <SideNav />
          </div>
          <div className="col s12 m3 side-menu-container">
            <SideMenu
              balance={this.state.balance}
              transactions={this.state.transactions}
              fetchBalance={this.fetchBalance}
              fetchTransactions={this.fetchTransactions}
              showModal={this.state.showModal}
              toggleModal={this.toggleModal}
              setModalContent={this.setModalContent}
              setModalTitle={this.setModalTitle}
            />
          </div>
          <div className ="col s12 m8 activity-column">
            <div className="row">
              <div className="col s12 dashboard-header">
                <span className="dashboard-title">Dashboard</span>
                <span className="budget-total">
                  <span className="budget-total-title">Budget Total</span>
                  <span className="budget-num">$293,240</span>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <div className="budget-total">Budgets</div>
                <BudgetContainer 
                  toggleModal={this.toggleModal}
                  setModalContent={this.setModalContent}
                  setModalTitle={this.setModalTitle}
                  budgets={this.state.budgets}
                  fetchBalance={this.fetchBalance}
                  fetchBudgets={this.fetchBudgets}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s8">
                <div className="dashboard-subtitle">Your History</div>
                <ActivityMenu
                  fetchBalance={this.fetchBalance}
                  fetchTransactions={this.fetchTransactions}
                  balance={this.state.balance}
                  transactions={this.state.transactions}
                  token={this.props.token}
                  showModal={this.state.showModal}
                  toggleModal={this.toggleModal}
                  setModalContent={this.setModalContent}
                  setModalTitle={this.setModalTitle}
                />
              </div>
              <div className="col s4">
                <div className="dashboard-subtitle">Overview</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;