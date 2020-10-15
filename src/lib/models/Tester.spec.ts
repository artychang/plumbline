import {Component, NgModule} from '@angular/core';
import {Tester, copyModule, resolveModule, createMockDeclaration, createMockImport, createPropImport} from './Tester';
import {RouterTestingModule} from '@angular/router/testing';
import {RouterModule, Routes} from '@angular/router';

describe('Tester', () => {

    @Component({
        selector: 'test-component-1',
        template: '<h1>Test Component 1</h1>'
    })
    class TestComponent1 {}

    @Component({
        selector: 'test-component-2',
        template: '<h1>Test Component 2</h1>'
    })
    class TestComponent2 {}

    @Component({
        selector: 'test-component-3',
        template: '<h1>Test Component 3</h1>'
    })
    class TestComponent3 {}

    @Component({
        selector: 'test-component-4',
        template: '<h1>Test Component 4</h1>'
    })
    class TestComponent4 {}

    @NgModule({})
    class EmptyModule1 {}

    @NgModule({
        imports: [],
        declarations: [TestComponent1, TestComponent2],
        exports: [TestComponent1, TestComponent2],
        entryComponents: [],
        providers: []
    })
    class TestModule1 {}

    @NgModule({
        imports: [],
        declarations: [TestComponent2, TestComponent3],
        exports: [TestComponent2, TestComponent3],
        entryComponents: [],
        providers: []
    })
    class TestModule2 {}

    @NgModule({
        imports: [],
        declarations: [TestComponent3, TestComponent4],
        exports: [TestComponent3, TestComponent4],
        entryComponents: [],
        providers: []
    })
    class TestModule3 {}

    @NgModule({
        imports: [TestModule1, TestModule3],
        declarations: [],
        exports: [],
        entryComponents: [],
        providers: []
    })
    class TestModule4 {}

    describe('Tester simple', () => {

        it('Complete Module Generation: Declaration 1', () => {
            let setup = new Tester(TestComponent1);
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
            let setup = new Tester(TestComponent1, {});
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
            let setup = new Tester(TestComponent2, {});
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
            let setup = new Tester(TestComponent1, {
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
                .toEqual(createPropImport(TestComponent2).name);
        });

        it('Complete Module Generation: Declaration 5', () => {
            let setup = new Tester(TestComponent1, {
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
                .toEqual(createPropImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(createPropImport(TestComponent3).name);
        });

        it('Complete Module Generation: Declaration 6', () => {
            let setup = new Tester(TestComponent1, {
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
                .toEqual(createPropImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(createPropImport(TestComponent3).name);
        });

        it('Complete Module Generation: Declaration 7', () => {
            let setup = new Tester(TestComponent1, {
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
                .toEqual(createPropImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(createPropImport(TestComponent3).name);
        });

        it('Complete Module Generation: Declaration 8', () => {
            let setup = new Tester(TestComponent1, {
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
                .toEqual(createPropImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(createPropImport(TestComponent3).name);

        });

        it('Complete Module Generation: Import 1', () => {
            let setup = new Tester(TestComponent1, {
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
                .toEqual(createMockImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(createMockImport(TestModule1).name);
        });

        it('Complete Module Generation: Import 2', () => {
            let setup = new Tester(TestComponent1, {
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
                .toEqual(createMockImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(createMockImport(TestModule1).name);
        });

        it('Complete Module Generation: Import 3', () => {
            let setup = new Tester(TestComponent1, {
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
                .toEqual(createMockImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(createMockImport(TestComponent3).name);
            expect(setup.getCompleteModule().imports[2].name)
                .toEqual(createMockImport(TestModule2).name);
        });

        it('Complete Module Generation: Import 4', () => {
            let setup = new Tester(TestComponent1, {
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
                .toEqual(createMockImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(createMockImport(TestComponent3).name);
            expect(setup.getCompleteModule().imports[2].name)
                .toEqual(createMockImport(TestModule2).name);
            expect(setup.getCompleteModule().imports[3].name)
                .toEqual(createMockImport(TestComponent4).name);
            expect(setup.getCompleteModule().imports[4].name)
                .toEqual(createMockImport(TestModule3).name);
        });

        it('Complete Module Generation: Import 5', () => {
            let setup = new Tester(TestComponent1, {
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
                .toEqual(createMockImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(createMockImport(TestComponent3).name);
            expect(setup.getCompleteModule().imports[2].name)
                .toEqual(createMockImport(TestModule2).name);
            expect(setup.getCompleteModule().imports[3].name)
                .toEqual(createMockImport(TestComponent4).name);
            expect(setup.getCompleteModule().imports[4].name)
                .toEqual(createMockImport(TestModule3).name);
        });

        it('Complete Module Generation: Import 6', () => {
            let setup = new Tester(TestComponent1, {
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
                .toEqual(createMockImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(createMockImport(TestModule1).name);
            expect(setup.getCompleteModule().imports[2].name)
                .toEqual(createMockImport(TestComponent3).name);
            expect(setup.getCompleteModule().imports[3].name)
                .toEqual(createMockImport(TestModule2).name);
            expect(setup.getCompleteModule().imports[4].name)
                .toEqual(createMockImport(TestComponent4).name);
            expect(setup.getCompleteModule().imports[5].name)
                .toEqual(createMockImport(TestModule3).name);
        });


        it('Complete Module Generation: Import 7', () => {
            let setup = new Tester(TestComponent1, {
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
                .toEqual(createMockImport(TestComponent2).name);
            expect(setup.getCompleteModule().imports[1].name)
                .toEqual(createMockImport(TestComponent3).name);
            expect(setup.getCompleteModule().imports[2].name)
                .toEqual(createMockImport(TestComponent4).name);
            expect(setup.getCompleteModule().imports[3].name)
                .toEqual(createMockImport(TestModule4).name);
        });
    });

    describe('resolveModule & copyModule functions', () => {

        it('Test #1', () => {
            // Check whether the resolve module references are correct
            let tmodule1 = resolveModule(EmptyModule1);
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
            tmodule1 = copyModule(tmodule1);
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
            @NgModule({
                imports: [],
                declarations: [TestComponent1, TestComponent2],
                exports: [],
                providers: []
            })
            class ExpModule1 {}

            let tmodule1 = resolveModule(ExpModule1);
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

            let tmodule2 = resolveModule(ExpModule1);
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
            @NgModule({
                imports: [],
                declarations: [TestComponent1, TestComponent2],
                exports: [],
                providers: []
            })
            class ExpModule1 {}

            let tmodule1 = copyModule(resolveModule(ExpModule1));
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

            let tmodule2 = copyModule(resolveModule(ExpModule1));
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

            let setup = new Tester(TestComponent1, {
                mountModule: {
                    imports: [RouterTestingModule]
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
            expect(tmodule.imports[0].name).toEqual(createMockImport(RouterTestingModule).name);

            // TestComponent was created
            expect(tmodule.declarations.length).toEqual(1);
            expect(tmodule.declarations[0]).toEqual(TestComponent1);

        });

        it('RouterTestingModule #2', () => {
            const routes: Routes = [
                {
                    path: '' , component: TestComponent2
                }, {
                    path: '**', redirectTo: '/404'
                }
            ];

            let setup = new Tester(TestComponent1, {
                mockModule: {
                    imports: [RouterModule.forChild(routes)]
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


