import { vratiRole } from './VratiRole';

export function isSalon() {
    const userRole = vratiRole();
    if (userRole==="") {
        return false;
    } else {
        try {
            return userRole === "Salon";
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return false;
        }
    }
}