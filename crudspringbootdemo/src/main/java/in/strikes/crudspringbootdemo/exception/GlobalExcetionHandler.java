package in.strikes.crudspringbootdemo.exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExcetionHandler {

    @ExceptionHandler(MyException.class)
    public ResponseEntity<String> Myexception(MyException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }   // THIS CODE WILL GIVE 404 NOT FOUND (MORE SPECIFIC)

    @ExceptionHandler(DuplicateException.class)
    public ResponseEntity<String> Duplicateexception(DuplicateException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }   // THIS CODE WILL GIVE 409 conflict(same email used) (MORE SPECIFIC)

//    @ExceptionHandler(RuntimeException.class)
//    public ResponseEntity<String> Handleruntimeexception(RuntimeException ex) {
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
//    } //THIS CODE WILL GIVE 500 INTERNAL SERVER ERROR (GENERIC RESPNOSE)


    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> Genericexception(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }          //for emergency ERRORS
}
//This basically means:"Whenever a ResourceNotFoundException happens anywhere in my application,
// catch it here and turn it into an HTTP 404 response."
//So your Controller doesn't need to write: IF-ELSE NULL SHII