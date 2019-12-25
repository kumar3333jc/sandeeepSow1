import { TestBed, async } from '@angular/core/testing';
import { Donation80gComponent } from './Donation80g.component';

describe('Donation80gComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Donation80gComponent
      ],
    }).compileComponents();
  }));

  it('should create the Donation80g component', () => {
    const fixture = TestBed.createComponent(Donation80gComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
