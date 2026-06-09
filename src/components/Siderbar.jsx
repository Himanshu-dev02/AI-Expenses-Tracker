import React from 'react'
import {sidebarStyles,cn} from "../assets/dummyStyles";
import {motion} from "framer-motion";
import { useLocation, useNavigate } from 'react-router-dom';

const Siderbar = ({user, isCollapsed, setIsCollapsed}) => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const sidebarRef = useRef(null);

    const [mobileOpen, setMobileOpen] = useState(false);
    const[activeHover, setActiveHover] = useState(null);
    
    const {naeme: usernaem = "User", email = "user@example.com"} = user || {};
    const intial = usernaem.charAt(0).toUpperCase();
  return (
 
<>
<Montion.div>
    
</Montion.div>
</> 
)
}

export default Siderbar;