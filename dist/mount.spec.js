"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const mount_1 = require("./mount");
const testing_1 = require("@angular/router/testing");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const primeng_1 = require("primeng/primeng");
const Tester_1 = require("./models/Tester");
const DirectiveTests_1 = require("./test/DirectiveTests");
describe('Mount', () => {
    let TestComponent1 = class TestComponent1 {
    };
    TestComponent1 = __decorate([
        core_1.Component({
            selector: 'test-component-1',
            template: '<h1>Test Component 1</h1>'
        })
    ], TestComponent1);
    let SimpleComponent = class SimpleComponent {
    };
    SimpleComponent = __decorate([
        core_1.Component({
            selector: 'simple-component',
            template: '<h1>This is Simple</h1>'
        })
    ], SimpleComponent);
    let TitleComponent = class TitleComponent {
        constructor() {
            this.titleIn = '';
            this.titleOut = '';
            this.subtitleIn = '';
            this.subtitleOut = '';
        }
        ngOnInit() {
            this.titleIn = this.titleIn ? this.titleIn : '';
            this.titleOut = this.titleIn;
            this.subtitleIn = this.subtitleIn ? this.subtitleIn : '';
            this.subtitleOut = this.subtitleIn;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TitleComponent.prototype, "titleIn", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TitleComponent.prototype, "subtitleIn", void 0);
    TitleComponent = __decorate([
        core_1.Component({
            selector: 'title-component',
            template: `
            <h1>{{titleOut}}</h1>
            <p>{{subtitleOut}}</p>
        `
        }),
        __metadata("design:paramtypes", [])
    ], TitleComponent);
    let ComplexComponent = class ComplexComponent {
        constructor() {
            this.counter = 1;
        }
        ngOnInit() { }
        ngOnChanges() { }
        setCounter(count) {
            this.counter = count;
        }
        getCounter() {
            return this.counter;
        }
    };
    ComplexComponent = __decorate([
        core_1.Component({
            selector: `complex-component`,
            template: `
            <simple-component></simple-component>
            <title-component [titleIn]="'Title 1'" [subtitleIn]="'Text 2'"></title-component>
            <span>{{counter}}</span>
        `
        })
    ], ComplexComponent);
    let ShallowModule1 = class ShallowModule1 {
    };
    ShallowModule1 = __decorate([
        core_1.NgModule({
            declarations: [SimpleComponent, TitleComponent],
            exports: [SimpleComponent, TitleComponent]
        })
    ], ShallowModule1);
    let ShallowModule2 = class ShallowModule2 {
    };
    ShallowModule2 = __decorate([
        core_1.NgModule({
            declarations: [ComplexComponent, TitleComponent]
        })
    ], ShallowModule2);
    let ShallowModule3 = class ShallowModule3 {
    };
    ShallowModule3 = __decorate([
        core_1.NgModule({
            imports: [ShallowModule1, ShallowModule2]
        })
    ], ShallowModule3);
    let TifComponent1 = class TifComponent1 {
        constructor() {
            this.enabled = false;
        }
        enable() { this.enabled = true; }
        disable() { this.enabled = false; }
        ngOnChanges() { }
    };
    TifComponent1 = __decorate([
        core_1.Component({
            selector: 'tif-component-1',
            template: `
            <h4>Test If 1</h4>
            <ng-template *ngIf="enabled; else description2"
                         [ngTemplateOutlet]="description1">
            </ng-template>
            <ng-template #description1><p>enabled</p></ng-template>
            <ng-template #description2><p>disabled</p></ng-template>
        `
        })
    ], TifComponent1);
    let TifComponent2 = class TifComponent2 {
    };
    TifComponent2 = __decorate([
        core_1.Component({
            selector: 'tif-component-2',
            template: `
            <h4>Test If 2</h4>
            <tif-component-1></tif-component-1>
        `
        })
    ], TifComponent2);
    let TifModule = class TifModule {
    };
    TifModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [TifComponent1],
            exports: [TifComponent1]
        })
    ], TifModule);
    describe('Simple Component', () => {
        it('Simple Render', async () => {
            let simpleComp = await mount_1.mount(`<simple-component></simple-component>`, SimpleComponent, {}, {});
            expect(simpleComp.element()).not.toEqual(null);
            expect(simpleComp.element().innerHTML).toEqual('<h1>This is Simple</h1>');
            expect(simpleComp.find('h1')[0].element().innerHTML).toEqual('This is Simple');
        });
        it('Single Binding', async () => {
            let titleComp = await mount_1.mount(`<title-component [titleIn]="currentTitle"></title-component>`, TitleComponent, {}, {
                bind: {
                    currentTitle: 'Title 1'
                }
            });
            expect(titleComp.element()).not.toEqual(null);
            expect(titleComp.find('h1')[0].element().innerHTML).toEqual('Title 1');
        });
        it('Single Binding Direct', async () => {
            let titleComp = await mount_1.mount(`<title-component [titleIn]="'Title 1'"></title-component>`, TitleComponent);
            expect(titleComp.element()).not.toEqual(null);
            expect(titleComp.find('h1')[0].element().innerHTML).toEqual('Title 1');
        });
        it('Double Binding', async () => {
            let titleComp = await mount_1.mount(`<title-component
                    [titleIn]="text1"
                    [subtitleIn]="text2"
                    ></title-component>`, TitleComponent, {}, {
                bind: {
                    text1: 'Title 1',
                    text2: 'Text 2'
                }
            });
            expect(titleComp.element()).not.toEqual(null);
            expect(titleComp.find('h1')[0].element().innerHTML).toEqual('Title 1');
            expect(titleComp.find('p')[0].element().innerHTML).toEqual('Text 2');
        });
    });
    describe('Complex Component - Load Declarations', () => {
        it('Simple Mock Render - Not Real Mounting', async () => {
            let complexComp = await mount_1.mount(`<complex-component></complex-component>`, ComplexComponent, {
                mockModule: {
                    declarations: [SimpleComponent, TitleComponent]
                }
            });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).not.toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).not.toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).not.toContain('<p>Text 2</p>');
            expect(complexComp.find('h1').length).toEqual(0);
        });
        it('Simple Mount Render - Real Mounting', async () => {
            let complexComp = await mount_1.mount(`<complex-component></complex-component>`, ComplexComponent, {
                mountModule: {
                    declarations: [SimpleComponent, TitleComponent]
                }
            });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Text 2</p>');
            expect(complexComp.find('h1').length).toEqual(2);
            expect(complexComp.find('h1')[0].element().innerHTML).toEqual('This is Simple');
            expect(complexComp.find('h1')[1].element().innerHTML).toEqual('Title 1');
            expect(complexComp.find('p')[0].element().innerHTML).toEqual('Text 2');
        });
        it('Simple Mount Render - Mixed Mounting', async () => {
            let complexComp = await mount_1.mount(`<complex-component></complex-component>`, ComplexComponent, {
                mockModule: {
                    declarations: [SimpleComponent]
                },
                mountModule: {
                    declarations: [TitleComponent]
                }
            });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).not.toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Text 2</p>');
            expect(complexComp.find('h1').length).toEqual(1);
            expect(complexComp.find('h1')[0].element().innerHTML).toEqual('Title 1');
            expect(complexComp.find('p')[0].element().innerHTML).toEqual('Text 2');
        });
    });
    describe('Complex Component - Load Imports', () => {
        it('Import Module - Mock', async () => {
            let complexComp = await mount_1.mount(`<complex-component></complex-component>`, ComplexComponent, {
                mockModule: {
                    imports: [ShallowModule1]
                }
            });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).not.toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).not.toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).not.toContain('<p>Text 2</p>');
            expect(complexComp.find('h1').length).toEqual(0);
        });
        it('Import Module - Mount', async () => {
            let complexComp = await mount_1.mount(`<complex-component></complex-component>`, ComplexComponent, {
                mountModule: {
                    imports: [ShallowModule1]
                }
            });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Text 2</p>');
            expect(complexComp.find('h1').length).toEqual(2);
            expect(complexComp.find('h1')[0].element().innerHTML).toEqual('This is Simple');
            expect(complexComp.find('h1')[1].element().innerHTML).toEqual('Title 1');
            expect(complexComp.find('p')[0].element().innerHTML).toEqual('Text 2');
        });
        it('Import Module - Full #1', async () => {
            let complexComp = await mount_1.mount(`<complex-component></complex-component>`, ComplexComponent, {
                mountModule: {
                    imports: [ShallowModule3]
                }
            });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Text 2</p>');
            expect(complexComp.find('h1').length).toEqual(2);
            expect(complexComp.find('h1')[0].element().innerHTML).toEqual('This is Simple');
            expect(complexComp.find('h1')[1].element().innerHTML).toEqual('Title 1');
            expect(complexComp.find('p')[0].element().innerHTML).toEqual('Text 2');
        });
        it('Import Module - Full #2', async () => {
            let complexComp = await mount_1.mount(`<complex-component></complex-component>`, ComplexComponent, {
                mountModule: {
                    imports: [ShallowModule1, ShallowModule2, ShallowModule3]
                }
            });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Text 2</p>');
            expect(complexComp.find('h1').length).toEqual(2);
            expect(complexComp.find('h1')[0].element().innerHTML).toEqual('This is Simple');
            expect(complexComp.find('h1')[1].element().innerHTML).toEqual('Title 1');
            expect(complexComp.find('p')[0].element().innerHTML).toEqual('Text 2');
        });
        it('Import Module Schema - Full #3', async () => {
            let complexComp = await mount_1.mount(`<complex-component></complex-component>`, ComplexComponent, {
                mountModule: {
                    imports: [ShallowModule1, ShallowModule2, ShallowModule3],
                    schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
                }
            });
            expect(complexComp.element()).not.toEqual(null);
            expect(complexComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
            expect(complexComp.element().innerHTML).toContain('<h1>Title 1</h1>');
            expect(complexComp.element().innerHTML).toContain('<p>Text 2</p>');
            expect(complexComp.find('h1').length).toEqual(2);
            expect(complexComp.find('h1')[0].element().innerHTML).toEqual('This is Simple');
            expect(complexComp.find('h1')[1].element().innerHTML).toEqual('Title 1');
            expect(complexComp.find('p')[0].element().innerHTML).toEqual('Text 2');
            expect(complexComp.module().schemas[0]).toEqual(core_1.CUSTOM_ELEMENTS_SCHEMA);
            expect(Tester_1.resolveModule(complexComp.module().imports[0]).schemas[0])
                .toEqual(core_1.CUSTOM_ELEMENTS_SCHEMA);
        });
    });
    describe('Complex Component - Access Component Internals', () => {
        it('Test #1', async () => {
            let complexComp = await mount_1.mount(`<complex-component></complex-component>`, ComplexComponent, {
                mockModule: {
                    declarations: [SimpleComponent, TitleComponent]
                }
            });
            expect(complexComp.instance()).not.toEqual(null);
            expect(complexComp.find('span')[0].element().innerHTML).toEqual('1');
            expect(complexComp.instance().counter).toEqual(1);
            expect(complexComp.instance().getCounter()).toEqual(1);
            complexComp.instance().counter = 2;
            complexComp.update();
            expect(complexComp.find('span')[0].element().innerHTML).toEqual('2');
            expect(complexComp.instance().counter).toEqual(2);
            expect(complexComp.instance().getCounter()).toEqual(2);
            complexComp.instance().setCounter(3);
            complexComp.update();
            expect(complexComp.find('span')[0].element().innerHTML).toEqual('3');
            expect(complexComp.instance().counter).toEqual(3);
            expect(complexComp.instance().getCounter()).toEqual(3);
        });
    });
    describe('Edge Case: Router', () => {
        it('RouterTestingModule #1', async () => {
            let simpleComp = await mount_1.mount(`<simple-component></simple-component>`, SimpleComponent, {
                mountModule: {
                    imports: [testing_1.RouterTestingModule]
                }
            });
            expect(simpleComp.element()).not.toEqual(null);
        });
        it('RouterTestingModule #2', async () => {
            let complexComp = await mount_1.mount(`<complex-component></complex-component>`, ComplexComponent, {
                mountModule: {
                    imports: [testing_1.RouterTestingModule, ShallowModule3]
                }
            });
            expect(complexComp.element()).not.toEqual(null);
        });
        it('RouterTestingModule #3', async () => {
            const routes = [
                {
                    path: '', component: TestComponent1
                }, {
                    path: '**',
                    redirectTo: '/404'
                }
            ];
            let complexComp = await mount_1.mount(`<complex-component></complex-component>`, ComplexComponent, {
                mockModule: {
                    imports: [
                        router_1.RouterModule.forChild(routes),
                        ShallowModule3
                    ]
                }
            });
            expect(complexComp.element()).not.toEqual(null);
        });
    });
    describe('Edge Case: NgModel', () => {
        it('NgModel #1', async () => {
            let simpleComp = await mount_1.mount(`<simple-component></simple-component>`, SimpleComponent, {
                mockModule: {
                    declarations: [forms_1.NgModel]
                }
            });
            expect(simpleComp.element()).not.toEqual(null);
        });
        it('NgModel #2', async () => {
            let complexComp = await mount_1.mount(`<complex-component></complex-component>`, ComplexComponent, {
                mountModule: {
                    declarations: [forms_1.NgModel],
                    imports: [ShallowModule3]
                }
            });
            expect(complexComp.element()).not.toEqual(null);
        });
    });
    describe('Edge Case: Tif Component', () => {
        it('Test #1', async () => {
            let tifComp = await mount_1.mount(`<tif-component-1></tif-component-1>`, TifComponent1, {
                mountModule: {
                    imports: [TifModule]
                }
            });
            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h4>Test If 1</h4>');
            expect(tifComp.element().innerHTML).not.toContain('enabled');
            tifComp.instance().enable();
            tifComp.update();
            expect(tifComp.element().innerHTML).toContain('enabled');
            tifComp.instance().disable();
            tifComp.update();
            expect(tifComp.element().innerHTML).not.toContain('enabled');
        });
        it('Test #2', async () => {
            let tifComp = await mount_1.mount(`<tif-component-2></tif-component-2>`, TifComponent2, {
                mountModule: {
                    imports: [TifModule]
                }
            });
            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h4>Test If 2</h4>');
            expect(tifComp.element().innerHTML).not.toContain('enabled');
        });
    });
    describe('Edge Case: PrimeNg Component', () => {
        it('SharedModule #1', async () => {
            let tifComp = await mount_1.mount(`<simple-component></simple-component>`, SimpleComponent, {
                mountModule: {
                    imports: [primeng_1.SharedModule, primeng_1.EditorModule]
                }
            });
            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
        });
        it('SharedModule #2', async () => {
            let tifComp = await mount_1.mount(`<simple-component></simple-component>`, SimpleComponent, {
                mountModule: {
                    imports: [primeng_1.EditorModule, primeng_1.SharedModule]
                }
            });
            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
        });
    });
    describe('Edge Case: PrimeNg Directive', () => {
        it('Test #1 Default', async () => {
            let NavigatorModule = class NavigatorModule {
            };
            NavigatorModule = __decorate([
                core_1.NgModule({
                    declarations: [
                        DirectiveTests_1.DirectiveComponent,
                        DirectiveTests_1.EmbeddedItemDirective
                    ],
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        DirectiveTests_1.DirectiveModule1
                    ],
                    exports: [
                        DirectiveTests_1.DirectiveComponent,
                        DirectiveTests_1.EmbeddedItemDirective
                    ],
                    providers: []
                })
            ], NavigatorModule);
            let tifComp = await mount_1.mount(`<directive-component></directive-component>`, DirectiveTests_1.DirectiveComponent, {
                mountModule: {
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        DirectiveTests_1.DirectiveModule1,
                        NavigatorModule
                    ]
                }
            });
            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<span>Default Brand</span>');
        });
        it('Test #1 Branded', async () => {
            let NavigatorModule = class NavigatorModule {
            };
            NavigatorModule = __decorate([
                core_1.NgModule({
                    declarations: [
                        DirectiveTests_1.DirectiveComponent,
                    ],
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        DirectiveTests_1.DirectiveModule1
                    ],
                    exports: [
                        DirectiveTests_1.DirectiveComponent,
                    ],
                    providers: []
                })
            ], NavigatorModule);
            let tifComp = await mount_1.mount(`<directive-component>
                    <ng-template #brand>
                        <span>Plumbline Brand</span>
                    </ng-template>
                </directive-component>`, DirectiveTests_1.DirectiveComponent, {
                mountModule: {
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        NavigatorModule
                    ]
                }
            });
            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<span>Plumbline Brand</span>');
        });
        it('Test #1 None Case Mount', async () => {
            let NavigatorModule = class NavigatorModule {
            };
            NavigatorModule = __decorate([
                core_1.NgModule({
                    declarations: [
                        DirectiveTests_1.DirectiveComponent,
                    ],
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        DirectiveTests_1.DirectiveModule1
                    ],
                    exports: [
                        DirectiveTests_1.DirectiveComponent,
                    ],
                    providers: []
                })
            ], NavigatorModule);
            let tifComp = await mount_1.mount(`<simple-component></simple-component>`, SimpleComponent, {
                mountModule: {
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        NavigatorModule
                    ]
                },
            });
            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
        });
        it('Test #1 None Case Mount Duplicates', async () => {
            let NavigatorModule1 = class NavigatorModule1 {
            };
            NavigatorModule1 = __decorate([
                core_1.NgModule({
                    declarations: [
                        DirectiveTests_1.DirectiveComponent,
                        DirectiveTests_1.DirectiveComponent,
                    ],
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        DirectiveTests_1.DirectiveModule1,
                        DirectiveTests_1.DirectiveModule1
                    ],
                    exports: [
                        DirectiveTests_1.DirectiveComponent,
                        DirectiveTests_1.DirectiveComponent,
                    ],
                    providers: []
                })
            ], NavigatorModule1);
            let NavigatorModule2 = class NavigatorModule2 {
            };
            NavigatorModule2 = __decorate([
                core_1.NgModule({
                    imports: [
                        NavigatorModule1
                    ],
                })
            ], NavigatorModule2);
            let tifComp = await mount_1.mount(`<simple-component></simple-component>`, SimpleComponent, {
                mountModule: {
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        NavigatorModule2
                    ]
                },
            });
            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
        });
        it('Test #1 None Case Mock', async () => {
            let NavigatorModule1 = class NavigatorModule1 {
            };
            NavigatorModule1 = __decorate([
                core_1.NgModule({
                    declarations: [
                        DirectiveTests_1.DirectiveComponent,
                    ],
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        DirectiveTests_1.DirectiveModule1
                    ],
                    exports: [
                        DirectiveTests_1.DirectiveComponent,
                    ],
                    providers: []
                })
            ], NavigatorModule1);
            let NavigatorModule2 = class NavigatorModule2 {
            };
            NavigatorModule2 = __decorate([
                core_1.NgModule({
                    imports: [
                        NavigatorModule1
                    ],
                })
            ], NavigatorModule2);
            let tifComp = await mount_1.mount(`<simple-component></simple-component>`, SimpleComponent, {
                mockModule: {
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        NavigatorModule2
                    ]
                },
            });
            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
        });
        it('Test #1 None Case Mock Duplicates', async () => {
            let NavigatorModule1 = class NavigatorModule1 {
            };
            NavigatorModule1 = __decorate([
                core_1.NgModule({
                    declarations: [
                        DirectiveTests_1.DirectiveComponent,
                        DirectiveTests_1.DirectiveComponent,
                    ],
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        DirectiveTests_1.DirectiveModule1,
                        DirectiveTests_1.DirectiveModule1
                    ],
                    exports: [
                        DirectiveTests_1.DirectiveComponent,
                        DirectiveTests_1.DirectiveComponent,
                    ],
                    providers: []
                })
            ], NavigatorModule1);
            let NavigatorModule2 = class NavigatorModule2 {
            };
            NavigatorModule2 = __decorate([
                core_1.NgModule({
                    imports: [
                        NavigatorModule1
                    ],
                })
            ], NavigatorModule2);
            let tifComp = await mount_1.mount(`<simple-component></simple-component>`, SimpleComponent, {
                mockModule: {
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        NavigatorModule2
                    ]
                },
            });
            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<h1>This is Simple</h1>');
        });
        it('Test #2', async () => {
            let DirectiveComponent2 = class DirectiveComponent2 {
            };
            DirectiveComponent2 = __decorate([
                core_1.Component({
                    selector: 'directive-component-2',
                    template: `
                    <directive-component>
                        <ng-template #brand>
                            <span>Plumbline Brand</span>
                        </ng-template>
                    </directive-component>
                `
                })
            ], DirectiveComponent2);
            let NavigatorModule = class NavigatorModule {
            };
            NavigatorModule = __decorate([
                core_1.NgModule({
                    declarations: [
                        DirectiveTests_1.DirectiveComponent,
                        DirectiveTests_1.EmbeddedItemDirective
                    ],
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        DirectiveTests_1.DirectiveModule1
                    ],
                    exports: [
                        DirectiveTests_1.DirectiveComponent,
                        DirectiveTests_1.EmbeddedItemDirective
                    ],
                    providers: []
                })
            ], NavigatorModule);
            let tifComp = await mount_1.mount(`<directive-component-2></directive-component-2>`, DirectiveComponent2, {
                mountModule: {
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        NavigatorModule
                    ]
                }
            });
            expect(tifComp.element()).not.toEqual(null);
            expect(tifComp.element().innerHTML).toContain('<span>Plumbline Brand</span>');
        });
    });
});
