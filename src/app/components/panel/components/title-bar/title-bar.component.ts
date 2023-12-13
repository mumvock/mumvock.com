import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Input, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';

import { PanelService } from '../../services/panel.service';

type MaximizeButtonTitle = 'Maximizar' | 'Minimizar';

@Component({
    selector: 'div[titleBar]',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarComponent implements AfterViewInit {
    public  readonly elementRef     = inject(ElementRef<HTMLButtonElement>);
    private readonly _panelService  = inject(PanelService);
    private readonly _destroyRef    = inject(DestroyRef);

    public alias!: string;

    @Input()
    public maximizeButton?: boolean;

    protected readonly maximizeButtonTitle$$ = signal<MaximizeButtonTitle>('Maximizar');

    public ngAfterViewInit(): void {
        this._getMaximizeButtonTitle();
    }

    private _getMaximizeButtonTitle(): void {
        this._panelService.panels$
            .pipe(
                filter((panels) => !!panels[this.alias]),
                switchMap((panels) => panels[this.alias].size.current$),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe((currentSize) =>
                this.maximizeButtonTitle$$
                    .set(currentSize.width !== '100%'
                        ? 'Maximizar'
                        : 'Minimizar')
            );
    }

    protected maximizePanel(alias: string): void {
        this._panelService.maximizePanel(alias);
    }
    protected closePanel(alias: string): void {
        this._panelService.closePanel(alias);
    }
}
