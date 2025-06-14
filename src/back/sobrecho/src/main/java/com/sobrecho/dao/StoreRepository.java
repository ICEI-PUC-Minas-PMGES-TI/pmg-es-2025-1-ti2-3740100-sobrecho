package com.sobrecho.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sobrecho.model.Store;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
}
