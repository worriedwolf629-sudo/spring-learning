package in.strikes.crudspringbootdemo.Dto;

import java.time.LocalDateTime;

public class ExceptionResponseDto {
    private LocalDateTime timestamp;
    private int statuscde;
    private String error;
    private String message;
    private String path;

    public ExceptionResponseDto(LocalDateTime timestamp, int statuscde, String error, String message, String path) {
        this.timestamp = timestamp;
        this.statuscde = statuscde;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    public ExceptionResponseDto() {

    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public int getStatuscde() {
        return statuscde;
    }

    public void setStatuscde(int statuscde) {
        this.statuscde = statuscde;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
