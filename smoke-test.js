/**
 * SER 330 â€” Performance Testing Lab
 * SMOKE TEST
 *
 * Purpose: Confirm the endpoint is reachable, the API key works,
 *          and the response is valid before running any real tests.
 *
 * Run: k6 run smoke-test.js
 */

import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

const BASE_URL =
  "https://lwrlkjxym6.execute-api.us-east-1.amazonaws.com/prod/echo";
const API_KEY = "0NSn7DN3iw607cecVNuhj8iTdVzadBIY8eBXvsJU";

export default function () {
  const res = http.post(
    BASE_URL,
    JSON.stringify({
      StudentName: "Ethan Kulawiak",
      StudentEmail: "ethan.kulawiak@quinnipiac.edu",
    }),
    { headers: { "Content-Type": "application/json", "x-api-key": API_KEY } },
  );

  check(res, {
    "âœ… status 200": (r) => r.status === 200,
    "âœ… message is ok": (r) => r.json("message") === "ok",
    "âœ… student echoed": (r) =>
      r.json("echo.student.name") === "Ethan Kulawiak",
    "âœ… response < 3000ms": (r) => r.timings.duration < 3000,
  });

  console.log(
    `Status: ${res.status} | Response time: ${res.timings.duration.toFixed(0)}ms`,
  );
}
