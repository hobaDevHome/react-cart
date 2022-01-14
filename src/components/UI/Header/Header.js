import React, { Component } from 'react';
import CartOverlay from '../../screens/Cart/CartOverlay';
import { BsCart2 } from 'react-icons/bs';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CurrencytOverlay from './CurrencyOverlay';
import { Categories } from '../../Data/Dummy2';

import {
  changeCurrency,
  getSelectedProductsLists,
} from '../../../store/actions';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.showCartOverlay = this.showCartOverlay.bind(this);
    this.hideCartOverlay = this.hideCartOverlay.bind(this);
    this.showCurrencyList = this.showCurrencyList.bind(this);
    this.hideCurrencyList = this.hideCurrencyList.bind(this);
    this.toggleCurrencyList = this.toggleCurrencyList.bind(this);
    this.onChooseCurrencyHandler = this.onChooseCurrencyHandler.bind(this);
    this.onChosseCatHandler = this.onChosseCatHandler.bind(this);
    this.getCartItemsNo = this.getCartItemsNo.bind(this);
    this.getCategoriesNames = this.getCategoriesNames.bind(this);
    this.getCurrencyNames = this.getCurrencyNames.bind(this);

    this.state = {
      showCartModal: false,
      showCurrency: false,
      showInfo1: false,
    };
    this.numcerOfItems = 0;
    this.categoryNames;
    this.currencyNames;
    this.tempCurNames;
  }

  componentDidMount() {
    this.tempCurNames = Categories[0].products[0].prices;
  }
  showCartOverlay() {
    this.setState({ showCartModal: true });
    this.hideCurrencyList();
  }
  hideCartOverlay() {
    this.setState({ showCartModal: false });
  }

  showCurrencyList() {
    this.setState({ showCurrency: true });
  }
  hideCurrencyList() {
    this.setState({ showCurrency: false });
  }
  toggleCurrencyList() {
    this.hideCartOverlay();
    this.setState({ showCurrency: !this.state.showCurrency });
  }

  onChooseCurrencyHandler(newCurrency) {
    this.props.changeCurrency(newCurrency);

    this.hideCurrencyList();
  }

  onChosseCatHandler(choosecCat) {
    this.props.getSelectedProductsLists(choosecCat);
    localStorage.setItem('category', choosecCat);
  }
  getCartItemsNo() {
    let amuont = 0;

    this.props.cartItems.map((el) => (amuont += el.quantity));

    this.numcerOfItems = amuont;
  }
  getCategoriesNames() {
    const prods = this.props.query;

    if (prods) {
      this.categoryNames = prods.map((prod) => prod.name);
    }
  }
  getCurrencyNames() {
    if (this.tempCurNames !== undefined) {
      this.currencyNames = this.tempCurNames.map(
        (prod) => `${prod.currency.symbol} ${prod.currency.label}`
      );
    }
  }
  render() {
    if (this.props.query !== undefined) {
      this.getCartItemsNo();
      this.getCategoriesNames();
      this.getCurrencyNames();
    }
    return (
      <div className="header-row  header-in-app">
        {this.state.showCurrency && (
          <CurrencytOverlay
            onHide={this.hideCurrencyList}
            currNames={this.currencyNames}
            onChooseCurrencyHandler={this.onChooseCurrencyHandler}
          />
        )}

        {this.state.showCartModal && (
          <CartOverlay onHide={this.hideCartOverlay.bind(this)} />
        )}
        <div className="links-section">
          <ul>
            {this.categoryNames.map((cat) => {
              return (
                <Link to="/" key={cat.length}>
                  <li
                    className={`cat-link ${
                      this.props.category === cat ? 'acitve-cat' : ''
                    }`}
                    onClick={() => this.onChosseCatHandler(cat)}
                  >
                    <p>{cat}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="bag-section">
          <Link to="/">
            <img src="./images/bag-icon.png" alt="" />
          </Link>
        </div>
        <div className="cart-section">
          <div
            className="currency-icons-section"
            onClick={this.toggleCurrencyList.bind(this)}
          >
            <div className="currencyAmount">{this.props.currency}</div>
            <div className="currency">
              {this.state.showCurrency ? (
                <BsChevronUp size={10} />
              ) : (
                <BsChevronDown size={10} />
              )}
            </div>
          </div>

          <div
            onClick={this.showCartOverlay.bind(this)}
            className={`cart-icon ${
              this.props.cartItems.length > 0 ? 'cart-badge-visible' : ''
            }`}
          >
            <BsCart2 size={20} />
            <div className="cart-badge">{this.numcerOfItems}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    category: state.category,
    cartItems: state.cartItems,
    productsList: state.productsList,
    query: state.query,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (curr) => dispatch(changeCurrency(curr)),
    getSelectedProductsLists: (cat) => dispatch(getSelectedProductsLists(cat)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
