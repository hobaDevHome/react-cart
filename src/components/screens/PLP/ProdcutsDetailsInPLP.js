import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import SizesAtributes from '../PDP/SizesAtributes';
import './ProdcutsDetailsInPLP.css';
import AddToCartComp from '../../UI/AddToCartComp/AddToCartComp';

class Backdrop extends Component {
  render() {
    return <div className="backdrop-product" onClick={this.props.onBackHide} />;
  }
}

class ProductCard extends Component {
  render() {
    return (
      <div className="cart-modal-product">
        <div className="content-product">{this.props.children}</div>
      </div>
    );
  }
}

const portalElement = document.getElementById('productAttirbutes');

class ProdcutsDetailsInPLP extends Component {
  render() {
    return (
      <Fragment>
        {ReactDOM.createPortal(
          <Backdrop onBackHide={this.props.onHide} />,
          portalElement
        )}
        {ReactDOM.createPortal(
          <ProductCard>
            <div className="details-screen-title">
              Please selecet the desired options:
            </div>
            {this.props.attributes !== 0 && (
              <SizesAtributes
                attributes={this.props.attributes}
                sentItem={this.props.sentItem}
                id={this.props.id}
              />
            )}

            <div className="add-to-cart-comp">
              {this.props.sentItem.inStock && (
                <AddToCartComp
                  sentItem={this.props.sentItem}
                  clicked={this.props.clicked}
                />
              )}
            </div>
          </ProductCard>,
          portalElement
        )}
      </Fragment>
    );
  }
}

export default ProdcutsDetailsInPLP;
