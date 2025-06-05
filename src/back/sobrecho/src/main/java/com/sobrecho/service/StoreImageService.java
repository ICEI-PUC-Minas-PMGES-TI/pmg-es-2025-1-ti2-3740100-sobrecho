package com.sobrecho.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sobrecho.firebase.FirebaseStorageService;
import com.sobrecho.model.Store;

@Service
public class StoreImageService {

    @Autowired
    private FirebaseStorageService firebaseStorageService;

    public void uploadStoreImage(MultipartFile image, Store store) throws IOException {
        String imageUrl = firebaseStorageService.uploadFile(image);
        store.setImage(imageUrl);
    }
}
