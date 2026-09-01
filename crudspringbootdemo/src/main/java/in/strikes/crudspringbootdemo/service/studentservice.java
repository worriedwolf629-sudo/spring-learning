package in.strikes.crudspringbootdemo.service;
import in.strikes.crudspringbootdemo.Dto.CreatedDtoRequest;
import in.strikes.crudspringbootdemo.Dto.CreatedDtoResponse;
import in.strikes.crudspringbootdemo.Dto.UpdateRequestDto;
import in.strikes.crudspringbootdemo.Dto.UpdateResponseDTO;
import in.strikes.crudspringbootdemo.entity.students;
import in.strikes.crudspringbootdemo.exception.DuplicateException;
import in.strikes.crudspringbootdemo.exception.MyException;
import in.strikes.crudspringbootdemo.repository.studentrepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class studentservice {

    public studentrepository studentrepository;
    public studentservice(studentrepository studentrepository) {
        this.studentrepository = studentrepository;
    }

    public CreatedDtoResponse createdstudent(CreatedDtoRequest dtoRequest) {  //This method says: "Give me a StudentRequestDto, and I will eventually give you a StudentResponseDto."
        students student = CreatedmapToEntity(dtoRequest);  //mapper class for entity to dto
        if (nameexist(student)) {
            throw new DuplicateException("name already exist lol");
        }

        students respstudent = studentrepository.save(student);
        return CreatedmapToDto(respstudent);

//        studentreq.setDeleted(false);  //so that user cant delete on own
//        System.out.println("student service starteed ");
//        students respstudents = studentrepository.save(studentreq);
//        System.out.println("student service end ");
//        return respstudents;
    }
    public CreatedDtoResponse getstudent(long id) {
        students respstudents =studentrepository
                .findById(id)
                .orElseThrow(()-> new MyException("student with id"+id +"not found"));
        return CreatedmapToDto(respstudents);
    }
//       Optional<students> respstudents = studentrepository.findByIdAndDeletedIsFalse(id);
//        if (respstudents.isPresent()) {
//            return respstudents.get();
//        }
//        return null;
//    }

    public List<students> getallstudent() {
        List<students> studentslist = studentrepository.findByDeletedIsFalse();
        return studentslist;
    }

    public UpdateResponseDTO updatestudent(long id, @RequestBody UpdateRequestDto studentreq ) {
        students existingstudent = studentrepository
                .findByIdAndDeletedIsFalse(id)
                .orElseThrow(()-> new MyException("student with id"+id +"not found"));

        existingstudent.setAge(studentreq.getAge());
        existingstudent.setName(studentreq.getName());     //only these 3 can be changed
        existingstudent.setRollnum(studentreq.getRollnum());
        existingstudent.setUpdatedat(LocalDateTime.now());
//        existingstudent.setSchool(studentreq.getSchool());
        existingstudent.setDeleted(false);   //so that user cant delete on own
        students savestudent =  studentrepository.save( existingstudent);
        return mapToUpdateDto(savestudent);
    }

    public void deletestudent(long id) {              //hard delete
        students deletingstudent = studentrepository
                .findById(id)
                .orElseThrow(()-> new MyException("student with id"+id +"not found"));

        studentrepository.delete(deletingstudent);
    }

    public void deletestudentsoftly(long id) {
        students studenttobedeletd = studentrepository
                .findByIdAndDeletedIsFalse(id)
                .orElseThrow(()-> new MyException("student with id"+id +"not found"));
         //if student exist get it and delete it softly(means store in db)
        studenttobedeletd.setDeleted(true);
        studentrepository.save(studenttobedeletd);

    }
    public List<students> getdeletdstudents() {
        return studentrepository.findByDeletedTrue();
    }

    public students CreatedmapToEntity(CreatedDtoRequest dtoRequest)  {
        //return type = students & parametre is = CreatedDtoRequest dtoRequest
        //means= I have a createdDtorequest, and I want to convert it into a Student entity.
        students student = new students();  //dto to entity to db-storage
        student.setName(dtoRequest.getName());  //copy name from dto to entity
        student.setAge(dtoRequest.getAge());
        student.setRollnum(dtoRequest.getRollnum());
        student.setSchool(dtoRequest.getSchool());
        student.setCreatedat(LocalDateTime.now());
        student.setUpdatedat(LocalDateTime.now());
        student.setDeleted(false);
        return student;

    }
    public CreatedDtoResponse CreatedmapToDto(students student) {
        // means = I have a Student entity, and I want to convert it into a createdDtoresponse.
        CreatedDtoResponse respstudent =new CreatedDtoResponse();
        student.setName(student.getName());
        respstudent.setName(student.getName());
        respstudent.setAge(student.getAge());
        respstudent.setRollnum(student.getRollnum());
        respstudent.setSchool(student.getSchool());
        respstudent.setCreatedat(student.getCreatedat());
        respstudent.setUpdatedat(student.getUpdatedat());
        respstudent.setMessage("student saved succesfully");

        return respstudent;
    }
    public UpdateResponseDTO mapToUpdateDto(students student) {
        UpdateResponseDTO respstudent =new UpdateResponseDTO();
        student.setName(student.getName());
        respstudent.setName(student.getName());
        respstudent.setAge(student.getAge());
        respstudent.setRollnum(student.getRollnum());
        respstudent.setSchool(student.getSchool());
        respstudent.setUpdatedat(student.getUpdatedat());
        respstudent.setMessage("student saved succesfully");

        return respstudent;
    }
    public boolean nameexist(students student) {
        return studentrepository.existsByName(student.getName());

    }
    
}