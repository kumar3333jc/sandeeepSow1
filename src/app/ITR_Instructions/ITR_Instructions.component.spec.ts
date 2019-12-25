import { TestBed, async } from '@angular/core/testing';
import { ITR_InstructionsComponent } from './ITR_Instructions.component';

describe('ITR_InstructionsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ITR_InstructionsComponent
      ],
    }).compileComponents();
  }));

  it('should create the ITR_Instructions component', () => {
    const fixture = TestBed.createComponent(ITR_InstructionsComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
