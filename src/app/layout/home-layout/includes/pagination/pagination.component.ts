import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import * as Global from '../../../../global';
@Component({
  selector: 'pagination',
  standalone: true,
  imports: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() pagination: any = Global.resetPaginationOptions();
  @Output() pageChange = new EventEmitter<number>();
  public value = 1;
  public visiblePages!: number[];
  ngOnChanges(): void {
    this.updateVisiblePages();
  }
  public selectPage(page: number): void {
    this.value = page;
    this.updateVisiblePages();
    this.pageChange.emit(this.value);
  }
  private updateVisiblePages(): void {
    const length = Math.min(
      this.pagination.total_pages,
      this.pagination.limit
    );
    const startIndex = Math.max(
      Math.min(
        this.value - Math.ceil(length / 2),
        this.pagination?.total_pages - length
      ),
      0
    );
    this.visiblePages = Array.from(
      new Array(length).keys(),
      (item) => item + startIndex + 1
    );
  }
}
