import { Strategy } from "passport-custom";
declare const ApplySessionStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class ApplySessionStrategy extends ApplySessionStrategy_base {
    validate(req: any): Promise<any>;
}
export {};
