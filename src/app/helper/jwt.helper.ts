import { jwtDecode } from 'jwt-decode';

export interface MyToken {
  id: string;
  isAdmin: boolean;
}

export function decodeToken(token: string): any {
  if (!token) return null;
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
}

export function getUserIdFromToken(): string {
  const token = localStorage.getItem('token');
  if (!token) return '';
  const decoded = decodeToken(token);
  return decoded?.userId || null;
}

export function getIsAdminFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return '';

  const decoded = jwtDecode<MyToken>(token);
  return decoded.isAdmin;
}
