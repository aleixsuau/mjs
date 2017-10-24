// IMPORT the class
import { UppercaserPipe } from './uppercaser.pipe';

// SUITE (Collection of spec)
// - With 'f' Jasmine executes just this suite/test, otherwise it would execute all the .spec.ts files.
// - With 'x' Jasmine excludes this suite/test.
describe('UppercaserPipe', () => {
  // INSTANTIATION
  const pipe = new UppercaserPipe();

  // SPEC (test)
  it('should create an instance', () => {
    // EXPECTATION
    expect(pipe).toBeTruthy(); // MATCHER (toBe, toBeTruthy, not.toBe, toEqual, toBeDefined, toBeNull, toContain, toMatch... )
  });


  it('should return the input if it is a number', () => {
    const result = pipe.transform(5);

    expect(result).toEqual(5);
  });


  it('should call the transform method with the data passed', () => {
    // SPY
    spyOn(pipe, 'transform').and.callThrough();

    pipe.transform(5);

    expect(pipe.transform).toHaveBeenCalledWith(5);
  });

  it('should uppercase the input if it is a string', () => {
    const result = pipe.transform('hola');
    const expectedResult = ('hola').toUpperCase();

    expect(result).toBe(expectedResult);
  });
});
