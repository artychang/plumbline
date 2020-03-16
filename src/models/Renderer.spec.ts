import {
    Component, Input, NgModule, OnInit,
    Directive,
    EmbeddedViewRef,
    OnChanges,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef, ContentChild
} from '@angular/core';
import {
    Tester, copyModule, resolveModule,
    createMockDeclaration, createMockImport,
    createPropImport
} from './Tester';
import {RouterTestingModule} from '@angular/router/testing';
import Renderer from './Renderer';
import {EditorModule, SharedModule, ToolbarModule, TreeModule} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {BasicComponent1, BasicModule1, BasicModule2} from '../test/BasicTests';
import {
    InputComponent1, InputComponent2, InputComponent3,
    InputModule1, InputModule2, InputModule3, InputModule4,
    InputModule6, InputModule7, InputModule8, InputModule9
} from '../test/InputTests';
import {
    DirectiveComponent, DirectiveModule1, DirectiveModule2, EmbeddedItemDirective,
    InitNestingDirective, OutlineDirective
} from '../test/DirectiveTests';

describe('Renderer', () => {

    describe('Simple', () => {
        it('Test #1', async () => {
            let tester = new Tester(BasicComponent1, {
                mountModule: {}
            });
            let renderer = new Renderer(tester);

            // Check the rendering output
            let rendering = await renderer.render(`<basic-component-1></basic-component-1>`, {});
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h1>Basic Component 1</h1>');
        });

        it('Test #2', async () => {
            let tester = new Tester(BasicComponent1, {
                mountModule: {
                    imports: [BasicModule2]
                }
            });
            let renderer = new Renderer(tester);

            // Check the rendering output
            let rendering = await renderer.render(`<basic-component-1></basic-component-1>`, {});
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h1>Basic Component 1</h1>');
        });

        it('Test #3', async () => {
            let tester = new Tester(BasicComponent1, {
                mountModule: {
                    imports: [BasicModule1]
                }
            });
            let renderer = new Renderer(tester);

            // Check the rendering output
            let rendering = await renderer.render(`<basic-component-1></basic-component-1>`, {});
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h1>Basic Component 1</h1>');
        });
    });

    describe('Level 1 - Simple Component Render', () => {

        it('Test #1 - Mount', async () => {
            let tester = new Tester(InputComponent3, {
                mountModule: {
                    declarations: [InputComponent1, InputComponent2]
                }
            });
            let renderer = new Renderer(tester);

            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<p>Text 2</p>');
        });

        it('Test #2 - Mock', async () => {
            let tester = new Tester(InputComponent3, {
                mockModule: {
                    declarations: [InputComponent1, InputComponent2]
                }
            });
            let renderer = new Renderer(tester);
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
            let tester = new Tester(InputComponent3, {
                mountModule: {
                    imports: [InputModule1]
                }
            });
            let renderer = new Renderer(tester);

            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});

            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<p>Text 2</p>');
        });

        it('Test #2 - Mock', async () => {
            let tester = new Tester(InputComponent3, {
                mockModule: {
                    imports: [InputModule1]
                }
            });
            let renderer = new Renderer(tester);

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
            let tester = new Tester(InputComponent3, {
                mountModule: {
                    imports: [InputModule1, InputModule6]
                }
            });
            let renderer = new Renderer(tester);

            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});

            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<p>Text 2</p>');
        });

        it('Test #4 - Mock', async () => {
            let tester = new Tester(InputComponent3, {
                mockModule: {
                    imports: [InputModule1, InputModule6]
                }
            });
            let renderer = new Renderer(tester);

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
            let tester = new Tester(InputComponent3, {
                mountModule: {
                    imports: [InputModule2, InputModule3]
                }
            });
            let renderer = new Renderer(tester);

            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});

            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<p>Text 2</p>');
        });

        it('Test #6 - Mock', async () => {
            let tester = new Tester(InputComponent3, {
                mockModule: {
                    imports: [InputModule2, InputModule3]
                }
            });
            let renderer = new Renderer(tester);

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
            let tester = new Tester(InputComponent3, {
                mountModule: {
                    imports: [InputModule1, InputModule3]
                }
            });
            let renderer = new Renderer(tester);

            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});

            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<p>Text 2</p>');
        });

        it('Test #8 - Mock', async () => {
            let tester = new Tester(InputComponent3, {
                mockModule: {
                    imports: [InputModule1, InputModule3]
                }
            });
            let renderer = new Renderer(tester);

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
            let tester = new Tester(InputComponent3, {
                    mountModule: {
                        imports: [InputModule7]
                    }
                });
            let renderer = new Renderer(tester);

            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});
            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<p>Text 2</p>');
        });

        it('Test #2 - Mock', async () => {
            let tester = new Tester(InputComponent3, {
                mockModule: {
                    imports: [InputModule8]
                }
            });
            let renderer = new Renderer(tester);

            // Check the rendering output
            let rendering = await renderer.render(
                `<input-component-3></input-component-3>`, {});
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
            let tester = new Tester(InputComponent3, {
                mountModule: {
                    imports: [InputModule2]
                },
                mockModule: {
                    imports: [InputModule3]
                }
            });
            let renderer = new Renderer(tester);

            // Check the rendering output
            let rendering = await renderer.render(`<input-component-3></input-component-3>`, {});

            expect(rendering.element).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h3>This is Complex</h3>');
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');
            expect(rendering.element.nativeElement.innerHTML).not.toContain('<h1>Title 1</h1>');
            expect(rendering.element.nativeElement.innerHTML).not.toContain('<p>Text 2</p>');
        });

        it('Test #2', async () => {
            let tester = new Tester(InputComponent3, {
                mockModule: {
                    imports: [InputModule9]
                },
                mountModule: {
                    imports: [InputModule4]
                }
            });
            let renderer = new Renderer(tester);

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
            let tester = new Tester(InputComponent1, {
                mountModule: {}
            });

            // Override the module to circumvent Tester bugs
            let renderer = new Renderer(tester);
            renderer.completeModule = {
                imports: [RouterTestingModule],
                declarations: [InputComponent1],
                providers: [],
                schemas: []
            };

            // Check the rendering output
            let rendering = await renderer.render(`<input-component-1></input-component-1>`, {});
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');

            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [RouterTestingModule],
                providers: [],
                declarations: [InputComponent1, null],
                schemas: []
            }));
            expect(renderer.renderModule.declarations[0]).toEqual(InputComponent1);
            expect(renderer.renderModule.imports[0]).toEqual(RouterTestingModule);
        });

        it('RouterTestingModule #2', async () => {
            let tester = new Tester(InputComponent1, {
                mountModule: {
                    imports: [RouterTestingModule]
                }
            });
            let renderer = new Renderer(tester);
            let rendering = await renderer.render(`<input-component-1></input-component-1>`, {});

            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML)
                .toContain('<h1>This is Simple</h1>');

            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [createPropImport(RouterTestingModule)],
                providers: [],
                declarations: [InputComponent1, null],
                schemas: []
            }));
            expect(renderer.renderModule.declarations[0])
                .toEqual(InputComponent1);
            expect(renderer.renderModule.imports[0].name)
                .toEqual(createPropImport(RouterTestingModule).name);
        });

        it('RouterTestingModule #3', async () => {
            let tester = new Tester(InputComponent1, {
                mockModule: {
                    imports: [RouterTestingModule]
                }
            });
            let renderer = new Renderer(tester);
            let rendering = await renderer.render(`<input-component-1></input-component-1>`, {});

            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');

            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [createMockImport(RouterTestingModule)],
                providers: [],
                declarations: [InputComponent1, null],
                schemas: []
            }));
            expect(renderer.renderModule.declarations[0])
                .toEqual(InputComponent1);
            expect(renderer.renderModule.imports[0].name)
                .toEqual(createMockImport(RouterTestingModule).name);
        });

    });

    describe('Edge Case: PrimeNg Component', () => {

        it('SharedModule #1', async () => {

            let tester = new Tester(InputComponent1, {
                mountModule: {
                    imports: [SharedModule, EditorModule]
                },
                dontMock: [CommonModule]
            });
            let renderer = new Renderer(tester);
            let rendering = await renderer.render(`<input-component-1></input-component-1>`, {});

            // Check the rendering output
            expect(rendering).not.toEqual(null);
            expect(rendering.element.nativeElement.innerHTML).toContain('<h1>This is Simple</h1>');

            // Check the module format
            expect(JSON.stringify(renderer.renderModule)).toEqual(JSON.stringify({
                imports: [
                    null, null, null, null, null,
                    null, null, null, null, null
                ],
                providers: [],
                declarations: [InputComponent1, null],
                schemas: []
            }));
        });

        it('SharedModule #2', async () => {

            let tester = new Tester(InputComponent1, {
                mountModule: {
                    imports: [EditorModule, SharedModule]
                },
                dontMock: [CommonModule]
            });
            let renderer = new Renderer(tester);
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
                declarations: [InputComponent1, null],
                schemas: []
            }));
        });

    });

    describe('Edge Case: PrimeNg Directive', () => {

        it('Level #1 Default', async () => {

            @NgModule({
                declarations: [
                    DirectiveComponent,
                    EmbeddedItemDirective
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                ],
                exports: [
                    DirectiveComponent,
                    EmbeddedItemDirective,
                ],
                providers: []
            })
            class NavigatorModule {}

            let tester = new Tester(DirectiveComponent, {
                mountModule: {
                    imports: [
                        NavigatorModule
                    ]
                },
                dontMock: [CommonModule]
            });
            let renderer = new Renderer(tester);
            let rendering = await renderer.render(
                `<directive-component></directive-component>`, {});

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
                declarations: [DirectiveComponent, null],
                schemas: []
            }));
        });

        it('Level #1 Branded', async () => {

            @NgModule({
                declarations: [
                    DirectiveComponent,
                    EmbeddedItemDirective
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                ],
                exports: [
                    DirectiveComponent,
                    EmbeddedItemDirective,
                ],
                providers: []
            })
            class NavigatorModule {}

            let tester = new Tester(DirectiveComponent, {
                mountModule: {
                    imports: [
                        NavigatorModule
                    ]
                },
                dontMock: [CommonModule]
            });
            let renderer = new Renderer(tester);
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
                declarations: [DirectiveComponent, null],
                schemas: []
            }));
        });

        it('Level #2 Default', async () => {

            @NgModule({
                declarations: [
                    DirectiveComponent,
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                    DirectiveModule1
                ],
                exports: [
                    DirectiveComponent
                ],
                providers: []
            })
            class NavigatorModule {}

            let tester = new Tester(DirectiveComponent, {
                mountModule: {
                    imports: [
                        NavigatorModule
                    ]
                },
                dontMock: [CommonModule]
            });
            let renderer = new Renderer(tester);
            let rendering = await renderer.render(
                `<directive-component></directive-component>`, {});

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
                declarations: [DirectiveComponent, null],
                schemas: []
            }));
        });

        it('Level #2 Branded', async () => {

            @NgModule({
                declarations: [
                    DirectiveComponent,
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                    DirectiveModule1
                ],
                exports: [
                    DirectiveComponent
                ],
                providers: []
            })
            class NavigatorModule {}

            let tester = new Tester(DirectiveComponent, {
                mountModule: {
                    imports: [
                        NavigatorModule
                    ]
                },
                dontMock: [CommonModule]
            });
            let renderer = new Renderer(tester);
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
                declarations: [DirectiveComponent, null],
                schemas: []
            }));
        });

        it('Level #3 Default', async () => {

            @NgModule({
                declarations: [
                    DirectiveComponent,
                    EmbeddedItemDirective
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                    DirectiveModule1
                ],
                exports: [
                    DirectiveComponent,
                    EmbeddedItemDirective
                ],
                providers: []
            })
            class NavigatorModule {}

            let tester = new Tester(DirectiveComponent, {
                mountModule: {
                    imports: [
                        CommonModule,
                        ToolbarModule,
                        DirectiveModule1,
                        NavigatorModule
                    ]
                },
                dontMock: [CommonModule]
            });
            let renderer = new Renderer(tester);
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
                declarations: [DirectiveComponent, null],
                schemas: []
            }));
        });

        it('Level #3 Reduced Component', async () => {

            @NgModule({
                declarations: [
                    DirectiveComponent,
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                    DirectiveModule1
                ],
                exports: [
                    DirectiveComponent,
                ],
                providers: []
            })
            class NavigatorModule {}

            let tester = new Tester(DirectiveComponent, {
                mountModule: {
                    imports: [
                        CommonModule,
                        ToolbarModule,
                        NavigatorModule
                    ]
                },
                dontMock: [CommonModule]
            });
            let renderer = new Renderer(tester);
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
                declarations: [DirectiveComponent, null],
                schemas: []
            }));
        });

        it('Level #3 Different Component', async () => {

            @NgModule({
                declarations: [
                    DirectiveComponent,
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                    DirectiveModule1
                ],
                exports: [
                    DirectiveComponent,
                ],
                providers: []
            })
            class NavigatorModule {}

            let tester = new Tester(BasicComponent1, {
                mountModule: {
                    imports: [
                        CommonModule,
                        ToolbarModule,
                        NavigatorModule
                    ]
                },
                dontMock: [CommonModule]
            });
            let renderer = new Renderer(tester);

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
                declarations: [BasicComponent1, null],
                schemas: []
            }));
        });

        it('Group #1', async () => {

            @NgModule({
                declarations: [
                    OutlineDirective,
                    InitNestingDirective
                ],
                exports: [
                    OutlineDirective,
                    InitNestingDirective
                ],
                imports: [
                    // DirectiveModule2
                ],
                providers: []
            })
            class OutlineModule {}

            let tester = new Tester(BasicComponent1, {
                mountModule: {
                    imports: [
                        CommonModule,
                        OutlineModule
                    ]
                },
                dontMock: [CommonModule]
            });
            let renderer = new Renderer(tester);

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
                declarations: [BasicComponent1, null],
                schemas: []
            }));
        });

        it('Group #2', async () => {

            @NgModule({
                declarations: [
                    OutlineDirective
                ],
                exports: [
                    OutlineDirective
                ],
                imports: [
                    DirectiveModule2
                ],
                providers: []
            })
            class OutlineModule {}

            let tester = new Tester(BasicComponent1, {
                mountModule: {
                    imports: [
                        CommonModule,
                        OutlineModule
                    ]
                },
                dontMock: [CommonModule]
            });
            let renderer = new Renderer(tester);

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
                declarations: [BasicComponent1, null],
                schemas: []
            }));
        });

        it('Group #2 Duplicates', async () => {

            @NgModule({
                declarations: [
                    OutlineDirective,
                    OutlineDirective
                ],
                exports: [
                    OutlineDirective,
                    OutlineDirective
                ],
                imports: [
                    DirectiveModule2,
                    DirectiveModule2
                ],
                providers: []
            })
            class OutlineModule {}

            let tester = new Tester(BasicComponent1, {
                mountModule: {
                    imports: [
                        CommonModule,
                        OutlineModule
                    ]
                },
                dontMock: [CommonModule]
            });
            let renderer = new Renderer(tester);
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
                declarations: [BasicComponent1, null],
                schemas: []
            }));
        });
    });
});

