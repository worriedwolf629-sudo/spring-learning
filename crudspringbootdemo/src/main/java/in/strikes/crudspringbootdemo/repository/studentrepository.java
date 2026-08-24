package in.strikes.crudspringbootdemo.repository;

import in.strikes.crudspringbootdemo.entity.students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public interface  studentrepository extends JpaRepository<students,Long> {


    }



