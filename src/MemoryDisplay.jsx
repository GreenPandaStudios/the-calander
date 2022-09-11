import React from "react";
import { Capitalize } from "./utils";
import { Container, Row, Col } from "react-bootstrap";
import { ReactTinyLink } from "react-tiny-link";

export const MemoryDisplay = ({ message, name, place, link }) => {
  return (
    <>
      <Container className="w-85">
        <Row className="my-4">
          <hr className="my-4"></hr>
          <p>
            <q>{message}</q>
          </p>
        </Row>
        {link ? (
          <Row className="my-4">
            <Col>
              <ReactTinyLink
                cardSize="small"
                showGraphic={true}
                maxLine={2}
                minLine={1}
                url={link}
                proxyurl={"https://proxy.cors.sh/"}
                width = "75vw"
              />
            </Col>
          </Row>
        ) : null}
        {
          <i className="lead">
            {name && Capitalize(name)}
            {place ? " - " + place : ""}
          </i>
        }
        <hr className="my-4"></hr>
      </Container>
    </>
  );
};
