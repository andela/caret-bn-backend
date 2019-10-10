export default (res, message, data, status) => res.status(status).json({
  status,
  message,
  data
});
