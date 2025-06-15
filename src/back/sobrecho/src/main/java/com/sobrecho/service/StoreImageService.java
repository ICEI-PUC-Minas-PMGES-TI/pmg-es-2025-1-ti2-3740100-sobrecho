package com.sobrecho.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.firebase.cloud.StorageClient;
import com.sobrecho.dao.StoreImageRepository;
import com.sobrecho.firebase.FirebaseStorageService;
import com.sobrecho.model.Product;
import com.sobrecho.model.ProductImage;
import com.sobrecho.model.Store;
import com.sobrecho.model.StoreImage;

@Service
public class StoreImageService {

    @Autowired
    private FirebaseStorageService firebaseStorageService;
    
    @Autowired
    private StoreImageRepository storeImageRepository;

    public StoreImage uploadStoreImage(MultipartFile file, Store store) throws IOException {
        Storage storage = StorageClient.getInstance().bucket("sobrecho").getStorage();

        String fileName = "store-images/" + store.getId() + "/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

        BlobId blobId = BlobId.of("sobrecho", fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType(file.getContentType())
                .build();

        Blob blob = storage.create(blobInfo, file.getBytes());
        String imageUrl = blob.getMediaLink();

        StoreImage storeImage = new StoreImage();
        storeImage.setUrl(imageUrl);
        storeImage.setStore(store);
        storeImageRepository.save(storeImage);

        return storeImage;
    }
}
