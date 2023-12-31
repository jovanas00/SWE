import { vratiRole } from './VratiRole';

export function isKlijent() {
    const userRole = vratiRole();
    if (userRole==="") {
        return false;
    } else {
        try {
            return userRole === "Klijent";
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return false;
        }
    }
}