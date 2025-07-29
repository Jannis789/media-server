// Alpine.js persist helper typings (Workaround)
declare global {
  interface Window {
    Alpine?: any;
  }
}
import template from "./login-form.html";
import style from "./login-form.scsssheet";
import { AlpineTemplate } from "../../utils/AlpineTemplate";

@AlpineTemplate({
  tag: "x-login-form",
  template: template,
  style: style,
})
export class XLoginForm {
  public email: string = "";
  public password: string = "";
  public remember: boolean = false;
  public error: string = "";
  public loading: boolean = false;

  public async login() {
    this.error = "";
    this.loading = true;
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `mutation Login($email: String!, $password: String!) { login(email: $email, password: $password) }`,
          variables: {
            email: this.email,
            password: this.password,
          },
        }),
      });
      const result = await response.json();
      const sessionToken = result?.data?.login;
      if (sessionToken) {
        // Versuche Alpine.$persist, fallback auf localStorage
        if (window.Alpine && typeof window.Alpine.$persist === 'function') {
          window.Alpine.$persist('sessionToken', sessionToken);
        } else {
          localStorage.setItem('sessionToken', sessionToken);
        }
        this.error = "";
        // Optional: Weiterleitung oder UI-Update
        console.info("Login succeeded, sessionToken:", sessionToken);
      } else {
        this.error = "Login fehlgeschlagen.";
        console.info("Login failed:", result);
      }
    } catch (e) {
      this.error = "Network error.";
      console.info("Login failed:", this.error);
    } finally {
      this.loading = false;
    }
  }
}
