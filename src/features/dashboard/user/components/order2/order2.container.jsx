import React, { Component } from 'react'
import history from '../../../../../history';

import './order2.container.scss'
import { client } from '../../../../../helpers/urls';
import cargoTruck from '../../../../../assets/img/cargoTruck.jpg'

// To connect the getOrder action with our component
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrder } from '../../store/actions';

import {
  UIbutton
} from '../../../../../ui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBillAlt,
} from '@fortawesome/free-solid-svg-icons';
import socketInstance from '../../../../../api/socket/socket-instance';


class OrderClient2Logic extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.payOrder = this.payOrder.bind(this);
  }

  componentDidMount() {
    let userName = localStorage.getItem('username');
    this.props.getOrder(userName);
    socketInstance.instance.on('take_order', value => {
      if (this.props.orderID == value.orderID) {
        history.push(client.order3);
      }
      localStorage.setItem(`currentDriver`, JSON.stringify(value.driver));
    });
  }

  payOrder() {
    let userType = localStorage.getItem('roleID');
    let clientName = JSON.parse(localStorage.getItem('clientDetails'))[0].firstName;
    let properties = Object.assign({},
      this.props,
      {
        isDone: true,
        inRoom: true
      },
      { userType },
      { username: clientName });
    localStorage.setItem(`currentClient`, JSON.stringify(properties));
  }

  render() {
    return (
      <div className="order-client-2">
        <div className="gradient-img-client-order">
          <span className="gradient" />
          <img className="client-img-1" src={cargoTruck} alt="Cargo truck" />
        </div>
        <div className="total-earned">
          <h2>Total payment</h2>
          <h4>Cash</h4>
          <div className="border-total-cost">
            <p className="total-cost">{this.props.cost} $</p>
          </div>
        </div>
        <div>
          <div className="order-btn-2">
            <UIbutton onClick={this.payOrder} className="order-accept-btn js_loader" name="button" variant="contained" color="primary" fullWidth={true}>
              PAY &nbsp;<FontAwesomeIcon icon={faMoneyBillAlt} /></UIbutton>
            <UIbutton className="order-cancel-btn" name="button" color="default" fullWidth={true}>CANCEL</UIbutton>
          </div>
        </div>
      </div>
    );
  }
}

OrderClient2Logic.propTypes = {
  getOrder: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  orderState: state.clientsMapReducers.orderState,
  orderID: state.clientsMapReducers.orderID,
  cost: state.clientsMapReducers.cost,
  firstName: state.clientsMapReducers.firstName,
});

const OrderClient2Container = connect(mapStateToProps, { getOrder })(OrderClient2Logic)

export {
  OrderClient2Container
}
