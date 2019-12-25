import { TestBed, async } from '@angular/core/testing';
import { ITR_GeneralinfoComponent } from './ITR_Generalinfo.component';

describe('ITR_GeneralinfoComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ITR_GeneralinfoComponent
      ],
    }).compileComponents();
  }));

  it('should create the ITR_Generalinfo component', () => {
    const fixture = TestBed.createComponent(ITR_GeneralinfoComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
