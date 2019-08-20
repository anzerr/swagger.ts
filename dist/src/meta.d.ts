export declare const add: (obj?: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare const responses: (status: number, desc: string) => any;
export declare const description: (desc: string) => any;
export declare const headers: (key: string, meta: any) => any;
export declare const tag: (t: string | string[]) => any;
export declare const param: {
    query: (name: string, desc?: string, option?: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
    header: (name: string, desc?: string, option?: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
    formData: (name: string, desc?: string, option?: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
    body: (schema: any, desc?: string, name?: string, option?: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
    path: (name: string, desc?: string, example?: string, option?: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
};
