import { lazy } from 'react';
const MatchesDisplay = lazy(() => import('../components/Home/MatchesDisplay.jsx'));

export default function Home() {
    return (
        <>
          <MatchesDisplay/>
          
        </>
    )
}