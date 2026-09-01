package in.strikes.crudspringbootdemo.Dto;

import java.time.LocalDateTime;
import java.util.Map;

public class ValidationExceptionResponseDto {
    private LocalDateTime timestamp;
    private int statuscde;
    private String error;
    private String message;
    private String path;
    private Map<String,String> FIELDERRORS;

    public ValidationExceptionResponseDto(LocalDateTime timestamp, int statuscde, String error, String message, String path, Map<String, String> FIELDERRORS) {
        this.timestamp = timestamp;
        this.statuscde = statuscde;
        this.error = error;
        this.message = message;
        this.path = path;
        this.FIELDERRORS = FIELDERRORS;
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

    public Map<String, String> getFIELDERRORS() {
        return FIELDERRORS;
    }

    public void setFIELDERRORS(Map<String, String> FIELDERRORS) {
        this.FIELDERRORS = FIELDERRORS;
    }
}
