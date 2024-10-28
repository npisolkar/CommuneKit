package com.example.CommuneKitBackendTest.service;

//import com.example.CommuneKitBackendTest.dto.ReportDto;
import com.example.CommuneKitBackendTest.entity.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    //ReportDto createReport(ReportDto reportDto);
    public String uploadImage(MultipartFile imageFile) throws IOException;

    public byte[] downloadImage(String imageName);


}