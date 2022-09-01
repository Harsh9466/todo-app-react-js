import moment from "moment";

export const DateFormattor = (date) => {
  let formattedDate = new Date(date);
  formattedDate = moment(formattedDate).format("LL");
  return formattedDate;
};
