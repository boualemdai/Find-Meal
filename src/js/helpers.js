import { async } from "regenerator-runtime";
import * as conf from "./config";
const wait = (s) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request Timeout`)), s * 1000);
  });
};
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), wait(conf.TIMEOUT)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.error}`);
    return data;
  } catch (err) {
    throw err;
  }
};

