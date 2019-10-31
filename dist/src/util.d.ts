/// <reference types="node" />
declare class Util {
    static _cache: {
        [key: string]: any;
    };
    merge(a: any, b: any): any;
    run(caller: any, obj: any): any;
    compress(data: Buffer | string): Promise<Buffer>;
    cache(controller: any, key: string, type: string, data: () => any, time?: number): any;
}
declare const _default: Util;
export default _default;
