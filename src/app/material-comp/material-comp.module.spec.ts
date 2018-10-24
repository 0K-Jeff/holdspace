import { MaterialCompModule } from './material-comp.module';

describe('MaterialCompModule', () => {
  let materialCompModule: MaterialCompModule;

  beforeEach(() => {
    materialCompModule = new MaterialCompModule();
  });

  it('should create an instance', () => {
    expect(materialCompModule).toBeTruthy();
  });
});
