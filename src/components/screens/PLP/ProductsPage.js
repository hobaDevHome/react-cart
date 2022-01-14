import React, { Component } from 'react';
import ProductItem from './ProductItem';
import { connect } from 'react-redux';
import { gql } from '@apollo/client';
import { clientScandiweb } from '../../../Apollo';
import { Categories } from '../../Data/Dummy2';
import './ProductsPage.css';

class ProductsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      theSelectedList: undefined,
      currentCat: this.props.category,
      list: undefined,
    };
  }

  catNames = {
    tech: 'Tech Category Products',
    clothes: 'Clothes Category Products',
    all: 'All Products',
  };
  async fetchItems() {
    const list = Categories.filter((item) => item.name === this.props.category);
    this.setState({ theSelectedList: list[0].products });
    console.log('from dummy', this.state.list);
  }

  componentDidMount() {
    this.fetchItems();
  }
  componentDidUpdate() {
    this.setState((prevState) => {
      if (prevState.currentCat !== this.props.category) {
        this.setState({ currentCat: this.props.category });
        this.fetchItems();
      }
    });
  }

  render() {
    return (
      <div className="products">
        <div className="cat-name-containger">
          <p>{this.catNames[this.props.category]}</p>
        </div>
        <div className="product-list-contianer">
          {this.state.theSelectedList !== undefined &&
            this.state.theSelectedList.map((product) => {
              return (
                <ProductItem
                  key={product.id}
                  inStock={product.inStock}
                  inCart={false}
                  id={product.id}
                  product={product}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedList: state.selectedList,
    category: state.category,
  };
};

export default connect(mapStateToProps, null)(ProductsPage);
