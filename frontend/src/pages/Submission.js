import React, { useCallback, useState } from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import styles from "./../sass/pages/Submission.module.scss";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

import Spinner from "./../components/Spinner/Spinner";
import axios from "axios";
import Swal from "sweetalert2";

function Submission() {
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [submission_type, setSubmission_type] = useState("");
  const [submission_file, setSubmission_file] = useState(null);
  const [evidence_of_payment_file, setEvidence_of_payment_file] =
    useState(null);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    let data = {
      email,
      submission_file,
      submission_type,
      evidence_of_payment_file,
    };

    const requestBody = new FormData();

    for (const value in data) {
      requestBody.append(value, data[value]);
    }

    try {
      setSubmitting(true);

      let response = await axios.post("/events/clearance/", requestBody);

      if (response.status === 201) {
        Swal.fire(
          "Submission Successful!",
          "Kindly check your mail for the more information!",
          "success"
        );
        setEmail("");
        setSubmission_type("");
        setSubmission_file(null);
        setEvidence_of_payment_file(null);
        setSubmitting(false);
      } else {
        Swal.fire("Oops...", "Something went wrong! Kindly try again", "error");
        setSubmitting(false);
      }
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong! Kindly try again", "error");
      setSubmitting(false);
    }
  };

  return (
    <div>
      <CommonHero
        title="Clearance"
        info=""
        bg={
          "https://www.np.edu.sg/images/default-source/admissions-enrolment2/guide-for-prospective-students/course-fee.jpg"
        }
      />
      <form onSubmit={formSubmitHandler} className={styles.SubmissionForm}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pre">Submission Type</label>
          <select
            required={true}
            onChange={(e) => setSubmission_type(e.target.value)}
          >
            <option value="" hidden>
              {" "}
              Choose Clearance Type
            </option>
            <option value="Manuscript">Manuscript</option>
            <option value="Advert">Advert</option>
            <option value="Exhibition">Exhibition</option>
          </select>
        </div>
        <div>
          <label>Evidence of Payment</label>
          <FileUploader
            setRequiredUpload={(file) => setEvidence_of_payment_file(file)}
            requiredUpload={evidence_of_payment_file}
          />
        </div>
        <div>
          <label>Submission</label>
          <FileUploader
            setRequiredUpload={(file) => setSubmission_file(file)}
            requiredUpload={submission_file}
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? <Spinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
}

const FileUploader = ({ setRequiredUpload, requiredUpload }) => {
  // const [requiredUpload, setRequiredUpload] = useState(null);
  const onDrop = useCallback(async (acceptedFiles) => {
    setRequiredUpload(acceptedFiles[0]);
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={styles.fileInput} {...getRootProps()}>
      <input {...getInputProps()} directory="" webkitdirectory="" type="file" />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>
          {requiredUpload
            ? "File Ready"
            : "Drag and drop some files here, or click to select files"}
        </p>
      )}
    </div>
  );
};

FileUploader.propTypes = {
  setRequiredUpload: PropTypes.func,
  requiredUpload: PropTypes.object,
};

export default Submission;
