package com.example.CommuneKitBackendTest.service.impl;

import com.example.CommuneKitBackendTest.Utils.ImageUtils;
import com.example.CommuneKitBackendTest.entity.Image;
import com.example.CommuneKitBackendTest.repository.ImageRepository;
import com.example.CommuneKitBackendTest.service.ImageService;
import lombok.RequiredArgsConstructor;
//import org.apache.commons.lang3.exception.ContextedRuntimeException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;

    public Long uploadImage(MultipartFile imageFile) throws IOException {
        var imageToSave = Image.builder()
                .name(imageFile.getOriginalFilename())
                .type(imageFile.getContentType())
                .imageData(ImageUtils.compressImage(imageFile.getBytes()))
                .build();
        Image savedImage = imageRepository.save(imageToSave);
        //"file uploaded successfully : " + imageFile.getOriginalFilename();
        return savedImage.getId();
    }

    public byte[] downloadImage(Long id) {
        Optional<Image> dbImage = imageRepository.findById(id);

        return dbImage.map(image -> {
            try {
                return ImageUtils.decompressImage(image.getImageData());
            } catch (DataFormatException | IOException exception) {
                throw new RuntimeException("Error downloading an image Image ID: "
                        +  image.getId() + " Image Id: " + id, exception);
                //.addContextValue("Image ID",  image.getId())
                //.addContextValue("Image name", imageName);
            }
        }).orElse(null);
    }

    public byte[] downloadImage(String imageName) {
        Optional<Image> dbImage = imageRepository.findByName(imageName);

        return dbImage.map(image -> {
            try {
                return ImageUtils.decompressImage(image.getImageData());
            } catch (DataFormatException | IOException exception) {
                throw new RuntimeException("Error downloading an image Image ID: "
                        +  image.getId() + " Image name: " + imageName, exception);
                        //.addContextValue("Image ID",  image.getId())
                        //.addContextValue("Image name", imageName);
            }
        }).orElse(null);
    }
}