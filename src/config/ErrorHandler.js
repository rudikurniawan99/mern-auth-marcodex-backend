class ErrorHandler extends Error {
  code = 500
  constructor(statusCode, msg){
    super(msg)
    this.statusCode = statusCode
  }
}