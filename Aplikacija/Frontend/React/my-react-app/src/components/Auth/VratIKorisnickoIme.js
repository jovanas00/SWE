import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

export function vratiKorisnickoIme() {
    const token = Cookies.get('token');
    if (!token) {
        return false;
    } else {
        try {
            const decodedToken = jwt_decode(token);
            const KorIme = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];
            return KorIme;
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return false;
        }
    }
}