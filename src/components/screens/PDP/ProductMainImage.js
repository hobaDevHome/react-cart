import React, { Component } from 'react';
import './ProductMainImage.css';

export default class ProdcutMainImage extends Component {
  render() {
    return (
      <div className="mainImage-container">
        <img className="product-mainImage" src={this.props.mainImage} alt="" />
      </div>
    );
  }
}
