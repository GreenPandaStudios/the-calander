import React, { useEffect, useState } from "react";
import * as firebase from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import bootstrap from "bootstrap";
import {
  Alert,
  Modal,
  Button,
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import {
  collection,
  addDoc,
  query,
  where,
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore";
export const MemoryModal = (props) => {
  const {
    showMemModal,
    setShowMemModal,
    date,
    handleMemSubmit,
    memory,
    setMemory,
  } = props;

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showMemModal}
      onHide={() => setShowMemModal(false)}
      placement={"bottom"}
    >
      <Modal.Header closeButton>
        <Modal.Title>What made {date.toDateString()} special?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleMemSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-4" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Enter Name"
                defaultValue={memory.name || ""}
                onChange={(e) => setMemory({ ...memory, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-4" controlId="formPlace">
              <Form.Control
                type="text"
                placeholder="Where Did it Happen?"
                defaultValue={memory.place || ""}
                onChange={(e) =>
                  setMemory({ ...memory, place: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-4" controlId="formMessage">
              <Form.Control
                required
                type="text"
                as="textarea"
                placeholder="What Happened?"
                defaultValue={memory.message || ""}
                onChange={(e) =>
                  setMemory({ ...memory, message: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-4" controlId="formMessage">
              <Form.Control
                required
                type="text"
                placeholder="Share a link"
                onChange={(e) => setMemory({ ...memory, link: e.target.value })}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Button variant="outline-dark btn-lg" type="submit">
              Share
            </Button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
