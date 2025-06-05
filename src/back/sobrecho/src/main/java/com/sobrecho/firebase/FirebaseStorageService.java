package com.sobrecho.firebase;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.firebase.cloud.StorageClient;
import com.sobrecho.security.UserSpringSecurity;
import com.sobrecho.service.UserService;
import com.sobrecho.service.exceptions.AuthorizationException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Service
public class FirebaseStorageService {

    public String uploadFile(MultipartFile file) throws IOException {
        
        Storage storage = StorageClient.getInstance().bucket("sobrecho").getStorage();

        String fileName = "product-images/"  + UUID.randomUUID() + "-" + file.getOriginalFilename();

        BlobId blobId = BlobId.of("sobrecho", fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType(file.getContentType())
                .build();

        Blob blob = storage.create(blobInfo, file.getBytes());
        String imageUrl = blob.getMediaLink();      
        
        return imageUrl;
    }
}
