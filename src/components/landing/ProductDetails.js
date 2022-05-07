import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Spin, Button, Rate, Modal, Alert, Space } from "antd";
import { Link } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import { addToCart } from "../../actions/cartActions";
import Navbar from "../../components/general/NavBar";
import {isEmpty} from "lodash"
import { decodeUser } from "../../util";

class productDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      visible: false,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProduct(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.product) {
      const product = nextProps.product;
      this.setState({ product });
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  registerModal = (product) => {
    return (
      <Modal
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Close
          </Button>,
        ]}
      >
        <div>
          <br />
          <Alert
            message={
              <center>
                <span>
                  <strong>Added</strong> {product.name} to Cart
                </span>
              </center>
            }
            type="success"
          />
          <br />
          <center>
            <Link to="/cart?redirect=/cart">
              <Button key="submit" type="primary">
                Go to Cart
              </Button>
            </Link>
          </center>
        </div>
      </Modal>
    );
  };

  async addProductToCart(product) {
    //check id user is signed in
    //if not use localstorage
    if (!localStorage.getItem("token")) {
      const productExists = !isEmpty(localStorage.getItem("products"));
      if (productExists) {
        const products = JSON.parse(localStorage.getItem("products"));
        products.push(product._id);
        this.showModal();
        return localStorage.setItem("products", JSON.stringify([product._id]));
      } else {
        this.showModal();
        return localStorage.setItem("products", JSON.stringify([product._id]));
      }
    }

    const userId = decodeUser().user.id;
    const context = { products: [product._id], userId };
    await this.props.addToCart(context);
    this.showModal();
  }

  render() {
    const { product } = this.state;
    return (
      <Fragment>
        <Navbar />
        <div className="container">
          {product ? (
            <Fragment>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <img src="/assets/images/eShop.jpg" alt="product" />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h1 style={{ margin: "0" }}>{product.name}</h1>
                  <p className="lead" style={{ margin: "0" }}>
                    Description: {product.description}
                  </p>
                  <p className="lead" style={{ margin: "0" }}>
                    Features:
                  </p>
                  {product.features ? (
                    <ul style={{ marginLeft: "5%", marginTop: "0" }}>
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="lead">No feature Listed</p>
                  )}
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={product.rating}
                    style={{ margin: "0" }}
                  />
                  <p className="lead">Quantity: {product.quantity}</p>
                  <h1>${product.price}</h1>
                  <button
                    className="btn btn-primary"
                    onClick={(_) => this.addProductToCart(product)}
                  >
                    {" "}
                    Add to Cart
                  </button>
                </div>
              </div>
              <br />
              <hr />
              <br />
              <h1>Product Details</h1>
              <p className="lead">
                <b>{product.details}</b>
              </p>
              <p className="lead" style={{ margin: "0" }}>
                Main Features of Product:
              </p>
              <ul style={{ marginLeft: "5%", marginTop: "0" }}>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </Fragment>
          ) : (
            <Spin size="large" />
          )}
        </div>

        {product && this.registerModal(product)}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.products.product,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { getProduct, addToCart })(productDetails);
