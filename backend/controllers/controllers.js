module.exports = {
  //   register: require("./admin/register"),
  //   login: require("./admin/login"),
  /* Product Controllers */
  postProduct: require("./product/createProduct"),
  putProduct: require("./product/updateProduct"),
  getProducts: require("./product/fetchProducts"),
  deleteProduct: require("./product/deleteProduct"),
  /* Customer Controllers */
  getCustomers: require("./customer/fetchCustomers"),
  postCustomers: require("./customer/createCustomer"),
  putCustomer: require("./customer/updateCustomer"),
  deleteCustomer: require("./customer/deleteCustomer"),
  /* Notification Controllers */
  postNotification: require("./notification/createNotification"),
  deleteNotification: require("./notification/deleteNotification"),
  getNotifications: require("./notification/fetchNotifications"),
  putNotification: require("./notification/updateNotification"),
  //   azampesaWebhook: require("./payment/callback"),
};
