package in.strikes.crudspringbootdemo.repository;

import in.strikes.crudspringbootdemo.entity.students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface  studentrepository extends JpaRepository<students,Long> {


    Optional<students> findByIdAndDeletedIsFalse(long id);

    List<students> findByDeletedIsFalse();

    List<students> findByDeletedTrue();

    boolean existsByName(String name);
}



