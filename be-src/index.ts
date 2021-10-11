//packages
import * as express from "express";
import * as path from "path";
//acá el controller
import { ProfileController } from "./controllers/profile-controller";
const profile = new ProfileController();
//libs
import { cloudinary } from "./lib/cloudinary";
//middlewares and secrets
import { checkBody, checkProfile, checkId } from "./middlewares";
import * as cors from "cors";
import "./sync";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json({ limit: "100mb" }));
app.use(cors());

app.get("/test", async (req, res) => {
  res.json("ok");
});

app.post("/profile", checkBody, checkProfile, async (req, res) => {
  //Recibe los 3 datos y los guarda. Para esto debe usar un controller que chequea que todo esté correcto e interactúa con los modelos necesarios. Cómo el hecho de manipular la imagen en formato dataURI puede traernos problemas futuros, ya que se trata de un texto muy largo y no es lo ideal, vamos a guardar la imagen en Cloudinary, un servicio de hosting para imágenes muy poderoso y muy sencillo de usar. Simplemente nos vamos a crear una cuenta y a usar la librería tal cual lo indica la documentación (https://cloudinary.com/documentation/image_upload_api_reference), lo que vamos a guardar en la base de datos finalmente van a ser: nombre, bio y url de la imagen.
  try {
    const dataURL = await cloudinary.uploader.upload(req.body.dataURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 1000,
    });
    const profileCrated = await profile.createProfile(
      req.body.fullName,
      req.body.bio,
      dataURL.secure_url
    );
    res.status(201).send(profileCrated);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/profile", checkBody, checkId, async (req, res) => {
  //Nos devuelva la data de nuestro perfil (nombre, bio y url de la imagen) y vamos a mostrar esa información precio a nuestro formulario, mostrando la última data actualizada de nuestro perfil.
  const { id } = req.query;
  try {
    const profileGet = await profile.getProfile(id);
    res.status(200).send(profileGet);
  } catch (err) {
    res.status(404).send(err);
  }
});

app.use(express.static(path.resolve(__dirname, "../fe-dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../fe-dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
