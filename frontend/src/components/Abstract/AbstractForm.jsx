import { useFormik } from "formik";
import "./../../sass/components/Form/Form.scss";
import { useState } from "react";
import Spinner from "./../Spinner/Spinner";
import axios from "axios";
import Swal from "sweetalert2";

const AbstractForm = () => {
  const [abstract_document_file, setAbstract_document_file] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      coresponding_author_name: "",
      coresponding_author_email: "",
      coresponding_author_institution: "",
      keywords: "",
      presentation_type: "",
      research_area: "",
      coresponding_author_phone: "",
    },

    onSubmit: async (values) => {
      console.log(
        JSON.stringify({ ...values }, null, 2),
        abstract_document_file
      );
      const requestBody = new FormData();

      requestBody.append("abstract_document_file", abstract_document_file);
      for (const data in values) {
        if (data === "keywords") {
          console.log({ ...values[data].split(", ") });
          requestBody.append(
            data,
            JSON.stringify({ ...values[data].split(", ") })
          );
        } else {
          requestBody.append(data, values[data]);
        }
      }

      try {
        setSubmitting(true);

        let response = await axios.post("/events/abstact/", requestBody);

        if (response.status === 201) {
          Swal.fire(
            "Submission Successful!",
            "Kindly check your mail for the more information!",
            "success"
          );
          formik.resetForm();
          setAbstract_document_file({});
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
      <h1>Submit your Abstract</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="section">
          <div className="section-1">
            <label className="required" htmlFor="title">
              Title of the Abstract
            </label>
            <input
              type="text"
              placeholder="Abstract Title"
              id="title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </div>
          <div className="section-2">
            <label className="required" htmlFor="name">
              Corresponding Author{`'`}s Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              id="name"
              name="coresponding_author_name"
              onChange={formik.handleChange}
              value={formik.values.coresponding_author_name}
            />
          </div>
        </div>
        <div className="section">
          <div className="section-1">
            <label className="required" htmlFor="email">
              Corresponding Author{`'`}s Email
            </label>
            <input
              type="email"
              placeholder="example@example.com"
              id="email"
              name="coresponding_author_email"
              onChange={formik.handleChange}
              value={formik.values.coresponding_author_email}
            />
          </div>
          <div className="section-2">
            <label className="required" htmlFor="phone no">
              Corresponding Author{`'`}s Phone Number
            </label>
            <input
              type="number"
              name="coresponding_author_phone"
              placeholder="Enter your phone number"
              onChange={formik.handleChange}
              value={formik.values.coresponding_author_phone}
            />
          </div>
        </div>

        <div className="section">
          <div className="section-1">
            <label className="required" htmlFor="name">
              Corresponding Author{`'`}s Institution
            </label>
            <input
              type="text"
              name="coresponding_author_institution"
              placeholder="Institution"
              onChange={formik.handleChange}
              value={formik.values.coresponding_author_institution}
            />
          </div>
          <div className="section-2">
            <label className="required" htmlFor="pre">
              Presentation Type
            </label>
            <select
              id="presentation_type"
              name="presentation_type"
              onChange={formik.handleChange}
              value={formik.values.presentation_type}
            >
              <option value=""></option>
              <option value="oral">Live Oral Presentation</option>
              <option value="poster">Poster Presentation</option>
              <option value="virtual">Live Virtual Presentation</option>
            </select>
          </div>
        </div>

        <div className="section">
          <div className="section-1">
            <label className="required" htmlFor="rese">
              Research Area
            </label>
            <select
              id="research_area"
              name="research_area"
              onChange={formik.handleChange}
              value={formik.values.research_area}
            >
              <option value="Medicine">
                Medicinal plants / Drug development
              </option>
              <option value="Health">Climatic change and human health</option>
              <option value="Energy">Energy and Mineral Resources</option>
              <option value="Environmental">
                Environmental Pollution and Remediation
              </option>
              <option value="Aquaculture">
                Aquaculture and the Blue Economy
              </option>
              <option value="Science">Science and security</option>
              <option value="Agriculture and Food Security">
                Agriculture and Food Security
              </option>
              <option value="Conservation">
                Conservation and utilization of our natural heritage/ resources
              </option>
              <option value="Bio">
                Biotechnology, Bioinformatics and Cheminformatics
              </option>
              <option value="Computational">
                Computational/Mathematical modeling
              </option>
              <option value="Nanotechnology">Nanotechnology</option>
            </select>
          </div>
          <div className="section-2">
            <label className="required" htmlFor="rese">
              Keywords Field
            </label>
            <input
              type="text"
              placeholder="Keywords"
              name="keywords"
              onChange={formik.handleChange}
              value={formik.values.keywords}
            />
          </div>
        </div>
        <div className="section">
          <div className="section-1">
            <label htmlFor="body">Download Abstract template</label>
            <a
              target="_blank"
              rel="noreferrer"
              className="downloadBtn"
              href="https://docs.google.com/file/d/1b9z1xpUtixASBguaJtEgTHdhsKUbljNT/edit?usp=docslist_api&filetype=msword"
            >
              Click to download template
            </a>
          </div>
          <div className="section-2">
            <label className="required" htmlFor="file">
              Attach the file of your abstract according to the abstract
              template (File Size must not be greater than 3MB). The abstract
              should be in word format ( .docx )
            </label>
            <input
              type="file"
              name="abstract_document_file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setAbstract_document_file(e.target.files[0]);
              }}
              // value={formik.values.abstract_document_file}
            />
          </div>
        </div>

        <button className="submit" disabled={submitting}>
          {submitting ? <Spinner /> : "Submit"}
        </button>
        {/* <div>
                <label htmlFor="name">Last Name</label>
                <input type="text" placeholder="Name"/>
            </div> */}
      </form>
    </div>
  );
};

export default AbstractForm;
