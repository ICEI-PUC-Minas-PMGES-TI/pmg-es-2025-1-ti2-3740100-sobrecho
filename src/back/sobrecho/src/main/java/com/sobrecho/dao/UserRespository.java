package com.sobrecho.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sobrecho.model.User;

@Repository
public interface UserRespository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
