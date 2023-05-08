import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import { vratiRole } from './VratiRole';

export function isAdmin() {
    const userRole = vratiRole();
    if (userRole==="") {
        return false;
    } else {
        try {
            return userRole === "Admin";
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return false;
        }
    }
}