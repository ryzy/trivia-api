import { AppModule } from './app.module';

describe('AppModule', () => {
  it('should instantiate', () => {
    expect(new AppModule()).toBeTruthy();
  });
});
