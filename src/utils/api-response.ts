export class ApiResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: any;

  constructor(data: any, statusCode: number, message: string = "successfull") {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}
