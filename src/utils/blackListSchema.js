import * as yup from "yup";

const blackListSchema = yup.object().shape({
  property_id: yup
    .string("Enter a Valid Input")
    .required("property_id is required"),
  license_plate: yup
    .string("Enter a Valid Input")
    .required("license_plate is required"),
  remark: yup.string("Enter a Valid Input"),
});
export default blackListSchema;
