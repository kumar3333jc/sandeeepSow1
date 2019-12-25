import { TestBed, async } from '@angular/core/testing';
import { End_ScreenComponent } from './End_Screen.component';

describe('End_ScreenComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        End_ScreenComponent
      ],
    }).compileComponents();
  }));

  it('should create the End_Screen component', () => {
    const fixture = TestBed.createComponent(End_ScreenComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
