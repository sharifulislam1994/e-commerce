import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import data from "../data";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
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

const ProductPage = () => {
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: [],
  });

  // let [product, setProduct] = useState([]);

  useEffect(async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      let post = await axios.get("/product");
      dispatch({ type: "FETCH_SUCCESS", payload: post.data });
    } catch (error) {
      dispatch({ type: "FETCH_FAIL", payload: error.message });
    }
  }, []);

  return (
    <>
      <Container className="mt-4">
        <Row>
          {loading ? (
            <div className="loading">
              <Spinner animation="border" />
            </div>
          ) : (
            product.map((item, index) => (
              <Col lg={3} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={item.img} />
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Card.Title>
                    <Rating
                      rating={item.rating}
                      numberofrating={item.numberofrating}
                    />
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>${item.price}</Card.Text>
                    <Button variant="primary">Add to cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
