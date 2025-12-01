import { CanActivateFn, Router } from '@angular/router';
import { getIsAdminFromToken } from '../../helper/jwt.helper';

export const adminGuard: CanActivateFn = () => {
  const router = new Router();

  let isAdmin = getIsAdminFromToken();

  if (isAdmin === 'True') {
    return true;
  }

  router.navigate(['/']);
  return false;
};