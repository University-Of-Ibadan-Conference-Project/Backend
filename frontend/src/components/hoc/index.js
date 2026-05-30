import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { promptRegistrationEmail } from "../../utils/registrationGate";

const withAuth = (WrappedComponent) => {
  const login = async () => {
    const user = await promptRegistrationEmail();
    if (user) {
      Swal.fire({
        title: `Welcome ${user.first_name}!`,
        text: "You are now logged in!",
        icon: "success",
      });
    }
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
