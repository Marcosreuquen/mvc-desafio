import { sequelize } from "./models/connection";

sequelize.sync({ alter: true }).then((res) => {
  console.log("Connected! and alter true...");
});
