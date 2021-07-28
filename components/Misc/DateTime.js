// @EXTERNALS
import React from "react";

// * RETURNS A DATETIME INPUT */
export default function DateTime({ value, handleChange, target }) {
  return (
    <input
      type="datetime-local"
      className="form-control"
      id={target}
      name={target}
      onChange={(e) => handleChange(e, target)}
      value={value}
    />
  );
}
