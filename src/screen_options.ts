import ttlConverter from "./ttl";
import authorized from "./authorization";

export default class ScreenOptions {
  constructor(private parsedReq: ParsedRequest) {}

  get url(): string {
    return this.parsedReq.url || "https://scottw.com";
  }

  get token(): string {
    return this.parsedReq.token;
  }

  get fileType(): FileType {
    return this.parsedReq.fileType || "png";
  }

  get width(): number {
    return Number(this.parsedReq.width || "1600");
  }

  get height(): number {
    return Number(this.parsedReq.height || "1200");
  }

  get ttl(): number {
    return ttlConverter(this.parsedReq.ttl || "1hour");
  }

  get fullPage(): boolean {
    return this.parsedReq.fullPage === "1";
  }

  get isAuthorized(): boolean {
    return authorized(this.token, this.url);
  }

  get isPDF(): boolean {
    return this.parsedReq.fileType === "pdf";
  }

  get imageType(): ImageType {
    if (this.isPDF) {
      throw new Error("Not an image Type");
    }

    if (this.parsedReq.fileType === "jpeg") {
      return "jpeg";
    }

    return "png";
  }
}
