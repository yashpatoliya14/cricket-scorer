import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
const Navbar = lazy(() => import('./components/createMatch/Navbar.jsx'));
// const TeamsInput = lazy(() => import('../components/createMatch/TeamsInput.jsx'));

export default function Layout() {
    return (
        <>
          <Navbar/>
          <Outlet/>
        </>
    )
}