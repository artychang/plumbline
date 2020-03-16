"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const Tester_1 = require("./Tester");
const testing_1 = require("@angular/router/testing");
const router_1 = require("@angular/router");
describe('Tester', () => {
    let TestComponent1 = class TestComponent1 {
    };
    TestComponent1 = __decorate([
        core_1.Component({
            selector: 'test-component-1',
            template: '<h1>Test Component 1</h1>'
        })
    ], TestComponent1);
    let TestComponent2 = class TestComponent2 {
    };
    TestComponent2 = __decorate([
        core_1.Component({
            selector: 'test-component-2',
            template: '<h1>Test Component 2</h1>'
        })
    ], TestComponent2);
    let TestComponent3 = class TestComponent3 {
    };
    TestComponent3 = __decorate([
        core_1.Component({
            selector: 'test-component-3',
            template: '<h1>Test Component 3</h1>'
        })
    ], TestComponent3);
    let TestComponent4 = class TestComponent4 {
    };
    TestComponent4 = __decorate([
        core_1.Component({
            selector: 'test-component-4',
            template: '<h1>Test Component 4</h1>'
        })
    ], TestComponent4);
    let EmptyModule1 = class EmptyModule1 {
    };
    EmptyModule1 = __decorate([
        core_1.NgModule({})
    ], EmptyModule1);
    let TestModule1 = class TestModule1 {
    };
    TestModule1 = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [TestComponent1, TestComponent2],
            exports: [TestComponent1, TestComponent2],
            entryComponents: [],
            providers: []
        })
    ], TestModule1);
    let TestModule2 = class TestModule2 {
    };
    TestModule2 = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [TestComponent2, TestComponent3],
            exports: [TestComponent2, TestComponent3],
            entryComponents: [],
            providers: []
        })
    ], TestModule2);
    let TestModule3 = class TestModule3 {
    };
    TestModule3 = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [TestComponent3, TestComponent4],
            exports: [TestComponent3, TestComponent4],
            entryComponents: [],
            providers: []
        })
    ], TestModule3);
    let TestModule4 = class TestModule4 {
    };
    TestModule4 = __decorate([
        core_1.NgModule({
            imports: [TestModule1, TestModule3],
            declarations: [],
            exports: [],
            entryComponents: [],
            providers: []
        })
    ], TestModule4);
    describe('Tester simple', () => {
        it('Complete Module Generation: Declaration 1', () => {
            let setup = new Tester_1.Tester(TestComponent1);
            expect(setup).not.toEqual(null);
            expect(JSON.stringify(setup.getCompleteModule())).toEqual(JSON.stringify({
                imports: [],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0]).toEqual(TestComponent1);
            expect(setup.getCompleteModule().declarations[0]).not.toEqual(TestComponent2);
        });
        it('Complete Module Generation: Declaration 2', () => {
            let setup = new Tester_1.Tester(TestComponent1, {});
            expect(setup).not.toEqual(null);
            expect(JSON.stringify(setup.getCompleteModule())).toEqual(JSON.stringify({
                imports: [],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0]).toEqual(TestComponent1);
            expect(setup.getCompleteModule().declarations[0]).not.toEqual(TestComponent2);
        });
        it('Complete Module Generation: Declaration 3', () => {
            let setup = new Tester_1.Tester(TestComponent2, {});
            expect(setup).not.toEqual(null);
            expect(JSON.stringify(setup.getCompleteModule())).toEqual(JSON.stringify({
                imports: [],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0]).not.toEqual(TestComponent1);
            expect(setup.getCompleteModule().declarations[0]).toEqual(TestComponent2);
        });
        it('Complete Module Generation: Declaration 4', () => {
            let setup = new Tester_1.Tester(TestComponent1, {
                mountModule: {
                    declarations: [TestComponent2]
                }
            });
            expect(setup).not.toEqual(null);
            expect(JSON.stringify(setup.getCompleteModule())).toEqual(JSON.stringify({
                imports: [null],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0])
                .toEqual(TestComponent1);
            expect(setup.getCompleteModule().imports[0].name)
                .toEqual(Tester_1.createPropImport(TestComponent2).name);
        });
        it('Complete Module Generation: Declaration 5', () => {
            let setup = new Tester_1.Tester(TestComponent1, {
                mountModule: {
                    declarations: [TestComponent1, TestComponent2, TestComponent3]
                }
            });
            expect(setup).not.toEqual(null);
            expect(JSON.stringify(setup.getCompleteModule())).toEqual(JSON.stringify({
                imports: [null, null],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0])
                .toEqual(TestComponent1);
            expect(setup.getCompleteModule().imports[0].name)
                .toEqual(Tester_1.createPropImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(Tester_1.createPropImport(TestComponent3).name);
        });
        it('Complete Module Generation: Declaration 6', () => {
            let setup = new Tester_1.Tester(TestComponent1, {
                mockModule: {
                    declarations: [TestComponent1, TestComponent2, TestComponent3]
                }
            });
            expect(setup).not.toEqual(null);
            expect(JSON.stringify(setup.getCompleteModule())).toEqual(JSON.stringify({
                imports: [null, null],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0])
                .toEqual(TestComponent1);
            expect(setup.getCompleteModule().imports[0].name)
                .toEqual(Tester_1.createPropImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(Tester_1.createPropImport(TestComponent3).name);
        });
        it('Complete Module Generation: Declaration 7', () => {
            let setup = new Tester_1.Tester(TestComponent1, {
                mountModule: {
                    declarations: [TestComponent1, TestComponent2]
                },
                mockModule: {
                    declarations: [TestComponent2, TestComponent3]
                }
            });
            expect(setup).not.toEqual(null);
            expect(JSON.stringify(setup.getCompleteModule())).toEqual(JSON.stringify({
                imports: [null, null],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0])
                .toEqual(TestComponent1);
            expect(setup.getCompleteModule().imports[0].name)
                .toEqual(Tester_1.createPropImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(Tester_1.createPropImport(TestComponent3).name);
        });
        it('Complete Module Generation: Declaration 8', () => {
            let setup = new Tester_1.Tester(TestComponent1, {
                mountModule: {
                    declarations: [[[TestComponent1, TestComponent2], TestComponent3]]
                },
            });
            expect(setup).not.toEqual(null);
            let completeMod = setup.getCompleteModule();
            expect(JSON.stringify(completeMod)).toEqual(JSON.stringify({
                imports: [null, null],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0])
                .toEqual(TestComponent1);
            expect(setup.getCompleteModule().imports[0].name)
                .toEqual(Tester_1.createPropImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(Tester_1.createPropImport(TestComponent3).name);
        });
        it('Complete Module Generation: Import 1', () => {
            let setup = new Tester_1.Tester(TestComponent1, {
                mountModule: {
                    imports: [TestModule1]
                }
            });
            expect(setup).not.toEqual(null);
            expect(JSON.stringify(setup.getCompleteModule())).toEqual(JSON.stringify({
                imports: [null, null],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0])
                .toEqual(TestComponent1);
            expect(setup.getCompleteModule().imports[0].name)
                .toEqual(Tester_1.createMockImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(Tester_1.createMockImport(TestModule1).name);
        });
        it('Complete Module Generation: Import 2', () => {
            let setup = new Tester_1.Tester(TestComponent1, {
                mockModule: {
                    imports: [TestModule1]
                }
            });
            expect(setup).not.toEqual(null);
            expect(JSON.stringify(setup.getCompleteModule())).toEqual(JSON.stringify({
                imports: [null, null],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0])
                .toEqual(TestComponent1);
            expect(setup.getCompleteModule().imports[0].name)
                .toEqual(Tester_1.createMockImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(Tester_1.createMockImport(TestModule1).name);
        });
        it('Complete Module Generation: Import 3', () => {
            let setup = new Tester_1.Tester(TestComponent1, {
                mockModule: {
                    imports: [TestModule2]
                }
            });
            expect(setup).not.toEqual(null);
            expect(JSON.stringify(setup.getCompleteModule())).toEqual(JSON.stringify({
                imports: [null, null, null],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0])
                .toEqual(TestComponent1);
            expect(setup.getCompleteModule().imports[0].name)
                .toEqual(Tester_1.createMockImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(Tester_1.createMockImport(TestComponent3).name);
            expect(setup.getCompleteModule().imports[2].name)
                .toEqual(Tester_1.createMockImport(TestModule2).name);
        });
        it('Complete Module Generation: Import 4', () => {
            let setup = new Tester_1.Tester(TestComponent1, {
                mockModule: {
                    imports: [TestModule2, TestModule3]
                }
            });
            expect(setup).not.toEqual(null);
            expect(JSON.stringify(setup.getCompleteModule())).toEqual(JSON.stringify({
                imports: [null, null, null, null, null],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0])
                .toEqual(TestComponent1);
            expect(setup.getCompleteModule().imports[0].name)
                .toEqual(Tester_1.createMockImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(Tester_1.createMockImport(TestComponent3).name);
            expect(setup.getCompleteModule().imports[2].name)
                .toEqual(Tester_1.createMockImport(TestModule2).name);
            expect(setup.getCompleteModule().imports[3].name)
                .toEqual(Tester_1.createMockImport(TestComponent4).name);
            expect(setup.getCompleteModule().imports[4].name)
                .toEqual(Tester_1.createMockImport(TestModule3).name);
        });
        it('Complete Module Generation: Import 5', () => {
            let setup = new Tester_1.Tester(TestComponent1, {
                mountModule: {
                    imports: [TestModule2]
                },
                mockModule: {
                    imports: [TestModule3]
                }
            });
            expect(setup).not.toEqual(null);
            expect(JSON.stringify(setup.getCompleteModule())).toEqual(JSON.stringify({
                imports: [null, null, null, null, null],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0])
                .toEqual(TestComponent1);
            expect(setup.getCompleteModule().imports[0].name)
                .toEqual(Tester_1.createMockImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(Tester_1.createMockImport(TestComponent3).name);
            expect(setup.getCompleteModule().imports[2].name)
                .toEqual(Tester_1.createMockImport(TestModule2).name);
            expect(setup.getCompleteModule().imports[3].name)
                .toEqual(Tester_1.createMockImport(TestComponent4).name);
            expect(setup.getCompleteModule().imports[4].name)
                .toEqual(Tester_1.createMockImport(TestModule3).name);
        });
        it('Complete Module Generation: Import 6', () => {
            let setup = new Tester_1.Tester(TestComponent1, {
                mockModule: {
                    imports: [[[TestModule1, TestModule2], TestModule3]]
                }
            });
            expect(setup).not.toEqual(null);
            expect(JSON.stringify(setup.getCompleteModule())).toEqual(JSON.stringify({
                imports: [null, null, null, null, null, null],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0])
                .toEqual(TestComponent1);
            expect(setup.getCompleteModule().imports[0].name)
                .toEqual(Tester_1.createMockImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(Tester_1.createMockImport(TestModule1).name);
            expect(setup.getCompleteModule().imports[2].name)
                .toEqual(Tester_1.createMockImport(TestComponent3).name);
            expect(setup.getCompleteModule().imports[3].name)
                .toEqual(Tester_1.createMockImport(TestModule2).name);
            expect(setup.getCompleteModule().imports[4].name)
                .toEqual(Tester_1.createMockImport(TestComponent4).name);
            expect(setup.getCompleteModule().imports[5].name)
                .toEqual(Tester_1.createMockImport(TestModule3).name);
        });
        it('Complete Module Generation: Import 7', () => {
            let setup = new Tester_1.Tester(TestComponent1, {
                mountModule: {
                    imports: [TestModule4]
                }
            });
            expect(setup).not.toEqual(null);
            expect(JSON.stringify(setup.getCompleteModule())).toEqual(JSON.stringify({
                imports: [null, null, null, null],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            expect(setup.getCompleteModule().declarations[0])
                .toEqual(TestComponent1);
            expect(setup.getCompleteModule().imports[0].name)
                .toEqual(Tester_1.createMockImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(Tester_1.createMockImport(TestComponent3).name);
            expect(setup.getCompleteModule().imports[2].name)
                .toEqual(Tester_1.createMockImport(TestComponent4).name);
            expect(setup.getCompleteModule().imports[3].name)
                .toEqual(Tester_1.createMockImport(TestModule4).name);
        });
    });
    describe('resolveModule & copyModule functions', () => {
        it('Test #1', () => {
            // Check whether the resolve module references are correct
            let tmodule1 = Tester_1.resolveModule(EmptyModule1);
            expect(tmodule1).not.toEqual(null);
            expect(JSON.stringify(tmodule1)).toEqual(JSON.stringify({
                imports: [],
                providers: [],
                declarations: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            // Check whether the copy module made clones of the components
            tmodule1 = Tester_1.copyModule(tmodule1);
            expect(JSON.stringify(tmodule1)).toEqual(JSON.stringify({
                imports: [],
                providers: [],
                declarations: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
        });
        it('Test #2', () => {
            let ExpModule1 = class ExpModule1 {
            };
            ExpModule1 = __decorate([
                core_1.NgModule({
                    imports: [],
                    declarations: [TestComponent1, TestComponent2],
                    exports: [],
                    providers: []
                })
            ], ExpModule1);
            let tmodule1 = Tester_1.resolveModule(ExpModule1);
            expect(tmodule1).not.toEqual(null);
            expect(JSON.stringify(tmodule1)).toEqual(JSON.stringify({
                imports: [],
                declarations: [TestComponent1, TestComponent2],
                exports: [],
                providers: [],
                entryComponents: [],
                schemas: []
            }));
            // Change the reference values - remove one component
            tmodule1.declarations.pop();
            let tmodule2 = Tester_1.resolveModule(ExpModule1);
            expect(JSON.stringify(tmodule2)).toEqual(JSON.stringify({
                imports: [],
                declarations: [TestComponent1],
                exports: [],
                providers: [],
                entryComponents: [],
                schemas: []
            }));
            expect(tmodule2.declarations[0]).toEqual(TestComponent1);
            // Since they are only references, the contents should still be the same
            expect(tmodule1).toEqual(tmodule2);
        });
        it('Test #3', () => {
            let ExpModule1 = class ExpModule1 {
            };
            ExpModule1 = __decorate([
                core_1.NgModule({
                    imports: [],
                    declarations: [TestComponent1, TestComponent2],
                    exports: [],
                    providers: []
                })
            ], ExpModule1);
            let tmodule1 = Tester_1.copyModule(Tester_1.resolveModule(ExpModule1));
            expect(JSON.stringify(tmodule1)).toEqual(JSON.stringify({
                imports: [],
                providers: [],
                declarations: [TestComponent1, TestComponent2],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            // Change the reference values for tmodule1 - remove one component
            tmodule1.declarations.pop();
            let tmodule2 = Tester_1.copyModule(Tester_1.resolveModule(ExpModule1));
            expect(JSON.stringify(tmodule2)).toEqual(JSON.stringify({
                imports: [],
                providers: [],
                declarations: [TestComponent1, TestComponent2],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            // Check tmodule1
            expect(tmodule1.declarations.length).not.toEqual(2);
            expect(tmodule1.declarations.length).toEqual(1);
            expect(tmodule1.declarations[0]).toEqual(TestComponent1);
            // Check tmodule2
            expect(tmodule2.declarations.length).not.toEqual(1);
            expect(tmodule2.declarations.length).toEqual(2);
            expect(tmodule2.declarations[0]).toEqual(TestComponent1);
            expect(tmodule2.declarations[1]).toEqual(TestComponent2);
            // Since they are complete copies, the contents should be different
            expect(tmodule1).not.toEqual(tmodule2);
        });
    });
    describe('Tester complex', () => {
        it('RouterTestingModule #1', () => {
            let setup = new Tester_1.Tester(TestComponent1, {
                mountModule: {
                    imports: [testing_1.RouterTestingModule]
                }
            });
            expect(setup).not.toEqual(null);
            let tmodule = setup.getCompleteModule();
            expect(JSON.stringify(tmodule)).toEqual(JSON.stringify({
                imports: [null],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            // RouterTestingModule mock import created
            expect(tmodule.imports.length).toEqual(1);
            expect(tmodule.imports[0].name).toEqual(Tester_1.createMockImport(testing_1.RouterTestingModule).name);
            // TestComponent was created
            expect(tmodule.declarations.length).toEqual(1);
            expect(tmodule.declarations[0]).toEqual(TestComponent1);
        });
        it('RouterTestingModule #2', () => {
            const routes = [
                {
                    path: '', component: TestComponent2
                }, {
                    path: '**', redirectTo: '/404'
                }
            ];
            let setup = new Tester_1.Tester(TestComponent1, {
                mockModule: {
                    imports: [router_1.RouterModule.forChild(routes)]
                }
            });
            expect(setup).not.toEqual(null);
            let tmodule = setup.getCompleteModule();
            // console.log(tmodule);
            expect(JSON.stringify(tmodule)).toEqual(JSON.stringify({
                imports: [null, null, null, null, null, [null]],
                declarations: [null],
                providers: [],
                exports: [],
                entryComponents: [],
                schemas: []
            }));
            // RouterTestingModule mock import created
            expect(tmodule.imports.length).toEqual(6);
            // expect(tmodule.imports[0].name).toEqual(createMockImport(RouterModule).name);
            // TestComponent was created
            expect(tmodule.declarations.length).toEqual(1);
            expect(tmodule.declarations[0]).toEqual(TestComponent1);
        });
    });
});
