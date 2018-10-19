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
/**
 * @deprecated in favor of ngTemplateOutlet (will be removed in the next version)
 */
let EmbeddedItemDirective = class EmbeddedItemDirective {
    constructor(_viewContainer) {
        this._viewContainer = _viewContainer;
    }
    set item(item) {
        this._implicitValue = item;
    }
    /**
     *
     */
    ngOnChanges(changes) {
        if (this._viewRef != null) {
            this._viewContainer.remove(this._viewContainer.indexOf(this._viewRef));
        }
        if (this.embeddedItem != null) {
            let context = new EmbededItem(this._implicitValue);
            this._viewRef = this._viewContainer.createEmbeddedView(this.embeddedItem, context);
        }
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], EmbeddedItemDirective.prototype, "embeddedItem", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], EmbeddedItemDirective.prototype, "item", null);
EmbeddedItemDirective = __decorate([
    core_1.Directive({ selector: '[embeddedItem]' }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], EmbeddedItemDirective);
exports.EmbeddedItemDirective = EmbeddedItemDirective;
/**
 * Wrapper class around Angular's EmbeddedViewRef.context()
 *
 */
class EmbededItem {
    constructor($implicit) {
        this.$implicit = $implicit;
    }
}
let DirectiveComponent = class DirectiveComponent {
    hasBrandTemplate() {
        return this.brandTemplate != null;
    }
};
__decorate([
    core_1.ContentChild('brand'),
    __metadata("design:type", core_1.TemplateRef)
], DirectiveComponent.prototype, "brandTemplate", void 0);
DirectiveComponent = __decorate([
    core_1.Component({
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
], DirectiveComponent);
exports.DirectiveComponent = DirectiveComponent;
let DirectiveModule1 = class DirectiveModule1 {
};
DirectiveModule1 = __decorate([
    core_1.NgModule({
        declarations: [
            EmbeddedItemDirective
        ],
        exports: [
            EmbeddedItemDirective,
        ],
    })
], DirectiveModule1);
exports.DirectiveModule1 = DirectiveModule1;
let OutlineDirective = class OutlineDirective {
    constructor(_viewContainer) {
        this._viewContainer = _viewContainer;
    }
    ngOnInit() {
    }
    ngDoCheck() {
    }
};
OutlineDirective = __decorate([
    core_1.Component({
        selector: 'aw-outline-for, [awOutlineFor]',
        template: `
    <ng-template initNesting [setLevel]="nestingLevel" [setCurrrentItem]="item">
        <p>Outline Directive 2</p>
    </ng-template>
    `
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], OutlineDirective);
exports.OutlineDirective = OutlineDirective;
let InitNestingDirective = class InitNestingDirective {
    constructor(outline) {
        this.outline = outline;
    }
    ngOnInit() {
        if (this.setLevel != null) {
            this.outline.state.currentLevel = this.setLevel;
        }
        if (this.setCurrrentItem != null) {
            this.outline.currentItem = this.setCurrrentItem;
        }
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InitNestingDirective.prototype, "setLevel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], InitNestingDirective.prototype, "setCurrrentItem", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], InitNestingDirective.prototype, "setParentItem", void 0);
InitNestingDirective = __decorate([
    core_1.Directive({
        selector: '[initNesting]'
    }),
    __metadata("design:paramtypes", [OutlineDirective])
], InitNestingDirective);
exports.InitNestingDirective = InitNestingDirective;
let DirectiveModule2 = class DirectiveModule2 {
};
DirectiveModule2 = __decorate([
    core_1.NgModule({
        declarations: [
            InitNestingDirective
        ],
        imports: [],
        exports: [
            InitNestingDirective
        ],
        providers: []
    })
], DirectiveModule2);
exports.DirectiveModule2 = DirectiveModule2;
