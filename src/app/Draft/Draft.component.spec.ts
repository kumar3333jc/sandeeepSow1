import { TestBed, async } from '@angular/core/testing';
import { DraftComponent } from './Draft.component';

describe('DraftComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DraftComponent
      ],
    }).compileComponents();
  }));

  it('should create the Draft component', () => {
    const fixture = TestBed.createComponent(DraftComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
