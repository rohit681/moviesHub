import React, { useContext } from "react";
import alertContext from "../context/Alert/alertContext";

export default function Alert() {
  const context = useContext(alertContext);
  const { alert } = context;
  console.log(alert);
  return (
    alert && (
      <div>
        <div className="alert alert-primary" role="alert">
          <strong style={{ "background-color": "transparent" }}>
            {alert.type}
          </strong>
          : {alert.message}
        </div>
      </div>
    )
  );
}
