package in.strikes.crudspringbootdemo.controller;

import in.strikes.crudspringbootdemo.entity.students;
import in.strikes.crudspringbootdemo.service.studentservice;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/students")
public class studentcontroller {


    private studentservice studentservice;

    public studentcontroller(studentservice studentservice) {
        this.studentservice = studentservice;
    }

    @PostMapping("/create")
    public ResponseEntity<students>createdstudent(@RequestBody students student) {
        System.out.println("student controller starteed ");
        students createdstudent =studentservice.createdstudent(student);
        System.out.println("student controller end ");
        return ResponseEntity.status(HttpStatus.CREATED).body(createdstudent);
    }

}
