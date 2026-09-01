package in.strikes.crudspringbootdemo.exception;
import in.strikes.crudspringbootdemo.Dto.ExceptionResponseDto;
import in.strikes.crudspringbootdemo.Dto.ValidationExceptionResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExcetionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationExceptionResponseDto>HandleMethodArgumentNotValidException
            (MethodArgumentNotValidException ex , HttpServletRequest request) {
        Map<String,String> Fielderrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(error ->
                        Fielderrors.put(error.getField(),error.getDefaultMessage()));

        ValidationExceptionResponseDto exe = new ValidationExceptionResponseDto(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "validation failed",
                request.getRequestURI(),
                Fielderrors
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exe);
    }   // THIS CODE WILL GIVE 404 NOT FOUND (MORE SPECIFIC)


    @ExceptionHandler(MyException.class)
    public ResponseEntity<ExceptionResponseDto> Myexception(MyException ex , HttpServletRequest request) {
        ExceptionResponseDto exe = new ExceptionResponseDto(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exe);
    }   // THIS CODE WILL GIVE 404 NOT FOUND (MORE SPECIFIC)

    @ExceptionHandler(DuplicateException.class)
    public ResponseEntity<ExceptionResponseDto> Duplicateexception(DuplicateException ex,HttpServletRequest request) {
        ExceptionResponseDto exe = new ExceptionResponseDto(
                LocalDateTime.now(),
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(exe);
    }   // THIS CODE WILL GIVE 409 conflict(same email used) (MORE SPECIFIC)

//    @ExceptionHandler(RuntimeException.class)
//    public ResponseEntity<String> Handleruntimeexception(RuntimeException ex) {
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
//    } //THIS CODE WILL GIVE 500 INTERNAL SERVER ERROR (GENERIC RESPNOSE)


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponseDto> Genericexception(RuntimeException ex) {
        ExceptionResponseDto exe = new ExceptionResponseDto();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exe);
    }          //for emergency ERRORS
}
//This basically means:"Whenever a ResourceNotFoundException happens anywhere in my application,
// catch it here and turn it into an HTTP 404 response."
//So your Controller doesn't need to write: IF-ELSE NULL SHII