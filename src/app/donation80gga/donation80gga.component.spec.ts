import { TestBed, async } from '@angular/core/testing';
import { donation80ggaComponent } from './donation80gga.component';

describe('donation80ggaComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        donation80ggaComponent
      ],
    }).compileComponents();
  }));

  it('should create the donation80gga component', () => {
    const fixture = TestBed.createComponent(donation80ggaComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
