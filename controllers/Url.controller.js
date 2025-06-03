const Url = require("../models/Url");

const handleViewIndex = (req, res) => {
  res.render("index", { title: "URL Shortener" });
};

const handleCreateUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).render("index", {
      title: "URL Shortener",
      error: "Please provide a URL to shorten",
    });
  }

  try {
    new URL(url);
  } catch (error) {
    return res.status(400).render("index", {
      title: "URL Shortener",
      error: "Please provide a valid URL",
    });
  }

  const shortCode = Math.random().toString(36).substr(2, 8);

  const protocol =
    req.secure || req.get("x-forwarded-proto") === "https" ? "https" : "http";
  const host = req.get("host");
  const shortUrl = `${protocol}://${host}/${shortCode}`;

  const existingUrl = await Url.findOne({ originalUrl: url });
  if (existingUrl) {
    return res.render("index", {
      title: "URL Shortener",
      originalUrl: url,
      shortUrl: existingUrl.shortUrl,
      success: true,
    });
  }

  await Url.create({
    originalUrl: url,
    shortUrl: shortUrl,
    code: shortCode,
  });

  res.render("index", {
    title: "URL Shortener",
    originalUrl: url,
    shortUrl: shortUrl,
    success: true,
  });
};

const handleRedirect = async (req, res) => {
  const { shortCode } = req.params;

  const urlExists = await Url.findOne({ code: shortCode });

  if (urlExists) {
    urlExists.clickCount += 1;
    await urlExists.save();

    return res.redirect(urlExists.originalUrl);
  } else {
    return res.status(404).render("404");
  }
};

const handle404 = (req, res) => {
  res.status(404).render("404");
};

module.exports = {
  handleCreateUrl,
  handleViewIndex,
  handleRedirect,
  handle404,
};
