export class TestHelper {
  public static get apiRootUrl(): string {
    return (global as any).apiRootUrl
  }
}
