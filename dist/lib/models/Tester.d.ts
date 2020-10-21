/**
 * Break a module up into its individual references.
 * @param ngModule
 * @returns references to the parts of the module
 */
export declare function resolveModule(ngModule: any): any;
/**
 * Completely copy the module pieces
 * @param ngModule
 * @returns complete clone of module
 */
export declare function copyModule(ngModule: any): {
    imports: any[];
    providers: any[];
    declarations: any[];
    exports: any[];
    entryComponents: any[];
    schemas: any[];
};
export declare class Tester<T> {
    testComponent: T;
    options: any;
    dontMock: any[];
    mockModule: any;
    mountModule: any;
    completeModule: {
        imports: any;
        declarations: any;
        providers: any;
        exports: any;
        entryComponents: any;
        schemas: any;
    };
    cacheModule: {
        imports: Map<any, any>;
        declarations: Map<any, any>;
        providers: Map<any, any>;
        exports: Map<any, any>;
        entryComponents: Map<any, any>;
        schemas: Map<any, any>;
    };
    baseModule: {
        imports: Set<unknown>;
        declarations: Set<unknown>;
        providers: Set<unknown>;
        exports: Set<unknown>;
        entryComponents: Set<unknown>;
        schemas: Set<unknown>;
    };
    constructor(testComponent: T, options?: any);
    getCompleteModule(): {
        imports: any;
        declarations: any;
        providers: any;
        exports: any;
        entryComponents: any;
        schemas: any;
    };
    processModule(mod: any, dontmock?: boolean): void;
    decToImportRef(thing: any, dontmock: boolean, addedImports?: any[], runningList?: any[]): any;
    baseDec(thingList: any[], dontmock: boolean, addedImports?: any[]): void;
    mockProv(thing: any, mod: any, dontmock?: boolean): void;
    impToImportRef(thing: any, dontmock?: boolean, exportmock?: boolean): any[];
    baseImp(thingList: any[], dontmock?: boolean): void;
}
export declare function createMockDeclaration(inDeclaration: any): any;
export declare function createMockImport(inImport: any): any;
export declare function createPropImport(inImport: any, propImport?: any): any;
export declare function createMockProvider(mockedClass: any): any;
