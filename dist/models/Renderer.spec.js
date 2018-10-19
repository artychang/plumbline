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
const Renderer_1 = require("./Renderer");
const primeng_1 = require("primeng/primeng");
const common_1 = require("@angular/common");
const BasicTests_1 = require("../test/BasicTests");
const InputTests_1 = require("../test/InputTests");
const DirectiveTests_1 = require("../test/DirectiveTests");
describe('Renderer', () => {
    describe('Simple', () => {
        it('Test #1', async () => {
            let tester = new Tester_1.Tester(BasicTests_1.BasicComponent1, {
                mountModule: {}
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<basic-component-1></basic-component-1>`, {});
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h1>Basic Component 1</h1>');
        });
        it('Test #2', async () => {
            let tester = new Tester_1.Tester(BasicTests_1.BasicComponent1, {
                mountModule: {
                    imports: [BasicTests_1.BasicModule2]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<basic-component-1></basic-component-1>`, {});
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h1>Basic Component 1</h1>');
        });
        it('Test #3', async () => {
            let tester = new Tester_1.Tester(BasicTests_1.BasicComponent1, {
                mountModule: {
                    imports: [BasicTests_1.BasicModule1]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<basic-component-1></basic-component-1>`, {});
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h1>Basic Component 1</h1>');
        });
    });
    describe('Level 1 - Simple Component Render', () => {
        it('Test #1 - Mount', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent3, {
                mountModule: {
                    declarations: [InputTests_1.InputComponent1, InputTests_1.InputComponent2]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<p>Text 2</p>');
        });
        it('Test #2 - Mock', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent3, {
                mockModule: {
                    declarations: [InputTests_1.InputComponent1, InputTests_1.InputComponent2]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<p>Text 2</p>');
        });
    });
    describe('Level 2 - Combo Module Render', () => {
        it('Test #1 - Mount', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent3, {
                mountModule: {
                    imports: [InputTests_1.InputModule1]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<p>Text 2</p>');
        });
        it('Test #2 - Mock', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent3, {
                mockModule: {
                    imports: [InputTests_1.InputModule1]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<p>Text 2</p>');
        });
        it('Test #3 - Mount', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent3, {
                mountModule: {
                    imports: [InputTests_1.InputModule1, InputTests_1.InputModule6]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<p>Text 2</p>');
        });
        it('Test #4 - Mock', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent3, {
                mockModule: {
                    imports: [InputTests_1.InputModule1, InputTests_1.InputModule6]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<p>Text 2</p>');
        });
        it('Test #5 - Mount', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent3, {
                mountModule: {
                    imports: [InputTests_1.InputModule2, InputTests_1.InputModule3]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<p>Text 2</p>');
        });
        it('Test #6 - Mock', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent3, {
                mockModule: {
                    imports: [InputTests_1.InputModule2, InputTests_1.InputModule3]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<p>Text 2</p>');
        });
        it('Test #7 - Mount', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent3, {
                mountModule: {
                    imports: [InputTests_1.InputModule1, InputTests_1.InputModule3]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<p>Text 2</p>');
        });
        it('Test #8 - Mock', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent3, {
                mockModule: {
                    imports: [InputTests_1.InputModule1, InputTests_1.InputModule3]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<p>Text 2</p>');
        });
    });
    describe('Level 3 - Deep Module Render', () => {
        it('Test #1 - Mount', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent3, {
                mountModule: {
                    imports: [InputTests_1.InputModule7]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<p>Text 2</p>');
        });
        it('Test #2 - Mock', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent3, {
                mockModule: {
                    imports: [InputTests_1.InputModule8]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML)
                .not.toContain('<p>Text 2</p>');
        });
    });
    describe('Level 4 - Mixed Module Mount and Mock', () => {
        it('Test #1', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent3, {
                mountModule: {
                    imports: [InputTests_1.InputModule2]
                },
                mockModule: {
                    imports: [InputTests_1.InputModule3]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).not.toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).not.toContain('<p>Text 2</p>');
        });
        it('Test #2', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent3, {
                mockModule: {
                    imports: [InputTests_1.InputModule9]
                },
                mountModule: {
                    imports: [InputTests_1.InputModule4]
                }
            });
            let renderer = new Renderer_1.default(tester);
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).not.toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).not.toContain('<p>Text 2</p>');
        });
    });
    describe('Complex: Router', () => {
        it('RouterTestingModule #1', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent1, {
                mountModule: {}
            });
            // Override the module to circumvent Tester bugs
            let renderer = new Renderer_1.default(tester);
            renderer.completeModule = {
                imports: [testing_1.RouterTestingModule],
                declarations: [InputTests_1.InputComponent1],
                providers: [],
                schemas: []
            };
            // Check the rendering output
            let rendering = await renderer.render(`<input-component-1></input-component-1>`, {});
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [testing_1.RouterTestingModule],
                providers: [],
                declarations: [InputTests_1.InputComponent1, null],
                schemas: []
            }));
            expect(renderer.renderModule.declarations[0]).toEqual(InputTests_1.InputComponent1);
            expect(renderer.renderModule.imports[0]).toEqual(testing_1.RouterTestingModule);
        });
        it('RouterTestingModule #2', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent1, {
                mountModule: {
                    imports: [testing_1.RouterTestingModule]
                }
            });
            let renderer = new Renderer_1.default(tester);
            let rendering = await renderer.render(`<input-component-1></input-component-1>`, {});
            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h1>This is Simple</h1>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [Tester_1.createPropImport(testing_1.RouterTestingModule)],
                providers: [],
                declarations: [InputTests_1.InputComponent1, null],
                schemas: []
            }));
            expect(renderer.renderModule.declarations[0])
                .toEqual(InputTests_1.InputComponent1);
            expect(renderer.renderModule.imports[0].name)
                .toEqual(Tester_1.createPropImport(testing_1.RouterTestingModule).name);
        });
        it('RouterTestingModule #3', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent1, {
                mockModule: {
                    imports: [testing_1.RouterTestingModule]
                }
            });
            let renderer = new Renderer_1.default(tester);
            let rendering = await renderer.render(`<input-component-1></input-component-1>`, {});
            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [Tester_1.createMockImport(testing_1.RouterTestingModule)],
                providers: [],
                declarations: [InputTests_1.InputComponent1, null],
                schemas: []
            }));
            expect(renderer.renderModule.declarations[0])
                .toEqual(InputTests_1.InputComponent1);
            expect(renderer.renderModule.imports[0].name)
                .toEqual(Tester_1.createMockImport(testing_1.RouterTestingModule).name);
        });
    });
    describe('Edge Case: PrimeNg Component', () => {
        it('SharedModule #1', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent1, {
                mountModule: {
                    imports: [primeng_1.SharedModule, primeng_1.EditorModule]
                },
                dontMock: [common_1.CommonModule]
            });
            let renderer = new Renderer_1.default(tester);
            let rendering = await renderer.render(`<input-component-1></input-component-1>`, {});
            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [
                    null, null, null, null, null,
                    null, null, null, null, null,
                    null, null, null, null, null,
                    null, null
                ],
                providers: [],
                declarations: [InputTests_1.InputComponent1, null],
                schemas: []
            }));
        });
        it('SharedModule #2', async () => {
            let tester = new Tester_1.Tester(InputTests_1.InputComponent1, {
                mountModule: {
                    imports: [primeng_1.EditorModule, primeng_1.SharedModule]
                },
                dontMock: [common_1.CommonModule]
            });
            let renderer = new Renderer_1.default(tester);
            let rendering = await renderer.render(`<input-component-1></input-component-1>`, {});
            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [
                    null, null, null
                ],
                providers: [],
                declarations: [InputTests_1.InputComponent1, null],
                schemas: []
            }));
        });
    });
    describe('Edge Case: PrimeNg Directive', () => {
        it('Level #1 Default', async () => {
            let AWBasicNavigatorModule = class AWBasicNavigatorModule {
            };
            AWBasicNavigatorModule = __decorate([
                core_1.NgModule({
                    declarations: [
                        DirectiveTests_1.DirectiveComponent,
                        DirectiveTests_1.EmbeddedItemDirective
                    ],
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                    ],
                    exports: [
                        DirectiveTests_1.DirectiveComponent,
                        DirectiveTests_1.EmbeddedItemDirective,
                    ],
                    providers: []
                })
            ], AWBasicNavigatorModule);
            let tester = new Tester_1.Tester(DirectiveTests_1.DirectiveComponent, {
                mountModule: {
                    imports: [
                        AWBasicNavigatorModule
                    ]
                },
                dontMock: [common_1.CommonModule]
            });
            let renderer = new Renderer_1.default(tester);
            let rendering = await renderer.render(`<directive-component></directive-component>`, {});
            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<span>Default Brand</span>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [
                    null, null, null
                ],
                providers: [],
                declarations: [DirectiveTests_1.DirectiveComponent, null],
                schemas: []
            }));
        });
        it('Level #1 Branded', async () => {
            let AWBasicNavigatorModule = class AWBasicNavigatorModule {
            };
            AWBasicNavigatorModule = __decorate([
                core_1.NgModule({
                    declarations: [
                        DirectiveTests_1.DirectiveComponent,
                        DirectiveTests_1.EmbeddedItemDirective
                    ],
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                    ],
                    exports: [
                        DirectiveTests_1.DirectiveComponent,
                        DirectiveTests_1.EmbeddedItemDirective,
                    ],
                    providers: []
                })
            ], AWBasicNavigatorModule);
            let tester = new Tester_1.Tester(DirectiveTests_1.DirectiveComponent, {
                mountModule: {
                    imports: [
                        AWBasicNavigatorModule
                    ]
                },
                dontMock: [common_1.CommonModule]
            });
            let renderer = new Renderer_1.default(tester);
            let rendering = await renderer.render(`
                <directive-component>
                    <ng-template #brand>
                        <span>Plumbline Brand</span>
                    </ng-template>
                </directive-component>
            `, {});
            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<span>Plumbline Brand</span>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [
                    null, null, null
                ],
                providers: [],
                declarations: [DirectiveTests_1.DirectiveComponent, null],
                schemas: []
            }));
        });
        it('Level #2 Default', async () => {
            let AWBasicNavigatorModule = class AWBasicNavigatorModule {
            };
            AWBasicNavigatorModule = __decorate([
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
                        DirectiveTests_1.DirectiveComponent
                    ],
                    providers: []
                })
            ], AWBasicNavigatorModule);
            let tester = new Tester_1.Tester(DirectiveTests_1.DirectiveComponent, {
                mountModule: {
                    imports: [
                        AWBasicNavigatorModule
                    ]
                },
                dontMock: [common_1.CommonModule]
            });
            let renderer = new Renderer_1.default(tester);
            let rendering = await renderer.render(`<directive-component></directive-component>`, {});
            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<span>Default Brand</span>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [
                    null, null, null
                ],
                providers: [],
                declarations: [DirectiveTests_1.DirectiveComponent, null],
                schemas: []
            }));
        });
        it('Level #2 Branded', async () => {
            let AWBasicNavigatorModule = class AWBasicNavigatorModule {
            };
            AWBasicNavigatorModule = __decorate([
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
                        DirectiveTests_1.DirectiveComponent
                    ],
                    providers: []
                })
            ], AWBasicNavigatorModule);
            let tester = new Tester_1.Tester(DirectiveTests_1.DirectiveComponent, {
                mountModule: {
                    imports: [
                        AWBasicNavigatorModule
                    ]
                },
                dontMock: [common_1.CommonModule]
            });
            let renderer = new Renderer_1.default(tester);
            let rendering = await renderer.render(`
                <directive-component>
                    <ng-template #brand>
                        <span>Plumbline Brand</span>
                    </ng-template>
                </directive-component>
            `, {});
            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<span>Plumbline Brand</span>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [
                    null, null, null
                ],
                providers: [],
                declarations: [DirectiveTests_1.DirectiveComponent, null],
                schemas: []
            }));
        });
        it('Level #3 Default', async () => {
            let AWBasicNavigatorModule = class AWBasicNavigatorModule {
            };
            AWBasicNavigatorModule = __decorate([
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
            ], AWBasicNavigatorModule);
            let tester = new Tester_1.Tester(DirectiveTests_1.DirectiveComponent, {
                mountModule: {
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        DirectiveTests_1.DirectiveModule1,
                        AWBasicNavigatorModule
                    ]
                },
                dontMock: [common_1.CommonModule]
            });
            let renderer = new Renderer_1.default(tester);
            let rendering = await renderer.render(`
                <directive-component></directive-component>
            `, {});
            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<span>Default Brand</span>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [
                    null, null, null, null, null, null
                ],
                providers: [],
                declarations: [DirectiveTests_1.DirectiveComponent, null],
                schemas: []
            }));
        });
        it('Level #3 Reduced Component', async () => {
            let AWBasicNavigatorModule = class AWBasicNavigatorModule {
            };
            AWBasicNavigatorModule = __decorate([
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
            ], AWBasicNavigatorModule);
            let tester = new Tester_1.Tester(DirectiveTests_1.DirectiveComponent, {
                mountModule: {
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        AWBasicNavigatorModule
                    ]
                },
                dontMock: [common_1.CommonModule]
            });
            let renderer = new Renderer_1.default(tester);
            let rendering = await renderer.render(`
                <directive-component>
                    <ng-template #brand>
                        <span>Plumbline Brand</span>
                    </ng-template>
                </directive-component>
            `, {});
            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<span>Plumbline Brand</span>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [
                    null, null, null, null, null
                ],
                providers: [],
                declarations: [DirectiveTests_1.DirectiveComponent, null],
                schemas: []
            }));
        });
        it('Level #3 Different Component', async () => {
            let AWBasicNavigatorModule = class AWBasicNavigatorModule {
            };
            AWBasicNavigatorModule = __decorate([
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
            ], AWBasicNavigatorModule);
            let tester = new Tester_1.Tester(BasicTests_1.BasicComponent1, {
                mountModule: {
                    imports: [
                        common_1.CommonModule,
                        primeng_1.ToolbarModule,
                        AWBasicNavigatorModule
                    ]
                },
                dontMock: [common_1.CommonModule]
            });
            let renderer = new Renderer_1.default(tester);
            let rendering = await renderer.render(`
                <basic-component-1></basic-component-1>
            `, {});
            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h1>Basic Component 1</h1>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [
                    null, null, null, null, null, null
                ],
                providers: [],
                declarations: [BasicTests_1.BasicComponent1, null],
                schemas: []
            }));
        });
        it('Group #1', async () => {
            let AWOutlineForModule = class AWOutlineForModule {
            };
            AWOutlineForModule = __decorate([
                core_1.NgModule({
                    declarations: [
                        DirectiveTests_1.OutlineDirective,
                        DirectiveTests_1.InitNestingDirective
                    ],
                    exports: [
                        DirectiveTests_1.OutlineDirective,
                        DirectiveTests_1.InitNestingDirective
                    ],
                    imports: [
                    // DirectiveModule2
                    ],
                    providers: []
                })
            ], AWOutlineForModule);
            let tester = new Tester_1.Tester(BasicTests_1.BasicComponent1, {
                mountModule: {
                    imports: [
                        common_1.CommonModule,
                        AWOutlineForModule
                    ]
                },
                dontMock: [common_1.CommonModule]
            });
            let renderer = new Renderer_1.default(tester);
            let rendering = await renderer.render(`
                <basic-component-1></basic-component-1>
            `, {});
            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h1>Basic Component 1</h1>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [
                    null, null, null, null
                ],
                providers: [],
                declarations: [BasicTests_1.BasicComponent1, null],
                schemas: []
            }));
        });
        it('Group #2', async () => {
            let AWOutlineForModule = class AWOutlineForModule {
            };
            AWOutlineForModule = __decorate([
                core_1.NgModule({
                    declarations: [
                        DirectiveTests_1.OutlineDirective
                    ],
                    exports: [
                        DirectiveTests_1.OutlineDirective
                    ],
                    imports: [
                        DirectiveTests_1.DirectiveModule2
                    ],
                    providers: []
                })
            ], AWOutlineForModule);
            let tester = new Tester_1.Tester(BasicTests_1.BasicComponent1, {
                mountModule: {
                    imports: [
                        common_1.CommonModule,
                        AWOutlineForModule
                    ]
                },
                dontMock: [common_1.CommonModule]
            });
            let renderer = new Renderer_1.default(tester);
            let rendering = await renderer.render(`
                <basic-component-1></basic-component-1>
            `, {});
            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h1>Basic Component 1</h1>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [
                    null, null, null, null
                ],
                providers: [],
                declarations: [BasicTests_1.BasicComponent1, null],
                schemas: []
            }));
        });
        it('Group #2 Duplicates', async () => {
            let AWOutlineForModule = class AWOutlineForModule {
            };
            AWOutlineForModule = __decorate([
                core_1.NgModule({
                    declarations: [
                        DirectiveTests_1.OutlineDirective,
                        DirectiveTests_1.OutlineDirective
                    ],
                    exports: [
                        DirectiveTests_1.OutlineDirective,
                        DirectiveTests_1.OutlineDirective
                    ],
                    imports: [
                        DirectiveTests_1.DirectiveModule2,
                        DirectiveTests_1.DirectiveModule2
                    ],
                    providers: []
                })
            ], AWOutlineForModule);
            let tester = new Tester_1.Tester(BasicTests_1.BasicComponent1, {
                mountModule: {
                    imports: [
                        common_1.CommonModule,
                        AWOutlineForModule
                    ]
                },
                dontMock: [common_1.CommonModule]
            });
            let renderer = new Renderer_1.default(tester);
            let rendering = await renderer.render(`
                <basic-component-1></basic-component-1>
            `, {});
            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h1>Basic Component 1</h1>');
            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [
                    null, null, null, null
                ],
                providers: [],
                declarations: [BasicTests_1.BasicComponent1, null],
                schemas: []
            }));
        });
    });
});
