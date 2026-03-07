import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Home, Auth, Orders,Tables,Menu,Dashboard } from './pages'
import  Header  from "./components/shared/Header.jsx";
import { useSelector } from "react-redux";
import useLoad from "./hooks/useLoad.js";
import Loader from "./components/shared/Loader.jsx";

function Layout() {
    const location =useLocation();
    const isLoading = useLoad();
    const hideHeaderRoutes = ["/auth"];
    const { isAuth } = useSelector((state)=> state.user);

    if(isLoading) return <Loader />
    return(
        <>
        
            {!hideHeaderRoutes.includes(location.pathname) && <Header />}
            <Routes>
                <Route path="/" element={
                    <ProtectedRoutes>
                        <Home />
                    </ProtectedRoutes>
                } /> 
                <Route path="/auth" element= {isAuth ? <Navigate to="/" /> : <Auth />} />
                <Route path="/orders" element={
                    <ProtectedRoutes>
                        <Orders />
                    </ProtectedRoutes>
                } /> 
                <Route path="/tables" element={
                    <ProtectedRoutes>
                        <Tables />
                    </ProtectedRoutes>
                } /> 
                <Route path="/menu" element={
                    <ProtectedRoutes>
                        <Menu />
                    </ProtectedRoutes>
                } />
                <Route path="/dashboard" element={
                    <ProtectedRoutes>
                        <Dashboard />
                    </ProtectedRoutes>
                } />
                <Route path="*" element={<div className="text-5xl tracking-tighter text-red-900 font-bold">Page Not Found</div>} />
            </Routes>
        </>
    )
}

function ProtectedRoutes({children}){
    const { isAuth } = useSelector((state)=>state.user);
    if(!isAuth){
        return <Navigate to="/auth" />
    }

    return children;
}

function App(){
    return (
    <Router>
        <Layout />
    </Router>
)
}
export default App;