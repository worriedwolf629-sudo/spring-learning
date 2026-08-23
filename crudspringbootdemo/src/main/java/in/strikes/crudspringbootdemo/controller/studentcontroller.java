package in.strikes.crudspringbootdemo.controller;

import in.strikes.crudspringbootdemo.entity.students;
import in.strikes.crudspringbootdemo.service.studentservice;
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
    public String createstudent(@RequestBody students student) {
        System.out.println("student controller starteed ");
        students createdstudent =studentservice.createdstudent(student);
        System.out.println("student controller end ");
        return "student is created lol ";
    }

}
