// import jwt from "jsonwebtoken";s
import { jwtDecode } from "jwt-decode";

export default function fetchUser() {
  const token = localStorage.getItem("token");

  if (!token) return null;
  const decoded = jwtDecode(token);
  return {
    ...decoded,
    email: decoded.sub,
    id: decoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ],
  };
}
