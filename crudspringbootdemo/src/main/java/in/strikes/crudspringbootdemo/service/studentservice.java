package in.strikes.crudspringbootdemo.service;
import in.strikes.crudspringbootdemo.Dto.CreatedDtoRequest;
import in.strikes.crudspringbootdemo.Dto.CreatedDtoResponse;
import in.strikes.crudspringbootdemo.Dto.UpdateRequestDto;
import in.strikes.crudspringbootdemo.Dto.UpdateResponseDTO;
import in.strikes.crudspringbootdemo.entity.students;
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
        student.setCreatedat(LocalDateTime.now());
        student.setUpdatedat(LocalDateTime.now());
        students respstudent = studentrepository.save(student);
        return CreatedmapToDto(respstudent);

//        studentreq.setDeleted(false);  //so that user cant delete on own
//        System.out.println("student service starteed ");
//        students respstudents = studentrepository.save(studentreq);
//        System.out.println("student service end ");
//        return respstudents;
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

    public UpdateResponseDTO updatestudent(long id, @RequestBody UpdateRequestDto studentreq ) {
        Optional<students> existingstudent = studentrepository.findByIdAndDeletedIsFalse(id);
        if (existingstudent.isEmpty()) {
            return null;
        }
        students savenewdetails = existingstudent.get();
        savenewdetails.setAge(studentreq.getAge());
        savenewdetails.setName(studentreq.getName());     //only these 3 can be changed
        savenewdetails.setRollnum(studentreq.getRollnum());
        savenewdetails.setUpdatedat(LocalDateTime.now());
//        savenewdetails.setSchool(studentreq.getSchool());
        savenewdetails.setDeleted(false);   //so that user cant delete on own
        students savestudent =  studentrepository.save(savenewdetails);
        return mapToUpdateDto(savestudent);
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

    public students CreatedmapToEntity(CreatedDtoRequest dtoRequest)  {
        //return type = students & parametre is = CreatedDtoRequest dtoRequest
        //means= I have a createdDtorequest, and I want to convert it into a Student entity.
        students student = new students();  //dto to entity to db-storage
        student.setName(dtoRequest.getName());  //copy name from dto to entity
        student.setAge(dtoRequest.getAge());
        student.setRollnum(dtoRequest.getRollnum());
        student.setSchool(dtoRequest.getSchool());
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
    
}