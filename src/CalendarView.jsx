import React, { useEffect, useState } from "react";
import * as firebase from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import bootstrap from "bootstrap";
import { Offcanvas, Button } from "react-bootstrap";
import {
  collection,
  addDoc,
  query,
  where,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";

export const CalendarView = (props) => {
  const { db } = props;
  const messageRef = collection(db, "memories");
  const [show, setShow] = useState(false);
  const [memories, setMemories] = useState(null);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    getDocs(query(messageRef, orderBy("create_time"))).then((mems) => {
      var data = [];
      mems.forEach((m) => data.push({ ...m.data(), id: m.id }));
      console.log(data);
      setMemories(data);
    });
  }, []);

  const MemoryDisplay = ({ message, name, place }) => {
    return (
      <>
        <hr class="my-4"></hr>
        <p>
          <q>{message}</q>
        </p>

        {
          <i class="lead">
            {name && Capitalize(name) + " - "}
            {place && place.toLowerCase()}
          </i>
        }
        <hr class="my-4"></hr>
      </>
    );
  };

  return (
    <>
      <div class="jumbotron fixed-top">
        <h1 class="display-4">Today is {date.toDateString()}</h1>
        <p class="lead">
          This is a place to share the amazing moments of life.
        </p>
        <p class="row">
          <Button variant="outline-light btn-lg" onClick={() => setShow(true)}>
            Time Travel
          </Button>
        </p>
      </div>
      <Offcanvas show={show} onHide={() => setShow(false)} placement={"bottom"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Choose a Destination</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
      {memories &&
        memories.length > 0 &&
        memories.map((mem) => (
          <MemoryDisplay
            message={mem.message}
            name={mem.name}
            place={mem.place}
            key={mem.id}
          />
        ))}
    </>
  );

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};
