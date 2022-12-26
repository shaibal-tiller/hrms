import React from 'react'
import { routes } from '../../utils/route_util'
import { Routes, Route, } from "react-router"
import NotFound from '../../shared/NotFound'
const Router = () => {
    const getRoutes = () => {
        return routes.map((route, index) => (
            <Route key={index} exact path={route.path} element={route.element}></Route>
        ))
    }
    return (
        <div>
            <Routes>
                {/* ***************** routes are created in route_util & mapped here  ******************* */}
                {getRoutes()}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default Router