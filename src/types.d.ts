type ImageType = "png" | "jpeg";
type FileType = ImageType | "pdf";

interface ParsedRequest {
  url: string;
  height: string;
  width: string;
  fileType: FileType;
  token: string;
  ttl: string;
  fullPage: string;
}
