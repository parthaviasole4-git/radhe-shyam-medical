import { CanActivateFn, Router } from '@angular/router';
import { getIsAdminFromToken } from '../../helper/jwt.helper';

export const adminGuard: CanActivateFn = () => {
  const router = new Router();

  if (getIsAdminFromToken()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};