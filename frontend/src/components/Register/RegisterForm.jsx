import { useEffect, useState } from "react";
import { Country } from "country-state-city";
import Spinner from "./../Spinner/Spinner";

import "./../../sass/components/Form/Form.scss";
import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterForm = () => {
  // Country and state initialization state
  const [countries, setCountries] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const countriesData = allCountries.map((country) => {
      return { name: country.name, isoCode: country.isoCode };
    });
    setCountries(countriesData);
  }, []);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      other_names: "",
      email: "",
      password: "",
      phone: "",
      username: "",
      participant_type: "",
      affiliate_institution: "",
      department: "",
      country: "",
      state: "",
      city: "",
    },

    onSubmit: async (values) => {
      try {
        setSubmitting(true);

        let response = await axios.post("/accounts/signup/", {
          ...values,
          password: "uics2023",
        });

        if (response.status === 201) {
          Swal.fire(
            "Registration Successful!",
            "Kindly check your mail for more information!",
            "success"
          );
          formik.resetForm();
          setSubmitting(false);
        } else {
          Swal.fire(
            "Oops...",
            "Something went wrong! Kindly try again",
            "error"
          );
          setSubmitting(false);
        }
      } catch (error) {
        Swal.fire("Oops...", "Something went wrong! Kindly try again", "error");
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="form-container">
      <h1>Register here</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="section">
          <div className="section-1">
            <label className="required" htmlFor="name">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              id="name"
              name="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
            />
          </div>
          <div className="section-2">
            <label className="required" htmlFor="name">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              id="name"
              name="last_name"
              onChange={formik.handleChange}
              value={formik.values.last_name}
            />
          </div>
        </div>
        <div className="section">
          <div className="section-1">
            <label className="" htmlFor="name">
              Other Name
            </label>
            <input
              type="text"
              placeholder="Other Name"
              id="name"
              name="other_names"
              onChange={formik.handleChange}
              value={formik.values.other_names}
            />
          </div>
          <div className="section-2">
            <label className="required" htmlFor="part">
              Participant Type
            </label>
            <select
              name="participant_type"
              onChange={formik.handleChange}
              value={formik.values.participant_type}
            >
              <option value="" hidden>
                Participant Type
              </option>
              <option value="Physical">Physical</option>
              <option value="Virtual">Virtual</option>
            </select>
          </div>
        </div>
        <div className="section">
          <div className="section-1">
            <label className="required" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="example@example.com"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="section-2">
            <label className="required" htmlFor="phone no">
              Phone Number
            </label>
            <input
              type="number"
              name="phone"
              placeholder="Enter your phone number"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </div>
        </div>
        <div className="section">
          <div className="section-1">
            <label className="required" htmlFor="name">
              Institution / Organisation
            </label>
            <input
              type="text"
              placeholder="Institution"
              name="affiliate_institution"
              onChange={formik.handleChange}
              value={formik.values.affiliate_institution}
            />
          </div>
          <div className="section-2">
            <label className="required" htmlFor="name">
              Department
            </label>
            <input
              type="text"
              name="department"
              placeholder="Enter your department"
              onChange={formik.handleChange}
              value={formik.values.department}
            />
          </div>
        </div>

        <div className="section">
          <div className="section-1">
            <label className="required" htmlFor="part">
              Country
            </label>
            <select
              name="country"
              onChange={formik.handleChange}
              value={formik.values.country}
            >
              <option hidden={true} defaultValue="">
                Choose country
              </option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="section-2">
            <label className="required" htmlFor="name">
              State / Province
            </label>
            <input
              type="text"
              placeholder="State / Province"
              className="address"
              name="state"
              onChange={formik.handleChange}
              value={formik.values.state}
            />
          </div>
        </div>
        <div className="section">
          <div className="section-1">
            <label className="required" htmlFor="name">
              City
            </label>
            <input
              type="text"
              placeholder="City"
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
          </div>
        </div>
        <button className="submit" disabled={submitting}>
          {submitting ? <Spinner /> : "Register"}
        </button>
        {/* <div>
                <label htmlFor="name">Last Name</label>
                <input type="text" placeholder="Name"/>
            </div> */}
      </form>
    </div>
  );
};

export default RegisterForm;
