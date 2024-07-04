import { AuthService } from './auth.service';
declare const UseSessionStrategy_base: new (...args: any[]) => InstanceType<any>;
export declare class UseSessionStrategy extends UseSessionStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(req: any, username: string, password: string): Promise<any>;
}
export {};
