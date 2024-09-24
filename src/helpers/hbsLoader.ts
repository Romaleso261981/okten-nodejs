module.exports = async function loadHbs() {
  const { default: hbs } = await import("nodemailer-express-handlebars");
  return hbs;
};
