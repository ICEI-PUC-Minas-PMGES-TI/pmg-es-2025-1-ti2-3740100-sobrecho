package com.sobrecho.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Service
public class FirebaseInitialization {

    @PostConstruct
    public void initialization() {
        try {
            // Não precisa mais ler o arquivo pelo nome!
            // O GoogleCredentials.getApplicationDefault() busca a variável de ambiente sozinho.
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.getApplicationDefault())
                    .setStorageBucket("sobrecho")
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                System.out.println("Firebase initialized successfully using Application Default Credentials.");
            } else {
                System.out.println("Firebase already initialized.");
            }

        } catch (IOException e) {
            e.printStackTrace();
            // A exceção agora provavelmente significa que a variável de ambiente não foi encontrada
            throw new RuntimeException("Failed to initialize Firebase. Did you set GOOGLE_APPLICATION_CREDENTIALS environment variable? " + e.getMessage());
        }
    }
}