package com.sobrecho.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sobrecho.model.User;
import com.sobrecho.dao.StoreRepository;
import com.sobrecho.model.Store;
import com.sobrecho.model.StoreImage;
import com.sobrecho.security.UserSpringSecurity;
import com.sobrecho.service.exceptions.AuthorizationException;

import jakarta.transaction.Transactional;

@Service
public class StoreService {
	
	@Autowired
	private StoreRepository storeRepository;
	
	 @Autowired
	 private UserService userService;
	   
	 @Autowired
	 private StoreImageService storeImageService;
	 
	 @Transactional
	 public Store create(Store obj, MultipartFile image) throws IOException {
	     UserSpringSecurity userSpringSecurity = UserService.authenticated();
	     if (Objects.isNull(userSpringSecurity)) {
	         throw new AuthorizationException("Acesso negado!");
	     }
	     User user = this.userService.findById(userSpringSecurity.getId());
	     obj.setUser(user);
	     obj.setId(null);

	     Store savedStore = this.storeRepository.save(obj);

	     if (image != null && !image.isEmpty()) {
	         StoreImage storeImage = storeImageService.uploadStoreImage(image, savedStore);
	         savedStore.setImage(storeImage.getUrl()); 
	         return this.storeRepository.save(savedStore);
	     }
	     return savedStore;
	 }

}
