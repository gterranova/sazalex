import { async, TestBed } from '@angular/core/testing';
import { DatasourceModule } from './datasource.module';

describe('DatasourceModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DatasourceModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DatasourceModule).toBeDefined();
  });
});
