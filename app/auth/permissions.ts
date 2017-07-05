import { UserAccount } from '../api/user-account/user-account.model';
import { ICustomRequest } from '../utils/custom.types';

interface URLMatcher {
    expr: RegExp;
    condition: boolean;
}

export function can(user: UserAccount, req: ICustomRequest, url: string): boolean {
    const method = req.method;
    const payload = req.body;
    const urls: URLMatcher[] = [
        {
            // allow everything
            expr: /\/.*$$/ig,
            condition: true,
        },
        /*
        {
            // user-account api
            expr: /\/user-account.*$$/ig,
            condition: user.role === 'manager' || user.role === 'root',
        },
        */
    ];

    for (const u of urls) {
        const result = u.expr.exec(url);
        if (result) {
            return u.condition;
        }
    }

    // everything failed, you shall not pass
    return false;
}
