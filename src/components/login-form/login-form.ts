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
      const response = await fetch("http://localhost:3000/Login/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `mutation Login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        sessionToken
                        userId
                        error
                    }
                }`,
          variables: {
            email: this.email,
            password: this.password,
          },
        }),
        credentials: "include",
      });
      const result = await response.json();
      if (result.errors && result.errors.length > 0) {
        this.error = result.errors[0].message || "Login failed.";
        console.info("Login failed:", this.error);
      } else if (result.data && result.data.login && !result.data.login.error) {
        console.info("Login succeeded:", result.data.login);
      } else {
        this.error = result.data.login?.error || "Login failed.";
        console.info("Login failed:", this.error);
      }
    } catch (e) {
      this.error = "Network error.";
      console.info("Login failed:", this.error);
    } finally {
      this.loading = false;
    }
  }
}
