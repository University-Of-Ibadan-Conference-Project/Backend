import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

const withAuth = (WrappedComponent) => {
  const login = () => {
    Swal.fire({
      title: "Login",
      input: "text",
      html: `<span>Looks like you've not registered</span>
              <br />
            <span>Kindly enter your email to confirm that</span>`,
      icon: "info",
      inputAttributes: {
        autocapitalize: "off",
      },
      showDenyButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: async (email) => {
        try {
          const response = await axios.post("/accounts/login/", {
            email: email,
            password: "uics2025",
          });
          console.log(response);
          if (response.data === null) {
            return Swal.showValidationMessage(`
              Request failed: Looks like you've not registered
            `);
          }
          return response.data;
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: Looks like you've not registered
          `);
        }
      },
      allowEscapeKey: false,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("user", JSON.stringify(result.value));
        Swal.fire({
          title: `Welcome ${result.value.first_name}!`,
          text: "You are now logged in!",
        });
      } else if (result.isDenied) {
        Swal.fire(
          "Error",
          "Kindly register to continue or login again",
          "error",
        ).then(() => {});
      }
    });
  };

  const promptConfirm = (user) => {
    Swal.fire({
      title: "Hi " + user.first_name + "!",
      html: `<span>You are filling this form with <br /><b>${user.email}</b></span>`,
      icon: "question",
      showCancelButton: false,
      denyButtonText: "Not me, Logout",
      denyButtonColor: "#f00",
      allowEscapeKey: false,
      showDenyButton: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isDenied) {
        localStorage.removeItem("user");
        Swal.fire(
          "Logged Out",
          "Kindly register to continue or login again",
          "info",
        );
        login();
      }
    });
  };

  const Wrapper = (props) => {
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      if (user) {
        promptConfirm(user);
      } else {
        login();
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
