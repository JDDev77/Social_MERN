const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3900;
const UserRoutes = require("./routes/user");
const PublicationRoutes = require("./routes/publication");
const FollowRoutes = require("./routes/follow");
const methodOverride = require("method-override")
const path = require("path")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const logger = require("./logger.js")
const fs = require("fs")
const morgan = require("morgan")
const errorHandler = require("./middlewares/errorHandler.mw.js")
const passport = require("passport")
require("dotenv").config()


const whiteList = ["http://127.0.0.1:5500","http://localhost:3000/motos"] //IP FrontEnd
const corsOptions = {
    origin: (origin,callback) => {
        if(whiteList.indexOf(origin) !== -1) {
          console.log(origin)//Si el origen (URL que ataca a mi BackEnd está dentro de la lista blanca)
            callback(null,true) //Continuar == NEXT
        }else{
            //callback(new AppError("CORS Solicitud Bloqueada", 401))
            callback(null,false) //Permitir llamadas desde el propio BackEnd
        }
    },
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static('public'));
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/user", UserRoutes);
app.use("/api/publication", PublicationRoutes);
app.use("/api/follow", FollowRoutes);

app.use(errorHandler)

app.listen(port, () => {
    connection();
    console.log("Servidor de node corriendo en el puerto: ", port);
});