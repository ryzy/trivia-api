import { AppModule } from './app.module';

describe('AppModule', () => {
  test('should initialise', () => {
    expect(new AppModule()).toBeDefined();
  });
});
