package com.example.CommuneKitBackendTest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
/*added by me @EnableJpaRepositories(basePackages = "com.example.CommuneKitBackendTest.repository")*/
public class CommuneKitBackendTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommuneKitBackendTestApplication.class, args);
	}

}
