package in.strikes.crudspringbootdemo.controller;

import in.strikes.crudspringbootdemo.Dto.CreatedDtoRequest;
import in.strikes.crudspringbootdemo.Dto.CreatedDtoResponse;
import in.strikes.crudspringbootdemo.Dto.UpdateRequestDto;
import in.strikes.crudspringbootdemo.Dto.UpdateResponseDTO;
import in.strikes.crudspringbootdemo.entity.students;
import in.strikes.crudspringbootdemo.service.studentservice;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/students")
public class studentcontroller {
    private final studentservice studentservice;
    public studentcontroller(studentservice studentservice) {
        this.studentservice = studentservice;
    }

    @PostMapping     //create
    public ResponseEntity<CreatedDtoResponse> createdstudent(@Valid  @RequestBody CreatedDtoRequest dtoRequest) {
//This means: "When a POST request comes in, take the request body and put it into a CreatedDtoRequest object called dtoRequest."

        System.out.println("student controller starteed ");
        CreatedDtoResponse createdstudent = studentservice.createdstudent(dtoRequest);
        System.out.println("student controller end ");

        return ResponseEntity.status(HttpStatus.CREATED).body(createdstudent);
    }

    @GetMapping("{id}")   //read by id
    public ResponseEntity<CreatedDtoResponse> getstudent(@PathVariable long id) {
        CreatedDtoResponse respstudent = studentservice.getstudent(id);
//        if (respstudent == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }   //NOT NEEDED CUZ THIS IS HANDELED BY EXCEPTION HANDLER CLASS
        return ResponseEntity.ok(respstudent);

    }

    @GetMapping       //read all data
    public ResponseEntity<List<students>> getallstudent() {
        List<students> studentlist = studentservice.getallstudent();
        return ResponseEntity.ok(studentlist);

    }

    @PutMapping("{id}")         //update
    public ResponseEntity<UpdateResponseDTO> updatestudent(@PathVariable long id, @RequestBody UpdateRequestDto studentreq) {
        UpdateResponseDTO existingpstudent = studentservice.updatestudent(id, studentreq);
//        if (existingpstudent == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
        return ResponseEntity.ok(existingpstudent);
    }

    @DeleteMapping("{id}")     //delete
    public ResponseEntity<students> updatestudent(@PathVariable long id) {
        studentservice.deletestudent(id);
//        if (deletingpstudent == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("soft-delete/{id}")
    public ResponseEntity<String> softdelete(@PathVariable long id) {
        studentservice.deletestudentsoftly(id);

        return ResponseEntity.noContent().build();

    }
    @GetMapping("retrieve")
    public List<students> getdeletedStudents() {
        return studentservice.getdeletdstudents();
    }

}