package com.sobrecho.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sobrecho.dao.UserRepository;
import com.sobrecho.model.User;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findById(Long id) {
        Optional<User> user = this.userRepository.findById(id);
        return user.orElseThrow(() -> new RuntimeException("Usuário de Id: " + id + "não encontrado."));
    }

    public User findByEmail(String email) {
        User user = this.userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Usuário não encontrado!");
        }
        return user;
    }


    @Transactional
    public User create(User obj) {
        obj.setId(null);
        obj = this.userRepository.save(obj);
        return obj;
    }

    @Transactional
    public User update(User obj) {
        User newObj = findById(obj.getId());
        newObj.setName(obj.getName());
        newObj.setDocumentNumber(obj.getDocumentNumber());
        newObj.setDocumentType(obj.getDocumentType());
        newObj.setAddressLine(obj.getAddressLine());
        newObj.setAddressLine(obj.getAddressLine());
        newObj.setCountry(obj.getCountry());
        newObj.setZipCode(obj.getZipCode());
        newObj.setPassword(obj.getPassword());
        return this.userRepository.save(newObj);
    }

    public void delete(Long id) {
        findById(id);
        try {
            this.userRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir pois há entidades relacionadas");
        }
    }
    
}