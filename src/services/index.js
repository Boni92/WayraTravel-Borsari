import * as firestore from "./firestore/index.js";
import * as mocks from "./mocks/index.js";

const services = {
  ...firestore,
  // ...mocks,
};

export default services;
