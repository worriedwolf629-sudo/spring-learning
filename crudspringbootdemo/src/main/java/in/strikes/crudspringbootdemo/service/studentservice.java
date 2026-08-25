package in.strikes.crudspringbootdemo.service;

import in.strikes.crudspringbootdemo.entity.students;
import in.strikes.crudspringbootdemo.repository.studentrepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class studentservice {

    public studentrepository studentrepository;

    public studentservice(studentrepository studentrepository) {
        this.studentrepository = studentrepository;
    }

    public students createdstudent(students studentreq) {
        System.out.println("student service starteed ");
        students respstudents = studentrepository.save(studentreq);
        System.out.println("student service end ");
        return respstudents;
    }

    public students getstudent(long id) {
        Optional<students> respstudents = studentrepository.findById(id);
        if (respstudents.isPresent()) {
            return respstudents.get();
        }
        return null;
    }

    public List<students> getallstudent() {
        List<students> studentslist = studentrepository.findAll();
        return studentslist;
    }

    public students updatestudent(long id, @RequestBody students studentreq ) {
        Optional<students> existingstudent = studentrepository.findById(id);
        if (existingstudent.isEmpty()) {
            return null;
        }
        students savenewdetails = existingstudent.get();
        savenewdetails.setAge(studentreq.getAge());
        savenewdetails.setName(studentreq.getName());
        savenewdetails.setRollnum(studentreq.getRollnum());
        savenewdetails.setSchool(studentreq.getSchool());
        return studentrepository.save(savenewdetails);
    }

    public students deletestudent(long id) {
        Optional<students> deletingstudent = studentrepository.findById(id);
        if (deletingstudent.isPresent()) {
            studentrepository.deleteById(id);
            return deletingstudent.get();
        }
        return null;
    }

}