import { useRef, useState } from "react";
import countries from "../../data/countries";
import { RiUploadCloud2Line, RiFileTextLine } from "react-icons/ri";
import Spinner from "./../Spinner/Spinner";

import "./../../sass/components/Form/Form.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";

const formatBytes = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const MAX_RECEIPT_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_RECEIPT_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const validationSchema = Yup.object({
  first_name: Yup.string().trim().required("First name is required"),
  last_name: Yup.string().trim().required("Last name is required"),
  other_names: Yup.string().trim(),
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .trim()
    .matches(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  participant_type: Yup.string().required("Select a participant type"),
  affiliate_institution: Yup.string()
    .trim()
    .required("Institution / organisation is required"),
  department: Yup.string().trim().required("Department is required"),
  country: Yup.string().required("Select a country"),
  state: Yup.string().trim().required("State / province is required"),
  city: Yup.string().trim().required("City is required"),
  receipt: Yup.mixed()
    .required("Upload your payment receipt")
    .test(
      "fileType",
      "Receipt must be a PDF, JPG or PNG",
      (file) => !file || ACCEPTED_RECEIPT_TYPES.includes(file.type),
    )
    .test(
      "fileSize",
      "Receipt must be under 5 MB",
      (file) => !file || file.size <= MAX_RECEIPT_SIZE,
    ),
});

const RegisterForm = () => {
  const fileInputRef = useRef();
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      other_names: "",
      email: "",
      phone: "",
      participant_type: "",
      affiliate_institution: "",
      department: "",
      country: "",
      state: "",
      city: "",
      receipt: null,
      password: "uics2025",
    },

    validationSchema,
    validateOnMount: false,

    onSubmit: async (values) => {
      // Strip non-record fields: the hardcoded password isn't a per-user
      // secret, and the receipt File is uploaded to Storage, not Firestore.
      const participant = { ...values };
      delete participant.password;
      delete participant.receipt;

      try {
        setSubmitting(true);

        // Upload the receipt to Firebase Storage, then store its download URL
        // alongside the participant record. (Required, so always present here.)
        const receipt = values.receipt;
        const ext = receipt.name.includes(".")
          ? receipt.name.split(".").pop()
          : "";
        const safeEmail = (values.email || "anonymous").replace(
          /[^a-zA-Z0-9._-]/g,
          "_",
        );
        const receiptPath = `receipts/${safeEmail}-${receipt.lastModified}${
          ext ? `.${ext}` : ""
        }`;
        const fileRef = storageRef(storage, receiptPath);
        await uploadBytes(fileRef, receipt, {
          contentType: receipt.type || undefined,
        });
        const receiptUrl = await getDownloadURL(fileRef);

        await addDoc(collection(db, "participants"), {
          ...participant,
          receiptUrl, // Storage download URL
          receiptPath, // Storage path, handy for admin lookups/deletion
          createdAt: serverTimestamp(), // auto-set by Firebase server
          registrationStatus: "pending", // default; manage approvals later
        });

        Swal.fire(
          "Registration Successful!",
          "Kindly check your mail for more information!",
          "success",
        );
        formik.resetForm();
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (error) {
        console.error(error);
        Swal.fire("Oops...", "Something went wrong! Kindly try again", "error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const receipt_file = formik.values.receipt;

  const openFilePicker = () => fileInputRef.current?.click();

  const setReceipt = (file) => {
    formik.setFieldValue("receipt", file || null);
    formik.setFieldTouched("receipt", true, false);
  };

  const handleReceiptChange = (e) => setReceipt(e.target.files?.[0] || null);

  const handleReceiptDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    setReceipt(e.dataTransfer.files?.[0] || null);
  };

  const removeReceipt = () => {
    setReceipt(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Inline validation message, shown once a field has been touched.
  const FieldError = ({ name }) =>
    formik.touched[name] && formik.errors[name] ? (
      <span className="field-error">{formik.errors[name]}</span>
    ) : null;

  return (
    <div className="form-container">
      <h1>Register here</h1>
      <form onSubmit={formik.handleSubmit} noValidate>
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
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
            />
            <FieldError name="first_name" />
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
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
            />
            <FieldError name="last_name" />
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
              onBlur={formik.handleBlur}
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
              onBlur={formik.handleBlur}
              value={formik.values.participant_type}
            >
              <option value="" hidden>
                Participant Type
              </option>
              <option value="Physical">Physical</option>
              <option value="Virtual">Virtual</option>
            </select>
            <FieldError name="participant_type" />
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
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <FieldError name="email" />
          </div>
          <div className="section-2">
            <label className="required" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            <FieldError name="phone" />
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
              onBlur={formik.handleBlur}
              value={formik.values.affiliate_institution}
            />
            <FieldError name="affiliate_institution" />
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
              onBlur={formik.handleBlur}
              value={formik.values.department}
            />
            <FieldError name="department" />
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
              onBlur={formik.handleBlur}
              value={formik.values.country}
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
            <FieldError name="country" />
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
              onBlur={formik.handleBlur}
              value={formik.values.state}
            />
            <FieldError name="state" />
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
              id="city"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            <FieldError name="city" />
          </div>
          <div className="section-2">
            <label className="required file-drop__field-label" htmlFor="receipt_file">
              Receipt of Payment
            </label>

            {/* Hidden native input — triggered via the dropzone below. */}
            <input
              type="file"
              id="receipt_file"
              name="receipt_file"
              accept=".pdf,.jpg,.jpeg,.png"
              ref={fileInputRef}
              onChange={handleReceiptChange}
              hidden
            />

            {receipt_file ? (
              <div className="file-drop file-drop--filled">
                <span className="file-drop__icon">
                  <RiFileTextLine size={18} />
                </span>
                <span className="file-drop__body">
                  <span className="file-drop__primary">{receipt_file.name}</span>
                  <span className="file-drop__hint">
                    {formatBytes(receipt_file.size)}
                  </span>
                </span>
                <button
                  type="button"
                  className="file-drop__clear"
                  onClick={removeReceipt}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                aria-label="Upload receipt of payment"
                className={`file-drop ${
                  dragActive ? "file-drop--active" : ""
                }`}
                onClick={openFilePicker}
                onBlur={() => formik.setFieldTouched("receipt", true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openFilePicker();
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleReceiptDrop}
              >
                <span className="file-drop__icon">
                  <RiUploadCloud2Line size={20} />
                </span>
                <span className="file-drop__body">
                  <span className="file-drop__primary">Upload receipt</span>
                  <span className="file-drop__hint">
                    Click or drag · PDF, JPG or PNG · up to 5&nbsp;MB
                  </span>
                </span>
              </div>
            )}
            <FieldError name="receipt" />
          </div>
        </div>
        <button className="submit" disabled={submitting}>
          {submitting ? <Spinner /> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
