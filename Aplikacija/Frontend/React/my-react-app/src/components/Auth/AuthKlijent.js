import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

export function isKlijent() {
    const token = Cookies.get('token');
    if (!token) {
        return false;
    } else {
        try {
            const decodedToken = jwt_decode(token);
            const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            return userRole === "Klijent";
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return false;
        }
    }
}