import { Component, ElementRef, EventEmitter, OnInit, ViewChild, OnDestroy, Output } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss']
})
export class CustomerFilterComponent implements OnInit, OnDestroy{

  private destroy$ = new Subject<boolean>()

  filterSubject$ = new Subject<string>();
  @ViewChild('input', {static: true}) input: ElementRef;

  @Output() filterText = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
    this.filterDebounce();
  }

  onFilterChange(event: Event) {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.filterSubject$.next(searchQuery?.trim());
  }

  filterDebounce() {
    this.filterSubject$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(data => {
        this.filterText.emit(data);
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
