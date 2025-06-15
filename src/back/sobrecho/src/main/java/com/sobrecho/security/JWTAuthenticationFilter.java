package com.sobrecho.security;

import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Set;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sobrecho.dto.AuthResponseDTO;
import com.sobrecho.dto.SignInDTO;
import com.sobrecho.enums.ProfileEnum;
import com.sobrecho.exceptions.GlobalExceptionHandler;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    private JWTUtil jwtUtil;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        setAuthenticationFailureHandler(new GlobalExceptionHandler());
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
            HttpServletResponse response) throws AuthenticationException {
        try {
            SignInDTO userCredentials = new ObjectMapper().readValue(request.getInputStream(), SignInDTO.class);

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userCredentials.getEmail(), userCredentials.getPassword(), new ArrayList<>());

            Authentication authentication = this.authenticationManager.authenticate(authToken);
            return authentication;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
            HttpServletResponse response, FilterChain filterChain, Authentication authentication)
            throws IOException, ServletException {
        
        
        UserSpringSecurity userSpringSecurity = (UserSpringSecurity) authentication.getPrincipal();
        String username = userSpringSecurity.getUsername();
        String userId = userSpringSecurity.getId().toString();
        
        String role;
        if (userSpringSecurity.hasRole(ProfileEnum.SELLER)) {
            role = ProfileEnum.SELLER.getDescription();
        } else if (userSpringSecurity.hasRole(ProfileEnum.ADMIN)) {
            role = ProfileEnum.ADMIN.getDescription();
        } else {
            role = ProfileEnum.USER.getDescription();
        }
        
        String accessToken = jwtUtil.generateAccessToken(username, role, userId);
        String refreshToken = jwtUtil.generateRefreshToken(username);

        AuthResponseDTO responseBody = new AuthResponseDTO();
        AuthResponseDTO.TokensDTO tokens = new AuthResponseDTO.TokensDTO();
        tokens.setAccess(accessToken);
        tokens.setAccess_expires_at(Instant.now().plus(15, ChronoUnit.MINUTES).toString());
        tokens.setRefresh(refreshToken);
        tokens.setRefresh_expires_at(Instant.now().plus(7, ChronoUnit.DAYS).toString());
        responseBody.setTokens(tokens);

        AuthResponseDTO.UserDTO userDTO = new AuthResponseDTO.UserDTO();
        userDTO.setId(userId);
        userDTO.setName(userSpringSecurity.getUsername()); 
        userDTO.setEmail(username);
        userDTO.setRole(role);
        responseBody.setUser(userDTO);
        
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        response.getWriter().write(new ObjectMapper().writeValueAsString(responseBody));
        response.getWriter().flush();
    }

}