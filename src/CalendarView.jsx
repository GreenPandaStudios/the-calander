import React from "react";
import * as firebase from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  addDoc,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore";

export const CalendarView = (props) => {
  const { db } = props;

  const messageRef = collection(db, "messages");
  const [messages] = useCollectionData(
    query(messageRef, orderBy("createdAt"), limit(25)),
    { idField: "id" }
  );

  const Message = (props) => {
    const { text, uid } = props.message;
    const key = props.id;
    return <p>{text}</p>;
  };

  return (
    <>
      {messages &&
        messages.map((msg) => <Message message={msg} key={msg.id} />)}
    </>
  );
};
