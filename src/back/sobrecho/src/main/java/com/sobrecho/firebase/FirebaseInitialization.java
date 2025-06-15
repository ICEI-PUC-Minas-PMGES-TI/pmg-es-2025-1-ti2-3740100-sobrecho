package com.sobrecho.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Service
public class FirebaseInitialization {

    @PostConstruct
    public void initialization() {
        try {
            InputStream serviceAccount = getClass().getClassLoader()
                    .getResourceAsStream("sobrecho-7728b-firebase-adminsdk-fbsvc-fe78cae3d3.json");

            if (serviceAccount == null) {
                throw new IOException("Firebase service account file not found in resources");
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setStorageBucket("sobrecho") 
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                System.out.println("Firebase initialized successfully");
            } else {
                System.out.println("Firebase already initialized");
            }

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to initialize Firebase: " + e.getMessage());
        }
    }
}