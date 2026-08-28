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
        studentreq.setDeleted(false);  //so that user cant delete on own
        System.out.println("student service starteed ");
        students respstudents = studentrepository.save(studentreq);
        System.out.println("student service end ");
        return respstudents;
    }

    public students getstudent(long id) {
        Optional<students> respstudents = studentrepository.findByIdAndDeletedIsFalse(id);
        if (respstudents.isPresent()) {
            return respstudents.get();
        }
        return null;
    }

    public List<students> getallstudent() {
        List<students> studentslist = studentrepository.findByDeletedIsFalse();
        return studentslist;
    }

    public students updatestudent(long id, @RequestBody students studentreq ) {
        Optional<students> existingstudent = studentrepository.findByIdAndDeletedIsFalse(id);
        if (existingstudent.isEmpty()) {
            return null;
        }
        students savenewdetails = existingstudent.get();
        savenewdetails.setAge(studentreq.getAge());
        savenewdetails.setName(studentreq.getName());
        savenewdetails.setRollnum(studentreq.getRollnum());
        savenewdetails.setSchool(studentreq.getSchool());
        savenewdetails.setDeleted(false);   //so that user cant delete on own
        return studentrepository.save(savenewdetails);
    }

    public students deletestudent(long id) {              //hard delete
        Optional<students> deletingstudent = studentrepository.findById(id);
        if (deletingstudent.isPresent()) {
            studentrepository.deleteById(id);
            return deletingstudent.get();
        }
        return null;
    }

    public boolean deletestudentsoftly(long id) {
        Optional<students> existingstudent =
                studentrepository.findByIdAndDeletedIsFalse(id);  //check is student exist
         if (existingstudent.isEmpty()) {
             return false;               //if student dont exist
         }
         //if student exist get it and delete it softly(means store in db)
        students studenttosave = existingstudent.get();
        studenttosave.setDeleted(true);
        studentrepository.save(studenttosave);
        return true;
    }
    public List<students> getdeletdstudents() {
        return studentrepository.findByDeletedTrue();
    }
}