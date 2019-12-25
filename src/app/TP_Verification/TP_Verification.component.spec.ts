import { TestBed, async } from '@angular/core/testing';
import { TP_VerificationComponent } from './TP_Verification.component';

describe('TP_VerificationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TP_VerificationComponent
      ],
    }).compileComponents();
  }));

  it('should create the TP_Verification component', () => {
    const fixture = TestBed.createComponent(TP_VerificationComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
