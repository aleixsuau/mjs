import { FilterPipe } from './filter.pipe';

fdescribe('FilterPipe', () => {
  const pipe = new FilterPipe(null);
  const collection = [
    { title: 'Title 0', id: 0, contents: ['contentA 0', 'contentB 0', 'contentC 0']},
    { title: 'Title 1', id: 1, contents: ['contentA 1', 'contentB 1', 'contentC 1']},
    { title: 'Title 2', id: 2, contents: ['contentA 2', 'contentB 2', 'contentC 2']},
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter a collection by number', () => {
    const result = pipe.transform(collection, 0);
    expect(result.length).toBe(1);
  });

  it('should filter a collection by string', () => {
    const result = pipe.transform(collection, 'contentA 0');
    expect(result.length).toBe(1);
  });

  it('should filter a collection by object', () => {
    const result = pipe.transform(collection, { title: 'Title 2', id: 2 });
    expect(result.length).toBe(1);
  });

});
