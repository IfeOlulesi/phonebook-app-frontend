import React from "react";

const Notification = ({ message }) => {
  const red = "rgb(212, 56, 56)";
  const green = "rgb(74, 185, 52)";
  if (message.status === null) return null;
  return (
    <div
      className="error"
      style={{
        backgroundColor: message.status === "success" ? green : red,
      }}
    >
      <div className="statusCode">{message.statusCode} </div>
      <div className="statusText">{message.statusText}</div>
    </div>
  );
};

export default Notification;