import { Point } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';

export declare interface Size {
    width: string,
    height: string,
};

export declare interface PanelPosition {
    default: Point,
    previous: Point,
    current$: BehaviorSubject<Point>,
};

export declare interface PanelSize {
    default: Size,
    previous: Size,
    current$: BehaviorSubject<Size>,
};

export declare interface Panel {
    size: PanelSize,
    position: PanelPosition,
};

export declare interface Panels {
    [key: string]: Panel,
};
