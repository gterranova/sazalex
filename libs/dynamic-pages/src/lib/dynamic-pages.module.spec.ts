import { async, TestBed } from '@angular/core/testing';
import { DynamicPagesModule } from './dynamic-pages.module';

describe('DynamicPagesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DynamicPagesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DynamicPagesModule).toBeDefined();
  });
});
