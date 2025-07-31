import { CookieReader } from "./CookieReader.ts";
import GlobalStorage from "./GlobalStorage.ts";

async function request(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const response = await fetch(input, init);

  // Middleware-like logic for handling status codes
  switch (response.status) {
    case 401:
      if (CookieReader.has("session_id")) {
        console.warn("Unauthorized Session: Deleting session_id cookie, maybe expired.");
        CookieReader.delete("session_id");
        GlobalStorage.set("isLoggedIn", false);
      }
      break;
    case 403:
      console.warn("Forbidden: Access denied.");
      break;
    case 404:
      console.warn("Not Found: The requested resource could not be found.");
      break;
    case 500:
      console.error("Internal Server Error: Please try again later.");
      break;
    default:
      console.info(`Unhandled status code: ${response.status}`);
  }

  return response;
}

export default request;
