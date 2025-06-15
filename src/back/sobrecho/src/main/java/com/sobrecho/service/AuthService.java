package com.sobrecho.service;

import com.sobrecho.dto.*;
import com.sobrecho.model.User;
import com.sobrecho.model.Store;
import com.sobrecho.enums.ProfileEnum;
import com.sobrecho.dao.UserRepository;
import com.sobrecho.dao.StoreRepository;
import com.sobrecho.security.JWTUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.Set;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;

    public AuthResponseDTO signUpUser(UserSignUpDTO dto) {
        if (userRepository.findByEmail(dto.getEmail()) != null) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }
        User user = new User();
        if (dto.getName() == null || dto.getName().isEmpty()) {
            throw new IllegalArgumentException("O campo 'name' é obrigatório.");
        }
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        if (dto.getBirthdate() != null && !dto.getBirthdate().isEmpty()) {
            user.setBirthdate(java.time.LocalDate.parse(dto.getBirthdate()));
        }
        if (dto.getPhone() != null && !dto.getPhone().isEmpty()) {
            user.setPhone(dto.getPhone());
        }
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.addProfile(ProfileEnum.USER);
        userRepository.save(user);

        String role = ProfileEnum.USER.getDescription();
        String accessToken = jwtUtil.generateAccessToken(user.getEmail(), role, user.getId().toString());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        AuthResponseDTO response = new AuthResponseDTO();
        AuthResponseDTO.TokensDTO tokens = new AuthResponseDTO.TokensDTO();
        tokens.setAccess(accessToken);
        tokens.setAccess_expires_at(Instant.now().plus(15, ChronoUnit.MINUTES).toString());
        tokens.setRefresh(refreshToken);
        tokens.setRefresh_expires_at(Instant.now().plus(7, ChronoUnit.DAYS).toString());
        response.setTokens(tokens);

        AuthResponseDTO.UserDTO userDTO = new AuthResponseDTO.UserDTO();
        userDTO.setId(user.getId().toString());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(role);
        response.setUser(userDTO);

        return response;
    }

    public AuthResponseDTO signUpSeller(SellerSignUpDTO dto, String imageUrl) {
        if (userRepository.findByEmail(dto.getEmail()) != null) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }
        User user = new User();
        if (dto.getName() == null || dto.getName().isEmpty()) {
            throw new IllegalArgumentException("O campo 'name' é obrigatório.");
        }
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        if (dto.getBirthdate() != null && !dto.getBirthdate().isEmpty()) {
            user.setBirthdate(java.time.LocalDate.parse(dto.getBirthdate()));
        }
        if (dto.getPhone() != null && !dto.getPhone().isEmpty()) {
            user.setPhone(dto.getPhone());
        }
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.addProfile(ProfileEnum.USER);
        user.addProfile(ProfileEnum.SELLER);
        userRepository.save(user);

        Store store = new Store();
        store.setName(dto.getStore().getName());
        store.setDescription(dto.getStore().getDescription());
        store.setImage(imageUrl);
        store.setUser(user);
        storeRepository.save(store);

        String role = ProfileEnum.SELLER.getDescription();
        String accessToken = jwtUtil.generateAccessToken(user.getEmail(), role, user.getId().toString());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        AuthResponseDTO response = new AuthResponseDTO();
        AuthResponseDTO.TokensDTO tokens = new AuthResponseDTO.TokensDTO();
        tokens.setAccess(accessToken);
        tokens.setAccess_expires_at(java.time.Instant.now().plus(15, java.time.temporal.ChronoUnit.MINUTES).toString());
        tokens.setRefresh(refreshToken);
        tokens.setRefresh_expires_at(java.time.Instant.now().plus(7, java.time.temporal.ChronoUnit.DAYS).toString());
        response.setTokens(tokens);

        AuthResponseDTO.UserDTO userDTO = new AuthResponseDTO.UserDTO();
        userDTO.setId(user.getId().toString());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(role);

        AuthResponseDTO.StoreDTO storeDTO = new AuthResponseDTO.StoreDTO();
        storeDTO.setId(store.getId().toString());
        storeDTO.setName(store.getName());
        storeDTO.setDescription(store.getDescription());
        storeDTO.setImage(store.getImage());

        userDTO.setStore(storeDTO);
        response.setUser(userDTO);

        return response;
    }

    public AuthResponseDTO signIn(SignInDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail());
        if (user == null) {
            throw new RuntimeException("Usuário não encontrado");
        }
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Senha inválida");
        }

        Set<ProfileEnum> profiles = user.getProfiles();
        String role;

        if (profiles.contains(ProfileEnum.SELLER)) {
            role = ProfileEnum.SELLER.getDescription();
        } else if (profiles.contains(ProfileEnum.ADMIN)) {
            role = ProfileEnum.ADMIN.getDescription();
        } else {
            role = ProfileEnum.USER.getDescription();
        }
        // --- FIM DA CORREÇÃO ---

        String accessToken = jwtUtil.generateAccessToken(user.getEmail(), role, user.getId().toString());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        AuthResponseDTO response = new AuthResponseDTO();
        AuthResponseDTO.TokensDTO tokens = new AuthResponseDTO.TokensDTO();
        tokens.setAccess(accessToken);
        tokens.setAccess_expires_at(java.time.Instant.now().plus(15, java.time.temporal.ChronoUnit.MINUTES).toString());
        tokens.setRefresh(refreshToken);
        tokens.setRefresh_expires_at(java.time.Instant.now().plus(7, java.time.temporal.ChronoUnit.DAYS).toString());
        response.setTokens(tokens);

        AuthResponseDTO.UserDTO userDTO = new AuthResponseDTO.UserDTO();
        userDTO.setId(user.getId().toString());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(role);

        if (role.equals("ROLE_SELLER")) {
            if (user.getStore() != null) {
                Store store = user.getStore();
                AuthResponseDTO.StoreDTO storeDTO = new AuthResponseDTO.StoreDTO();
                storeDTO.setId(store.getId().toString());
                storeDTO.setName(store.getName());
                storeDTO.setDescription(store.getDescription());
                storeDTO.setImage(store.getImage());
                userDTO.setStore(storeDTO);
            }
        }

        response.setUser(userDTO);

        return response;
    }

    public AuthResponseDTO refreshToken(RefreshTokenDTO dto) {

        return null;
    }
}
