/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const CaloriesResult = ({ calories }) => (
  <div className="items-center text-center">
    <h2>Your Calories need is:</h2>
    <br />
    <h3 className="text-lg mb-2">
      Sedentary lifestyle needs <b>{Math.round(calories * 1.2)}</b> Calories
    </h3>
    <h3 className="text-lg mb-2">
      Infrequently engage in physical activity
      <b> {Math.round(calories * 1.3)}</b> Calories
    </h3>
    <h3 className="text-lg mb-2">
      Regularly exercise
      <b> {Math.round(calories * 1.4)}</b> Calories
    </h3>
    <h3></h3>
  </div>
);

export default CaloriesResult;
