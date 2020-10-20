import { OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * @deprecated in favor of ngTemplateOutlet (will be removed in the next version)
 */
export declare class EmbeddedItemDirective implements OnChanges {
    private _viewContainer;
    /**
     * Template we want to render N-Times
     */
    embeddedItem: TemplateRef<any>;
    set item(item: any);
    private _implicitValue;
    private _viewRef;
    constructor(_viewContainer: ViewContainerRef);
    /**
     *
     */
    ngOnChanges(changes: SimpleChanges): void;
}
export declare class DirectiveComponent {
    brandTemplate: TemplateRef<any>;
    hasBrandTemplate(): boolean;
}
export declare class DirectiveModule1 {
}
export declare class OutlineDirective {
    private _viewContainer;
    currentItem: any;
    state: any;
    constructor(_viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngDoCheck(): void;
}
export declare class InitNestingDirective implements OnInit {
    private outline;
    setLevel: number;
    setCurrrentItem: any;
    setParentItem: any;
    constructor(outline: OutlineDirective);
    ngOnInit(): void;
}
export declare class DirectiveModule2 {
}
