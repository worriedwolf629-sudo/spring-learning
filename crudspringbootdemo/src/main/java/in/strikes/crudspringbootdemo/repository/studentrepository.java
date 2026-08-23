package in.strikes.crudspringbootdemo.repository;

import in.strikes.crudspringbootdemo.entity.students;
import org.springframework.stereotype.Component;

@Component
public class studentrepository {

    public students savestudent(students studentreq) {
        System.out.println("student rep start ");
        System.out.println("student rep ended  ");
        return null;
    }


}
