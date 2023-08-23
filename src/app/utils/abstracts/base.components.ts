import { Component, EventEmitter, OnDestroy } from '@angular/core';

@Component({
    template: '',
    standalone: true,
})
export abstract class BaseComponent implements OnDestroy {
    public $onDestroy = new EventEmitter<void>();

    public ngOnDestroy(): void {
        this.$onDestroy.next();
        this.$onDestroy.complete();
    }
}
