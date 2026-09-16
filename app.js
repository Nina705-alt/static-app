"use strict";

const counter = document.querySelector("#counter");
const status = document.querySelector("#status");
let count = 0;

counter.addEventListener("click", () => {
  count += 1;
  status.textContent = `You clicked ${count} ${count === 1 ? "time" : "times"}.`;
});
