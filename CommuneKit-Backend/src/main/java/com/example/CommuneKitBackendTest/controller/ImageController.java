package com.example.CommuneKitBackendTest.controller;

import com.example.CommuneKitBackendTest.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("/api/image")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ImageController {

    private final ImageService imageService;

    @PostMapping
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        //String uploadImage = imageService.uploadImage(file);
        Long imageId = imageService.uploadImage(file);
        return ResponseEntity.status(HttpStatus.OK).body(imageId);
    }

    @GetMapping("/filename/{fileName}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<?> downloadImage(@PathVariable String fileName) {
        byte[] imageData = imageService.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf(IMAGE_PNG_VALUE))
                .body(imageData);
    }

    @GetMapping("/fileId/{fileId}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
    public ResponseEntity<?> downloadImage(@PathVariable Long fileId) {
        byte[] imageData = imageService.downloadImage(fileId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf(IMAGE_PNG_VALUE))
                .body(imageData);
    }
}