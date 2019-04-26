export declare const add: (obj?: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare const responses: (status: number, desc: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare const description: (desc: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare const headers: (key: string, meta: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare const tag: (tag: string | string[]) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare const param: {
    query: (name: string, description?: string, required?: boolean) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
    header: (name: string, description?: string, required?: boolean) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
    formData: (name: string, description?: string, required?: boolean) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
    body: (schema: any, description?: string, name?: string, required?: boolean) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
};
