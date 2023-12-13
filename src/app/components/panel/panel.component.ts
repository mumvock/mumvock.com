import { DragDrop, DragRef, Point } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    DestroyRef,
    ElementRef,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

import { environment } from './../../../environments/environment';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { Panel, Size } from './interfaces/panel.interface';
import { PanelService } from './services/panel.service';

type HTMLDragHandleElement = HTMLSpanElement;

@Component({
    selector: 'div[panel]',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {
    @Input({ required: true })
    public alias!: string;

    @Input()
    public resizable!: true;

    @ContentChild(TitleBarComponent)
    private _titleBar!: TitleBarComponent | undefined;

    @ViewChild('dragHandleCorner')
    private _dragHandleCorner!: ElementRef<HTMLDragHandleElement>;

    @ViewChild('dragHandleRight')
    private _dragHandleRight!: ElementRef<HTMLDragHandleElement>;

    @ViewChild('dragHandleBottom')
    private _dragHandleBottom!: ElementRef<HTMLDragHandleElement>;

    private get _DEFAULT_PANEL_POSITION(): Point {
        const vw = this._document?.defaultView?.innerWidth || 0;
        // After 1600px view width, panel width will be lock in 1280px
        const x = vw > 1600 ? (vw - 1280) / 2 : vw <= 768 ? 0 : (10 / 100) * vw;
        // 10% of view width (10% for each side - left and right)
        // Responsive

        return { x, y: 40 };
    }

    /**
     * DO NOT RE-ASSIGN!
     */
    private panel!: Panel;
    protected readonly assetsImagesPath = environment.assets.images;

    private _dragDropRef!: DragRef<HTMLHeadElement>;
    private _panelMousedownListenDestroyer!: () => void;

    constructor(
        private readonly _elementRef: ElementRef<HTMLDivElement>,
        private readonly _dragDrop: DragDrop,
        private readonly _ngZone: NgZone,
        private readonly _renderer: Renderer2,
        private readonly _panelService: PanelService,
        private readonly _destroyRef: DestroyRef,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {}

    public ngOnInit(): void {
        this.panel = this._registerPanel();
        this._setStyles();
    }

    public ngOnDestroy(): void {

        this._panelMousedownListenDestroyer &&
            this._panelMousedownListenDestroyer();

        const panels = this._panelService.panels$.getValue();

        if (this.alias && panels[this.alias]) {
            delete panels[this.alias];
            this._panelService.panels$.next(panels);
        }
    }

    public ngAfterContentInit(): void {
        this._syncPanelPosition();
        this._syncPanelSize();
    }

    public ngAfterViewInit(): void {
        this._setAllHandleTransform();
        this._listenPanelMousedown();
    }

    private _setStyles(): void {
        const panelElement = this._elementRef.nativeElement;
        this._renderer.setStyle(panelElement, 'zIndex', '2');
        this._renderer.setStyle(
            panelElement,
            'box-shadow',
            'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'
        );
    }

    private _registerPanel(): Panel {
        const panels = this._panelService.panels$.getValue();

        if (panels[this.alias]) {
            return panels[this.alias];
        }

        Object.assign(panels, {
            [this.alias]: {} as Panel,
        });

        this._panelService.panels$.next(panels);

        return panels[this.alias];
    }

    private _syncPanelSize(): void {
        if (!this.panel) return;

        let { width, height } =
            this._elementRef.nativeElement.getBoundingClientRect();

        let defaultSize: Size = {
            width: 'unset',
            height: 'unset',
        };

        const vw = this._document?.defaultView?.innerWidth || 0;
        const vh = this._document?.defaultView?.innerHeight || 0;

        const initialBoundaryWidth = vw <= 768 ? 768 : (80 / 100) * vw; // 80% of view width
        const initialBoundaryHeight = vh - this._DEFAULT_PANEL_POSITION.y * 2;

        if (width > 1280) {
            defaultSize.width = '1280px';
            width = 1280;
        }

        if (vw && width > initialBoundaryWidth) {
            defaultSize.width = initialBoundaryWidth + 'px';
        }

        const fixedInitialBoundaryHeight =
            initialBoundaryHeight - this._DEFAULT_PANEL_POSITION.y * 2;

        if (vh && height > fixedInitialBoundaryHeight) {
            defaultSize.height = initialBoundaryHeight + 'px';
        }

        this.panel.size = {
            current$: new BehaviorSubject<Size>(defaultSize),
            previous: defaultSize,
            default: defaultSize,
        };

        this.panel.size.current$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((size) =>
                this._ngZone.runOutsideAngular(() => {
                    const panelElement = this._elementRef.nativeElement;
                    this._renderer.setStyle(
                        panelElement,
                        'height',
                        size.height
                    );
                    this._renderer.setStyle(panelElement, 'width', size.width);
                    this._setAllHandleTransform();
                })
            );
    }

    private _syncPanelPosition(): void {

        if (!this._titleBar || !this._titleBar.elementRef) {
            return;
        }

        this._titleBar.alias = this.alias;

        const panelsLength = Object.keys(this._panelService.panels$.getValue()).length;
        let defaultPosition = this._DEFAULT_PANEL_POSITION;

        if (panelsLength > 1) {
            const incresedPosition = panelsLength * 50;
            defaultPosition = {
                y: defaultPosition.y + incresedPosition,
                x: defaultPosition.x + incresedPosition,
            };
        }

        this.panel.position = {
            current$: new BehaviorSubject<Point>(defaultPosition),
            previous: defaultPosition,
            default: defaultPosition,
        };

        if (!this._dragDropRef) {
            this._dragDropRef = this._dragDrop
                .createDrag<HTMLHeadElement>(this._elementRef.nativeElement)
                .setFreeDragPosition(this.panel.position.default)
                .withBoundaryElement(this._document?.body)
                .withHandles([this._titleBar.elementRef]);
        }

        this.panel.position.current$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((position) => {
                this._dragDropRef.setFreeDragPosition(position);
                this._setAllHandleTransform();
            });
    }

    private _setAllHandleTransform(): void {
        if (!this.resizable) return;

        const rect = this._elementRef.nativeElement.getBoundingClientRect();

        if (!this._dragHandleCorner) return;

        const dragHandleCornerElemenent = this._dragHandleCorner.nativeElement;
        const dragHandleRightElement = this._dragHandleRight.nativeElement;
        const dragHandleBottomElement = this._dragHandleBottom.nativeElement;

        this._setHandleTransform(dragHandleCornerElemenent, rect);
        this._setHandleTransform(dragHandleRightElement, rect, 'x');
        this._setHandleTransform(dragHandleBottomElement, rect, 'y');
    }

    private _setHandleTransform(
        dragHandleElement: HTMLDragHandleElement,
        targetRect: DOMRect,
        position?: 'x' | 'y'
    ): void {
        const dragRect = dragHandleElement.getBoundingClientRect();
        const translateX = targetRect.width - dragRect.width;
        const translateY = targetRect.height - dragRect.height;

        this._ngZone.runOutsideAngular(() => {
            if (position === 'x') {
                this._renderer.setStyle(
                    dragHandleElement,
                    'transform',
                    `translate(${translateX}px, 0)`
                );
            }

            if (position === 'y') {
                this._renderer.setStyle(
                    dragHandleElement,
                    'transform',
                    `translate(0, ${translateY}px)`
                );
            }

            if (!position) {
                this._renderer.setStyle(
                    dragHandleElement,
                    'transform',
                    `translate(${translateX}px, ${translateY}px)`
                );
            }
        });
    }

    protected dragMove(dragHandle?: HTMLDragHandleElement, axis?: 'x' | 'y') {
        this._ngZone.runOutsideAngular(() => this._resize(dragHandle, axis));
    }

    private _resize(dragHandle?: HTMLDragHandleElement, axis?: 'x' | 'y') {
        const panelElement = this._elementRef.nativeElement;
        const dragRect = (
            dragHandle || this._dragHandleCorner.nativeElement
        ).getBoundingClientRect();
        const panelRect = panelElement.getBoundingClientRect();

        const width = dragRect.left - panelRect.left + dragRect.width;
        const height = dragRect.top - panelRect.top + dragRect.height;

        if (axis === 'x' || !axis) {
            this._renderer.setStyle(panelElement, 'width', width + 'px');
        }

        if (axis === 'y' || !axis) {
            this._renderer.setStyle(panelElement, 'height', height + 'px');
        }

        this._setAllHandleTransform();
    }

    private _listenPanelMousedown(): void {
        this._panelMousedownListenDestroyer = this._renderer.listen(
            this._elementRef.nativeElement,
            'mousedown',
            () => this._panelService.managePanelsZIndex(this.alias)
        );
    }
}
