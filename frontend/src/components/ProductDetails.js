import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Badge,
  Button,
} from "react-bootstrap";
import Rating from "./Rating";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const ProductDetails = () => {
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: {},
  });

  let params = useParams();

  useEffect(async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      let post = await axios.get(`/product/${params.slug}`);

      console.log(post);

      dispatch({ type: "FETCH_SUCCESS", payload: post.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "FETCH_FAIL", payload: error.message });
    }
  }, []);

  const props = { width: 400, height: 250, zoomWidth: 500, img: product.img };
  return (
    <Container>
      <Row>
        <Col lg={6}>
          <img src={product.img} alt={product.name} />
        </Col>
        <Col lg={3}>
          <Card style={{ width: "17rem" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numberofrating={product.numberofrating}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>
                  Stock
                  {product.instock > 0 ? (
                    <Badge bg="success">{product.instock}</Badge>
                  ) : (
                    <Badge bg="warning" text="dark">
                      {product.instock}
                    </Badge>
                  )}
                </h6>
                <h4>${product.price}</h4>
              </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={3}>
          <Card style={{ width: "17rem" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1>Price</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <h1>${product.price}</h1>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button variant="primary">Add To Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
