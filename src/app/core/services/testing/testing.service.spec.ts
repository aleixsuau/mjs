import { TestingService } from './testing.service';

// SUITE
describe('TestingService', () => {

  let service: TestingService;
  // BEFOREEACH: Executed before each spec (resets the Test Context (TestingService in this case))
  beforeEach(() => {
    // INSTANCIACIÓN
    service = new TestingService();
  });

  // SPEC
  it('should be created', () => {
    // EXPECTATION
    expect(service).toBeTruthy(); // MATCHER
  });

  it('should be empty', () => {
    expect(service.getSize()).toBe(0);
  });

  it('should contain an item with value first', () => {
      const item = 'first';

      service.addItem(item);

      expect(service.getItems()[0]).toBe(item);
      expect(service.getSize()).toBe(1);
  });

  it('should contain an item with value first and an item with the value second', () => {
      const firstItem = 'first';
      const secondItem = 'second';

      service.addItem(firstItem);
      service.addItem(secondItem);

      expect(service.getItems()[0]).toBe(firstItem);
      expect(service.getItems()[1]).toBe(secondItem);
      expect(service.getSize()).toBe(2);
  });

  it('should contain an item with value second after deleting the first item', () => {
      const firstItem = 'first';
      const secondItem = 'second';

      service.addItem(firstItem);
      service.addItem(secondItem);
      service.deleteItem(0);

      expect(service.getItems()[0]).toBe(secondItem);
      expect(service.getSize()).toBe(1);
  });

  it('should contain an item with value first after deleting the second item', () => {
      const firstItem = 'first';
      const secondItem = 'second';

      service.addItem(firstItem);
      service.addItem(secondItem);
      service.deleteItem(1);

      expect(service.getItems()[0]).toBe(firstItem);
      expect(service.getSize()).toBe(1);
  });


});
