import Swal from "sweetalert2";

const SuccessAlert = ({ title, text }) => {
  return Swal.fire({
    icon: "success",
    title: title || "Success!",
    text: text || "Operation completed successfully",
    showConfirmButton: false,
    timer: 1500,
  });
};

const DeleteAlert = ({ title, text, deleteClick }) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteClick();
    }
  });
};

const ErrorAlert = ({ title, text, closeClick }) => {
  Swal.fire({
    icon: "error",
    title: title || "Oops...",
    text: text || "Something went wrong!",
  }).then(() => {
    if (typeof closeClick === "function") {
      closeClick();
    }
  });

  return null;
};

const WarningAlert = ({ text, confirmClick }) => {
  Swal.fire({
    icon: "warning",
    title: "Warning!",
    text: text || "Are you sure you want to proceed?",
    showCancelButton: true,
    confirmButtonColor: "#f0ad4e",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, continue",
  }).then((result) => {
    if (result.isConfirmed) {
      confirmClick();
    }
  });

  return null;
};

const InputAlert = ({ title, text, confirmClick }) => {
  Swal.fire({
    title: title || "Please enter the value",
    text: text || "Provide the necessary information",
    input: "number",
    inputPlaceholder: "Type here...",
    showCancelButton: true,
    confirmButtonText: "Submit",
    cancelButtonText: "Cancel",
    inputAttributes: {
      min: 0,
      step: 1,
    },
    preConfirm: (value) => {
      if (!value) {
        Swal.showValidationMessage("You must enter a value.");
        return false;
      }
      return value;
    },
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      confirmClick(result.value);
    }
  });

  return null;
};


export { SuccessAlert, DeleteAlert, ErrorAlert, WarningAlert, InputAlert };
