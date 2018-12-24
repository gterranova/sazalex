import { async, TestBed } from '@angular/core/testing';
import { RouterDirectivesModule } from './router-directives.module';

describe('RouterDirectivesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterDirectivesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(RouterDirectivesModule).toBeDefined();
  });
});
