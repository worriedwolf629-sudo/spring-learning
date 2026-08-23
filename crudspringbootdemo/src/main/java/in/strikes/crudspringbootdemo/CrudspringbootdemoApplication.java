package in.strikes.crudspringbootdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;

@SpringBootApplication (exclude = DataSourceAutoConfiguration.class)
public class CrudspringbootdemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudspringbootdemoApplication.class, args);
		System.out.println("hii");
	}

}
