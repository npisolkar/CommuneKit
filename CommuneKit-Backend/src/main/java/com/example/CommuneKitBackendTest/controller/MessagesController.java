package com.example.CommuneKitBackendTest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class MessagesController {

    @GetMapping("/messages")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<String>> messages() {
        return ResponseEntity.ok(Arrays.asList("Buenos Aires", "Córdoba", "La Plata"));
    }
}
