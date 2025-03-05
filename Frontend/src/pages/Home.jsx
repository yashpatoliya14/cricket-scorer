import { lazy } from 'react';
const Navbar = lazy(() => import('../components/Navbar.jsx'));
const TeamsInput = lazy(() => import('../components/TeamsInput.jsx'));

export default function Home() {
    return (
        <>
          <Navbar/>
          
        </>
    )
}