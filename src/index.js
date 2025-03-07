import React from "react";
import { createRoot } from "react-dom/client";
import TrainingLoadCalculator from "./TrainingLoadCalculator";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TrainingLoadCalculator />
  </React.StrictMode>
);
