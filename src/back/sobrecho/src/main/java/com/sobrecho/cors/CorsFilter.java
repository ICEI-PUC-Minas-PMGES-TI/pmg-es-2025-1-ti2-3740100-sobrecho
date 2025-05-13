package com.sobrecho.cors;

import java.io.IOException;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter{

	private String originPermitida ="http://localhost:8000";
	
	@Override
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;
		
		response.setHeader("Acess-Control-Allow-Origin", originPermitida);
		response.setHeader("Acess-Control-Allow-Credentials", "true");
		
		
		if("OPTIONS".equals(request.getMethod())){
			response.setHeader("Acess-Control-Allow-Methods", "POST, GET. DELETE, PUT, OPTIONS");
			response.setHeader("Acess-Control-Allow-Headers", "Authorization, Content-Type, Accept");
			response.setHeader("Acess-Control-Allow-Max-Age", "3600");
			
			response.setStatus(HttpServletResponse.SC_OK);
		}else {
			chain.doFilter(req, resp);
		}
	}

}
