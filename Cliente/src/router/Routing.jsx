//import React from "react"
import { Routes, Route, BrowserRouter,Link} from "react-router-dom"
import { PublicLayout } from "../components/layout/public/PublicLayout.jsx"
import { PrivateLayout } from "../components/layout/private/PrivateLayout.jsx"
import { Login } from "../components/user/Login"
import { Register } from "../components/user/Register"
import { Feed } from "../components/publication/feed.jsx"
import { AuthProvider } from "../context/AuthProvider.jsx"
import {Logout} from "../components/user/Logout.jsx"
import { People } from "../components/user/People.jsx"
import { Config } from "../components/user/Config.jsx"

//TODO IMPLEMENTAR VISTAR ERROR 404
export const Routing = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
        </Route>

        <Route path="/social" element={<PrivateLayout/>}>
            <Route index element= {<Feed />} />
            <Route path="feed" element=  {<Feed />} />
            <Route path="logout" element= {<Logout />}/>
            <Route path="gente" element= {<People />}/>
            <Route path="ajustes" element= {<Config />}/>

        </Route>
  
        <Route path="*" element={
          <>
          <p>
          <h1>Error 404 </h1>
          <Link to ="/">Volver al inicio</Link>
          </p>
          </>
        }/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
