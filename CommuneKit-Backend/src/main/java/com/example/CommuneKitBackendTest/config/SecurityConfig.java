package com.example.CommuneKitBackendTest.config;

public class SecurityConfig {}

//package com.example.CommuneKitBackendTest.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        return http
//                .authorizeHttpRequests( auth ->  {
//                auth.requestMatchers("/").permitAll();  // Publicly accessible paths
//                auth.anyRequest().authenticated();            // All other paths require authentication
//
//        })
//                .oauth2Login(withDefaults())
//                .formLogin(withDefaults())
//                //.defaultSuccessUrl("/home", true)
//                .build();
//    }
//}
