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
            "success",
          );
          formik.resetForm();
          setSubmitting(false);
        } else {
          Swal.fire(
            "Oops...",
            "Something went wrong! Kindly try again",
            "error",
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
            <label className="required" htmlFor="first_name">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              id="first_name"
              name="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              required
            />
          </div>
          <div className="section-2">
            <label className="required" htmlFor="last_name">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              id="last_name"
              name="last_name"
              onChange={formik.handleChange}
              value={formik.values.last_name}
              required
            />
          </div>
        </div>
        <div className="section">
          <div className="section-1">
            <label className="" htmlFor="other_names">
              Other Name
            </label>
            <input
              type="text"
              placeholder="Other Name"
              id="other_names"
              name="other_names"
              onChange={formik.handleChange}
              value={formik.values.other_names}
            />
          </div>
          <div className="section-2">
            <label className="required" htmlFor="participant_type">
              Participant Type
            </label>
            <select
              id="participant_type"
              name="participant_type"
              onChange={formik.handleChange}
              value={formik.values.participant_type}
              required
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
              required
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
              required
            />
          </div>
        </div>
        <div className="section">
          <div className="section-1">
            <label className="required" htmlFor="affiliate_institution">
              Institution / Organisation
            </label>
            <input
              type="text"
              placeholder="Institution"
              id="affiliate_institution"
              name="affiliate_institution"
              onChange={formik.handleChange}
              value={formik.values.affiliate_institution}
              required
            />
          </div>
          <div className="section-2">
            <label className="required" htmlFor="department">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="Enter your department"
              onChange={formik.handleChange}
              value={formik.values.department}
              required
            />
          </div>
        </div>

        <div className="section">
          <div className="section-1">
            <label className="required" htmlFor="country">
              Country
            </label>
            <select
              id="country"
              name="country"
              onChange={formik.handleChange}
              value={formik.values.country}
              required
            >
              <option hidden value="">
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
            <label className="required" htmlFor="state">
              State / Province
            </label>
            <input
              type="text"
              placeholder="State / Province"
              className="address"
              id="state"
              name="state"
              onChange={formik.handleChange}
              value={formik.values.state}
              required
            />
          </div>
        </div>
        <div className="section">
          <div className="section-1">
            <label className="required" htmlFor="city">
              City
            </label>
            <input
              type="text"
              placeholder="City"
              className="city"
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
              required
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
