export async function checkBody(req, res, next) {
  if (req.body) {
    next();
  } else {
    res.status(401).send("Missing body");
  }
}

export async function checkProfile(req, res, next) {
  const { body } = req;
  if (body.fullName && body.bio && body.dataURL) {
    next();
  } else {
    res.status(401).send("Missing propertys on body");
  }
}

export async function checkId(req, res, next) {
  const { id } = req.query;
  if (id) {
    next();
  } else {
    res.status(401).send("Missing propertys on body");
  }
}
