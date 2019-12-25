import { TestBed, async } from '@angular/core/testing';
import { ComputationITComponent } from './ComputationIT.component';

describe('ComputationITComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ComputationITComponent
      ],
    }).compileComponents();
  }));

  it('should create the ComputationIT component', () => {
    const fixture = TestBed.createComponent(ComputationITComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
