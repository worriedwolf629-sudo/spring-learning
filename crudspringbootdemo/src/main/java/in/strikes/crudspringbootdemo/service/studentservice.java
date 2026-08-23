package in.strikes.crudspringbootdemo.service;

import in.strikes.crudspringbootdemo.entity.students;
import in.strikes.crudspringbootdemo.repository.studentrepository;
import org.springframework.stereotype.Service;

@Service
public class studentservice {

    public studentrepository studentrepository;

    public studentservice(studentrepository studentrepository) {
        this.studentrepository = studentrepository;
    }

    public students createdstudent(students studentreq) {
        System.out.println("student service starteed ");
        students respstudents = studentrepository.savestudent(studentreq);
        System.out.println("student service end ");
        return respstudents;
    }



}
