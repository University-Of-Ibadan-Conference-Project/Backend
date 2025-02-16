import { useEffect, useRef, useState } from "react";
import { Country } from "country-state-city";
import Spinner from "../Spinner/Spinner";

import "./../../sass/components/Form/Form.scss";
import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import withAuth from "../hoc";


const EventRegisterForm = () => {
  const ref = useRef();
  const [receipt_file, set_receipt_file] = useState(null);

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
      participant_type: "",
      affiliate_institution: "",
      department: "",
      country: "",
      state: "",
      city: "",
    },

    onSubmit: async (values) => {
      console.log(JSON.stringify({ ...values }, null, 2), receipt_file);
      const requestBody = new FormData();
      
      if (receipt_file !== null) {
        requestBody.append("receipt_file", receipt_file);
      }

      for (const data in values) {
        if (data === "keywords") {
          console.log({ ...values[data].split(", ") });
          requestBody.append(
            data,
            JSON.stringify({ ...values[data].split(", ") }),
          );
        } else {
          requestBody.append(data, values[data]);
        }
      }

      try {
        setSubmitting(true);

        let response = await axios.post("/events/event/", requestBody, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${JSON.parse(localStorage.getItem("user"))?.token}`,
          },
        });

        if (response.status === 201) {
          Swal.fire(
            "Registration Successful!",
            "Kindly check your mail for more information!",
            "success",
          );
          formik.resetForm();
          ref.current.value = "";
          set_receipt_file(null);
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
      <h1>Register for event here</h1>
      <form onSubmit={formik.handleSubmit}>
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
          <div className="section-2">
            <label className="" htmlFor="file">
              Attach the the receipt of your payment
            </label>
            <input
              type="file"
              name="receipt_file"
              // Accepts pdf and image files
              accept=".pdf, .jpg, .jpeg, .png"
              ref={ref}
              onChange={(e) => {
                set_receipt_file(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <div className="section">
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
        <button className="submit" disabled={submitting}>
          {submitting ? <Spinner /> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default withAuth(EventRegisterForm);
