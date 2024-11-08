/*
other good video for service creation, but frontend has much fluff
https://www.youtube.com/watch?v=tSKg5bXPXZA
*
 */

/* this is built referencing this medium article
https://medium.com/@kouomeukevin/how-to-upload-and-download-image-into-sql-database-with-spring-boot-c849ec5daec6
 */
package com.example.CommuneKitBackendTest.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;


@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;

    private String type;

    @Lob
    //@Type(type = "org.hibernate.type.ImageType")
    private byte[] imageData;
}