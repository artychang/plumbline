import {
    Component,
    ContentChild, Directive, EmbeddedViewRef, Input, NgModule, OnChanges, OnInit, SimpleChanges,
    TemplateRef, ViewContainerRef
} from '@angular/core';

/**
 * @deprecated in favor of ngTemplateOutlet (will be removed in the next version)
 */
@Directive({selector: '[embeddedItem]'})
export class EmbeddedItemDirective implements OnChanges
{
    /**
     * Template we want to render N-Times
     */
    @Input()
    embeddedItem: TemplateRef<any>;

    @Input()
    set item(item: any) {
        this._implicitValue = item;
    }

    private _implicitValue: any;
    private _viewRef: EmbeddedViewRef<any>;


    constructor(private _viewContainer: ViewContainerRef) {}

    /**
     *
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (this._viewRef != null) {
            this._viewContainer.remove(this._viewContainer.indexOf(this._viewRef));
        }

        if (this.embeddedItem != null) {
            let context = new EmbededItem(this._implicitValue);
            this._viewRef = this._viewContainer.createEmbeddedView(this.embeddedItem, context);
        }
    }
}

/**
 * Wrapper class around Angular's EmbeddedViewRef.context()
 *
 */
class EmbededItem
{
    constructor(public $implicit: any) {}
}

@Component({
    selector: 'directive-component',
    template: `
                <p-toolbar>
                    <a class="brand" href="#">
                        <ng-template [ngIf]="!hasBrandTemplate()">
                            <span>Default Brand</span>
                        </ng-template>

                        <ng-template [embeddedItem]="brandTemplate"
                                     [item]="context"
                                     *ngIf="hasBrandTemplate()">
                        </ng-template>
                    </a>
                </p-toolbar>
            `
})
export class DirectiveComponent {
    @ContentChild('brand', {static: false}) brandTemplate: TemplateRef<any>;

    hasBrandTemplate(): boolean {
        return this.brandTemplate != null;
    }
}

@NgModule({
    declarations: [
        EmbeddedItemDirective
    ],
    exports: [
        EmbeddedItemDirective,
    ],
})
export class DirectiveModule1 {}

@Component({
    selector: 'outline-component, [outlineComponent]',
    template: `
    <ng-template initNesting [setLevel]="nestingLevel" [setCurrrentItem]="item">
        <p>Outline Directive 2</p>
    </ng-template>
    `
})
export class OutlineDirective {
    currentItem: any;
    state: any;

    constructor (private _viewContainer: ViewContainerRef) {
    }

    ngOnInit () {
    }

    ngDoCheck (): void {
    }
}

@Directive({
    selector: '[initNesting]'
})
export class InitNestingDirective implements OnInit {
    @Input()
    setLevel: number;

    @Input()
    setCurrrentItem: any;

    @Input()
    setParentItem: any;

    constructor (private outline: OutlineDirective) {}

    ngOnInit (): void {
        if (this.setLevel != null) {
            this.outline.state.currentLevel = this.setLevel;
        }

        if (this.setCurrrentItem != null) {
            this.outline.currentItem = this.setCurrrentItem;
        }
    }
}

@NgModule({
    declarations: [
        InitNestingDirective
    ],
    imports: [
    ],
    exports: [
        InitNestingDirective
    ],
    providers: []
})
export class DirectiveModule2 {
}
